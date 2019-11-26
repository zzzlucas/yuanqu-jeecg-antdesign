<template>
  <a-drawer
    width="65%"
    placement="right"
    :title="title"
    :visible="visible"
    :mask-closable="false"
    @close="close"
  >
    <a-form class="drawer-form building-room-form" layout="horizontal" :form="form">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="归属">
        <a-tree-select
          placeholder="请选择归属"
          dropdown-class-name="select-tree-long"
          v-decorator="['floorId', {rules: rules.floorId}]"
          :tree-data="tree"
          :treeExpandedKeys.sync="treeExpandedKeys"
          :load-data="loadTree"></a-tree-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="房间名称">
        <a-input placeholder="请输入房间名称" v-decorator="['roomName', {}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="房间面积">
        <a-input placeholder="请输入房间面积" v-decorator="['actualArea', {}]" addonAfter="㎡"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="是否可租">
        <a-switch
          checkedChildren="是"
          unCheckedChildren="否"
          v-decorator="['isRented', {initialValue: false, valuePropName: 'checked'}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="是否自用">
        <a-switch
          checkedChildren="是"
          unCheckedChildren="否"
          v-decorator="['isSelfUse', {initialValue: false, valuePropName: 'checked'}]"/>
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
        label="房间照片"
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
  import { PickBuildingRoomForm } from '@/config/pick-fields'
  import { room as rules } from '../../js/rules'
  import { mapState } from 'vuex'

  export default {
    name: 'BuildingRoomForm',
    data() {
      return {
        rules,
        uploadFile,
        title: '房间',
        visible: false,
        model: {},
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        },
        form: this.$form.createForm(this, { name: 'buildingRoom' }),
        url: {
          add: '/park.architecture/baseArchitectureRoom/add',
          edit: '/park.architecture/baseArchitectureRoom/edit',
          block: '/park.architecture/baseArchitectureProject/queryByParkId',
          tower: '/park.architecture/baseArchitectureBuilding/queryByProjectId',
          floor: '/park.architecture/baseArchitectureFloor/queryByBuildingId'
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
              lvl: 1,
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
        this.title = '新建房间'
        this.form.resetFields()
        this.visible = true
      },
      async edit(record) {
        await this.init()
        this.title = '编辑房间'
        this.form.resetFields()

        const towerList = await getAction(this.url.tower, { projectId: record.buildingProjectId })
        if (towerList.success && towerList.code === 200) {
          if (towerList.result) {
            let path = getTreeNodeOfKey(this.tree, record.buildingProjectId, 'value')
            path = _.map(path, i => `[${i}]`).join('.children') + 'children'

            _.set(this.tree, path, _.map(towerList.result, obj => {
              return {
                title: obj.buildingName,
                key: obj.buildingId,
                value: obj.buildingId,
                lvl: 2,
                disabled: true
              }
            }))
          }
        }

        const floorList = await getAction(this.url.floor, { buildingId: record.buildingID })
        if (floorList.success && floorList.code === 200) {
          if (floorList.result) {
            let path = getTreeNodeOfKey(this.tree, record.buildingID, 'value')
            path = _.map(path, i => `[${i}]`).join('.children') + 'children'

            _.set(this.tree, path, _.map(floorList.result, obj => {
              return {
                title: obj.floorName,
                key: obj.floorId,
                value: JSON.stringify({
                  parkId: obj.parkId,
                  buildingProjectId: obj.buildingProjectId,
                  buildingId: obj.buildingId,
                  floorId: obj.floorId
                }),
                lvl: 3,
                isLeaf: true
              }
            }))
          }
        }

        this.treeExpandedKeys = [record.buildingProjectId, record.buildingId]
        record.floorId = JSON.stringify({
          parkId: record.parkId,
          buildingProjectId: record.buildingProjectId,
          buildingId: record.buildingId,
          floorId: record.floorId
        })
        record.isRented = record.isRented === 'true'
        record.isSelfUse = record.isSelfUse === 'true'
        record.isVirtual = record.isVirtual === 'true'

        this.model = Object.assign({}, record)

        this.visible = true

        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, PickBuildingRoomForm))

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

          const data = JSON.parse(form.floorId)
          form.parkId = data.parkId
          form.buildingProjectId = data.buildingProjectId
          form.buildingId = data.buildingId
          form.floorId = data.floorId
          form.addDocFiles = JSON.stringify(getFileListData(this.fileList))

          const pid = form.floorId

          if (!this.model.roomId) {
            httpUrl = this.url.add
            method = 'post'
          } else {
            form.roomId = this.model.roomId
            httpUrl = this.url.edit
            method = 'put'
          }

          form = qs.stringify(form)

          httpAction(httpUrl, form, method).then((res) => {
            this.confirmLoading = false
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok', 'rooms', pid, [data.buildingProjectId, data.buildingId, data.floorId])
              this.close()
            } else {
              this.$message.warning(res.message)
            }
          })
        }).catch(err => {
          console.log('新建房间：', err)
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

          if(node.dataRef.lvl === 1){
            getAction(this.url.tower, { projectId: node.dataRef.key }).then(res => {
              if (res.success && res.code === 200) {
                if (res.result) {
                  node.dataRef.children = _.map(res.result, obj => {
                    return {
                      title: obj.buildingName,
                      key: obj.buildingId,
                      value: obj.buildingId,
                      lvl: 2,
                      disabled: true
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
          } else {
            getAction(this.url.floor, { buildingId: node.dataRef.key }).then(res => {
              if (res.success && res.code === 200) {
                if (res.result) {
                  node.dataRef.children = _.map(res.result, obj => {
                    return {
                      title: obj.floorName,
                      key: obj.floorId,
                      value: JSON.stringify({
                        parkId: obj.parkId,
                        buildingProjectId: obj.buildingProjectId,
                        buildingId: obj.buildingId,
                        floorId: obj.floorId
                      }),
                      lvl: 3,
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
          }
        })
      }
    },
    computed: mapState({
      parkId: state => state.industrialPark.id
    })
  }
</script>

<style lang="less">
  .select-tree-long {
    height: 300px;
  }
</style>