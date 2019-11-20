<template>
  <a-drawer
    wrapClassName="mgr-project-trace-drawer"
    title="跟踪记录"
    width="50%"
    :visible="visible"
    @close="close"
    destroyOnClose
  >
    <div>
      <a-card class="daily-article" :bordered="false">
        <a-spin :spinning="confirmLoading">
          <a-form class="project-drawer-form" :form="form">
            <a-row>
              <a-col span="24">
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="项目ID">
                  <a-input
                    placeholder="请输入项目Id"
                    disabled
                    v-decorator="['projectId',  {rules: [{required: true, message: '请输入项目Id'}]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col span="24">
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="项目名称">
                  <a-input
                    placeholder="请输入项目名称"
                    disabled
                    v-decorator="['projectName',  {rules: [{required: true, message: '请输入项目名称'}]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="跟踪日期"
              >
                <a-date-picker
                  style="width:100%"
                  v-decorator="[ 'trackDate', {rules: [{required: true, message: '请输入跟踪日期'}]}]"
                />
              </a-form-item>
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="跟踪方式"
                required
              >
                <a-select v-decorator="['trackMethod']">
                  <a-select-option
                    v-for="(item, key) in dict.trackMethodExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="跟踪人"
                required
              >
                <!-- v-model写着就没有默认 -->
                <a-select v-decorator="['tracker']">
                  <a-select-option
                    v-for="(item, key) in dict.trackerExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="项目状态"
              >
                <a-select disabled v-decorator="['status']">
                  <a-select-option
                    v-for="(item, key) in dict.statusExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-row>
              <a-col>
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="过程纪要">
                  <a-textarea :rows="4" placeholder="请输入过程纪要" v-decorator="['content', {}]"></a-textarea>
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol.long"
                  :wrapperCol="wrapperCol.long"
                  label="意向房源组ID"
                >
                  <a-input placeholder="请输入意向房源组ID" v-decorator="['resourceGroupId', {}]" />
                </a-form-item>
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="备注">
                  <a-textarea :rows="4" placeholder="请输入备注" v-decorator="['remark', {}]"></a-textarea>
                </a-form-item>
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="附件组ID">
                  <!-- <a-input placeholder="请输入附件组ID" v-decorator="['addDocFiles', {}]" /> -->
                  <!-- <a-upload
                    name="file"
                    :showUploadList="true"
                    :multiple="false"
                    :headers="tokenHeader"
                    :action="importExcelUrl"
                    @change="handleImportExcel"
                    v-decorator="['addDocFiles']"
                  >
                    <a-button type="primary" icon="import">上传附件</a-button>

                  </a-upload>-->
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-form-item
                :labelCol="labelCol.long"
                :wrapperCol="wrapperCol.long"
                label="parkId test"
              >
                <a-input
                  placeholder
                  v-decorator="['parkId', {rules: [{ required: true, message: '请输入parkId', whitespace: true}]}]"
                />
              </a-form-item>
            </a-row>
          </a-form>
        </a-spin>
        <a-button type="primary" @click="handleOk">确定</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </a-card>
    </div>
  </a-drawer>
</template>

<script>
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import qs from 'querystring'
import { ProjectAttractShowZeroForm } from '@/config/pick-fields'

export default {
  name: 'mgrProjectTraceDrawer',
  props: {
    show: {
      type: Boolean,
      default: false
    }
    // headers:
  },
  // model: {
  //   prop: 'show',
  //   event: 'close'
  // },
  visible: false,
  data() {
    return {
      title: '操作',
      visible: false,
      // model: {},
      labelCol: {
        long: {
          span: 4
        },
        default: {
          span: 6
        }
      },
      wrapperCol: {
        long: {
          span: 20
        },
        default: {
          span: 18
        }
      },
      confirmLoading: false,
      //name 的作用？
      form: this.$form.createForm(this, { name: 'mgrProjectTraceDrawer' }),
      validatorRules: {
        recordId: { rules: [{ required: true, message: '请输入记录ID!' }] },
        parkId: { rules: [{ required: true, message: '请输入园区ID!' }] }
      },
      dict: {
        // trackMethodExt: [{ value: '1' }],
        // trackerExt: [{ value: '1' }]
      },
      //是否开启编辑模式的标记
      editBool: false,
      editData: {},
      url: {
        add: '/park.project/mgrProjectTrace/addMgrProjectTrace',
        edit: '/park.project/mgrProjectTrace/edit'
      }
    }
  },
  //左上角标题变换
  // computed: {
  //   getTitle() {
  //     return (this.edit ? '编辑' : '登记') + '园区'
  //   }
  // },
  created() {
    initDictOptions('track_method').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.trackMethodExt = res.result
      }
    })
    initDictOptions('tracker').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.trackerExt = res.result
      }
    })
    initDictOptions('project_status').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.statusExt = res.result
      }
    })
  },
  methods: {
    handleCancel() {
      this.visible = false
    },
    handleImportExcel() {},
    importExcelUrl() {},
    tokenHeader() {},
    //给列表页专用，列表页通过row获取projectId
    detail(record) {
      const that = this
      that.record = record
      that.form.resetFields()
      //可能是record对象缺少属性，从getlist api获取到的参数中只有projectid和parkid可以在这里使用
      //方法一：需要api在传入时具备更多参数，使record具备更多参数
      //方法二：获取到record里的projectid，根据这个发起get请求获取到项目跟踪信息，写入record
      //但是，跟踪记录从逻辑上来说，应当只具备新表单能力即可，编辑旧表单反而破坏跟踪记录的意义，所以虽然后端api是put方式，当post使用即可
      //最终是否获取有待商榷
      //11.19 用recordId查
      let parma = { id: record.recordId }
      // console.log(record.recordId)
      getAction('/park.project/mgrProjectTrace/selectById', parma).then(res => {
        if (res.success) {
          //要重发两次请求，太慢了，visible提上来一级，其实应该使用spin
          that.visible = true
          getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: that.record.projectId }).then(
            resSSS => {
              if (resSSS.success) {
                that.record = res.result
                that.record.projectName = resSSS.result.projectName
                that.model = Object.assign({}, that.record)

                that.$nextTick(() => {
                  that.form.setFieldsValue(pick(that.model, ProjectAttractShowZeroForm))
                  that.form.setFieldsValue({ trackDate: that.model.trackDate ? moment(that.model.trackDate) : null })
                })
              } else {
                that.$message.warning(res.message)
              }
            }
          )
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    //给详情页专用，详情页具有$route.params.id获取projectId
    detailDDD(record) {
      const that = this
      that.record = record
      that.form.resetFields()
      let parma = { id: record.recordId }
      getAction('/park.project/mgrProjectTrace/selectById', parma).then(res => {
        if (res.success) {
          getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: that.$route.params.id }).then(
            resSSS => {
              if (resSSS.success) {
                that.record = res.result
                that.record.projectName = resSSS.result.projectName
                that.model = Object.assign({}, that.record)
                that.visible = true
                that.$nextTick(() => {
                  that.form.setFieldsValue(pick(that.model, ProjectAttractShowZeroForm))
                  that.form.setFieldsValue({ trackDate: that.model.trackDate ? moment(that.model.trackDate) : null })
                })
              } else {
                that.$message.warning(res.message)
              }
            }
          )
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    //只获取部分对应行的属性  在添加新记录时候使用
    partDetail(record) {
      // console.log('partDetail')
      this.form.resetFields()
      //id查询项目基本信息api
      getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: record.projectId }).then(res => {
        if (res.success) {
          // console.log(res.result.projectManager)
          record.tracker = res.result.projectManager
          this.model = Object.assign({}, record)
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'projectId', 'projectName', 'trackDate', 'tracker', 'status'))
          })
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    partDetailDDD() {
      this.form.resetFields()
      let record = {}
      let params = { projectId: this.$route.params.id }
      // console.log(params)
      this.visible = true
      // this.confirmLoading = true
      getAction('/park.project/mgrProjectInfo/queryProjectById', params).then(res => {
        if (res.success) {
          // console.log('object');
          // console.log(res.result);
          record.tracker = res.result.projectManager
          record.projectName = res.result.projectName
          record.projectId = res.result.projectId
          record.status = res.result.status
          // record.trackDate = res.result.trackDate
          this.model = Object.assign({}, record)
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'projectId', 'projectName', 'trackDate', 'tracker', 'status'))
          })
          // this.confirmLoading = false
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          //row里传过来的id
          if (!this.model.trackMethod) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.trackDate = formData.trackDate ? formData.trackDate.format('YYYY-MM-DD') : null
          formData = qs.stringify(formData)
          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
                that.$emit('reload')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.mgr-project-trace-drawer {
  /** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }

  .project-drawer-form {
    @width: 120px;
    .ant-form-item-label {
      width: @width;
    }

    .ant-form-item-control-wrapper {
      width: calc(~'100% - @{width}');
    }
    .ant-col-12 {
      z-index: 10;
    }
  }
}
</style>