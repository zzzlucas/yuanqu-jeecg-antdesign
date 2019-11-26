<template>
  <a-drawer
    width="65%"
    placement="right"
    :title="title"
    :visible="visible"
    :mask-closable="false"
    @close="close"
  >
    <a-form class="drawer-form building-tower-form" layout="horizontal" :form="form">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="归属">
        <a-select placeholder="请选择归属" v-decorator="['buildingProjectId', {rules: rules.buildingProjectId}]">
          <a-select-option
            v-for="(item, key) in blockList"
            :value="item.value"
            :key="key">{{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="楼宇名称">
        <a-input placeholder="请输入楼宇名称" v-decorator="['buildingName', {}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="建筑面积">
        <a-input placeholder="请输入建筑面积" v-decorator="['estimateArea', {}]" addonAfter="㎡"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="地上层数">
        <a-input placeholder="请输入地上层数" v-decorator="['groundFloor', {}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="地下层数">
        <a-input placeholder="请输入地下层数" v-decorator="['undergroundFloor', {}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="是否虚拟">
        <a-switch
          checkedChildren="是"
          unCheckedChildren="否"
          v-decorator="['isVirtual', {initialValue: false, valuePropName: 'checked'}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="备注">
        <a-textarea rows="4" placeholder="请输入备注" v-decorator="['remark', {}]"/>
      </a-form-item>
      <a-form-item
        label="附件"
        help="单张图片不超过 10M"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-upload
          ref="upload"
          action=""
          listType="picture-card"
          accept="image/jpeg,image/png"
          :fileList="fileList"
          :customRequest="uploadFile"
          :beforeUpload="uploadBefore"
          @preview="uploadPreview"
          @change="uploadChange"
        >
          <div v-if="fileList.length < 5">
            <a-icon type="plus"/>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="handleOk">确定</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import { getAction, httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import _ from 'lodash'
  import { getFileListData, getOneImage, promiseForm, uploadFile } from '@utils/util'
  import qs from 'qs'
  import { PickBuildingTowerForm } from '@/config/pick-fields'
  import { tower as rules } from '../../js/rules'
  import { mapState } from 'vuex'

  export default {
    name: 'BuildingTowerForm',
    data() {
      return {
        rules,
        uploadFile,
        title: '楼宇',
        visible: false,
        model: {},
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        },
        form: this.$form.createForm(this, { name: 'buildingTower' }),
        url: {
          add: '/park.architecture/baseArchitectureBuilding/add',
          edit: '/park.architecture/baseArchitectureBuilding/edit',
          block: '/park.architecture/baseArchitectureProject/queryByParkId'
        },
        fileList: [],
        blockList: []
      }
    },
    methods: {
      async init() {
        const res = await getAction(this.url.block, { parkId: this.parkId })

        if (res.success && res.code === 200) {
          this.blockList = _.map(res.result, obj => {
            return {
              label: obj.projectAbbr,
              value: JSON.stringify({
                parkId: obj.parkId,
                buildingProjectId: obj.buildingProjectId
              })
            }
          })
        } else {
          await this.$message.error(res.message)
          this.close()
        }
      },
      async add() {
        await this.init()
        this.title = '新建楼宇'
        this.form.resetFields()
        this.visible = true
      },
      async edit(record) {
        await this.init()
        this.title = '编辑楼宇'
        this.form.resetFields()

        record.buildingProjectId = JSON.stringify({
          parkId: record.parkId,
          buildingProjectId: record.buildingProjectId
        })
        record.isVirtual = record.isVirtual === 'true'

        this.model = Object.assign({}, record)

        this.visible = true

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, PickBuildingTowerForm))

          let images = JSON.parse(record.addDocFiles)
          images = _.map(images, obj => {
            obj.response = { old: obj.url }
            obj.url = getOneImage(obj.url)
            obj.thumbUrl = obj.url
            return obj
          })

          this.fileList = images
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        // 触发表单验证
        const form = promiseForm(this.form)

        form.then(form => {
          this.confirmLoading = true
          let httpUrl = ''
          let method = ''

          const data = JSON.parse(form.buildingProjectId)
          form.buildingProjectId = data.buildingProjectId
          form.parkId = data.parkId
          form.allFloor = parseInt(form.groundFloor) + parseInt(form.undergroundFloor)
          form.addDocFiles = JSON.stringify(getFileListData(this.fileList))

          const pid = form.buildingProjectId

          if (!this.model.buildingId) {
            httpUrl = this.url.add
            method = 'post'
          } else {
            form.buildingId = this.model.buildingId
            httpUrl = this.url.edit
            method = 'put'
          }

          form = qs.stringify(form)

          httpAction(httpUrl, form, method).then((res) => {
            this.confirmLoading = false
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok', 'tower', pid)
              this.close()
            } else {
              this.$message.warning(res.message)
            }
          })
        }).catch(err => {
          console.log('新建楼宇：', err)
        })
      },
      handleCancel() {
        this.close()
      },
      async uploadBefore(file) {
        if (file.size > 10485760) {
          const errorStr = '该图片大于 10M'
          this.$message.error(errorStr)
          throw new Error(errorStr)
        }

        return true
      },
      uploadPreview(e) {
        window.open(e.response.url)
      },
      uploadChange({ file, fileList }) {
        if (file.status === 'done') {
          const data = fileList[fileList.length - 1]
          data.url = data.response.url
          data.thumbUrl = data.response.url
          fileList[fileList.length - 1] = data
        }

        this.fileList = fileList

        if (file.status === 'error') {
          this.$message.error(file.response.message)
          this.$delete(this.fileList, this.fileList.length - 1)
        }
      }
    },
    computed: mapState({
      parkId: state => state.industrialPark.id
    })
  }
</script>