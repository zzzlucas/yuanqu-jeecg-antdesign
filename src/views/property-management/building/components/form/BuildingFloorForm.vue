<template>
  <a-drawer
    width="65%"
    placement="right"
    :title="title"
    :visible="visible"
    :mask-closable="false"
    @close="close"
  >
    <a-form class="drawer-form building-floor-form" layout="horizontal" :form="form">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="归属">
        <a-tree-select
          placeholder="请选择归属"
          v-decorator="['buildingId', {rules: rules.buildingId}]"
          :tree-data="tree"
          :treeExpandedKeys.sync="treeExpandedKeys"
          :load-data="loadTree"></a-tree-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="楼层名称">
        <a-input placeholder="请输入楼层名称" v-decorator="['floorName', {}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="楼层面积">
        <a-input placeholder="请输入楼层面积" v-decorator="['allarea', {}]" addonAfter="㎡"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="计费面积">
        <a-input placeholder="请输入计费面积" v-decorator="['chargingArea', {}]" addonAfter="㎡"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="层高">
        <a-input placeholder="请输入层高" v-decorator="['height', {}]" addonAfter="米"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="承重">
        <a-input placeholder="请输入承重" v-decorator="['bearing', {}]" addonAfter="KN/㎡"/>
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
  import { getFileListData, getOneImage, getTreeNodeOfKey, promiseForm, uploadFile } from '@utils/util'
  import qs from 'qs'
  import { PickBuildingFloorForm } from '@/config/pick-fields'
  import { floor as rules } from '../../js/rules'
  import { mapState } from 'vuex'

  export default {
    name: 'BuildingFloorForm',
    data() {
      return {
        rules,
        uploadFile,
        title: '楼层',
        visible: false,
        model: {},
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        },
        form: this.$form.createForm(this, { name: 'buildingFloor' }),
        url: {
          add: '/park.architecture/baseArchitectureFloor/add',
          edit: '/park.architecture/baseArchitectureFloor/edit',
          block: '/park.architecture/baseArchitectureProject/queryByParkId',
          tower: '/park.architecture/baseArchitectureBuilding/queryBuildingList'
        },
        treeExpandedKeys: [],
        fileList: [],
        tree: []
      }
    },
    methods: {
      async init() {
        this.fileList = []
        this.tree = []
        this.treeExpandedKeys = []
        const res = await getAction(this.url.block, { parkId: this.parkId })

        if (res.success && res.code === 200) {
          this.tree = _.map(res.result, obj => {
            return {
              title: obj.projectAbbr,
              key: obj.buildingProjectId,
              value: obj.buildingProjectId,
              disabled: true
            }
          })
        } else {
          await this.$message.error(res.message)
          this.close()
        }
      },
      async add() {
        await this.init()
        this.title = '新建楼层'
        this.form.resetFields()
        this.visible = true
      },
      async edit(record) {
        await this.init()
        this.title = '编辑楼层'
        this.form.resetFields()

        const res = await getAction(this.url.tower, { buildingProjectId: record.buildingProjectId })
        if (res.success && res.code === 200) {
          if (res.result) {
            let path = getTreeNodeOfKey(this.tree, record.buildingProjectId, 'value')
            path = _.map(path, i => `[${i}]`).join('.children') + 'children'

            _.set(this.tree, path, _.map(res.result, obj => {
              return {
                title: obj.buildingName,
                key: obj.buildingId,
                value: JSON.stringify({
                  parkId: obj.parkId,
                  buildingProjectId: obj.buildingProjectId,
                  buildingId: obj.buildingId
                }),
                isLeaf: true
              }
            }))
          }
        }

        this.treeExpandedKeys = [record.buildingProjectId]
        record.buildingId = JSON.stringify({
          parkId: record.parkId,
          buildingProjectId: record.buildingProjectId,
          buildingId: record.buildingId
        })
        record.isVirtual = record.isVirtual === 'true'

        this.model = Object.assign({}, record)

        this.visible = true

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, PickBuildingFloorForm))

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

          const data = JSON.parse(form.buildingId)
          form.parkId = data.parkId
          form.buildingProjectId = data.buildingProjectId
          form.buildingId = data.buildingId
          form.addDocFiles = JSON.stringify(getFileListData(this.fileList))

          const pid = form.buildingId

          if (!this.model.floorId) {
            httpUrl = this.url.add
            method = 'post'
          } else {
            form.floorId = this.model.floorId
            httpUrl = this.url.edit
            method = 'put'
          }

          form = qs.stringify(form)

          httpAction(httpUrl, form, method).then((res) => {
            this.confirmLoading = false
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok', 'floor', pid, [data.buildingProjectId, data.buildingId])
              this.close()
            } else {
              this.$message.warning(res.message)
            }
          })
        }).catch(err => {
          console.log('新建楼层：', err)
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
      },
      loadTree(node) {
        return new Promise((resolve, reject) => {
          if (node.dataRef.children) {
            resolve()
            return true
          }

          getAction(this.url.tower, { buildingProjectId: node.dataRef.key }).then(res => {
            if (res.success && res.code === 200) {
              if (res.result) {
                node.dataRef.children = _.map(res.result, obj => {
                  return {
                    title: obj.buildingName,
                    key: obj.buildingId,
                    value: JSON.stringify({
                      parkId: obj.parkId,
                      buildingProjectId: obj.buildingProjectId,
                      buildingId: obj.buildingId
                    }),
                    isLeaf: true
                  }
                })
              } else {
                node.dataRef.isLeaf = true
              }
              this.tree = [...this.tree]
              resolve()
            } else {
              this.$message.error(res.message)
              reject(res.message)
            }
          })
        })
      }
    },
    computed: mapState({
      parkId: state => state.industrialPark.id
    })
  }
</script>