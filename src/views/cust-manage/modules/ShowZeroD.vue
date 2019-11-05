<template>
  <!-- <a-drawer
    :title="title"
    :width="800"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible"
  >-->
  <a-drawer
    wrapClassName="mgr-project-trace-drawer"
    width="80%"
    :visible="visible"
    @close="close"
    destroyOnClose
  >
    <div>
      <a-row>
        <a-col span="15">
          <a-card class="daily-article" :bordered="false" title="基本信息">
            <a-spin :spinning="confirmLoading">
              <a-form class="project-drawer-form" :form="form">
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业名称"
                  >
                    <a-input></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业简称"
                  >
                    <a-input></a-input>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业编号"
                  >
                    <a-input></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="法人"
                  >
                    <a-input></a-input>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="单位电话"
                  >
                    <a-input></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="招商人员"
                  >
                    <a-select defaultValue="1" style="width:100%">
                      <a-select-option value="1">来访</a-select-option>
                      <a-select-option value="2">联营企业</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="服务人员"
                  >
                    <a-select defaultValue="1" style="width:100%">
                      <a-select-option value="1">来访</a-select-option>
                      <a-select-option value="2">联营企业</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="引进日期"
                  >
                    <a-date-picker
                      style="width:100%"
                      v-decorator="[ 'trackDate', {rules: [{required: true, message: '请输入跟踪日期'}]}]"
                    />
                  </a-form-item>
                </a-col>
                <!-- 五行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="入驻日期"
                  >
                    <a-date-picker
                      style="width:100%"
                      v-decorator="[ 'trackDate', {rules: [{required: true, message: '请输入跟踪日期'}]}]"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属园区"
                  >
                    <a-select defaultValue="1" style="width:100%">
                      <a-select-option value="1">来访</a-select-option>
                      <a-select-option value="2">联营企业</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- 六行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属项目"
                  >
                    <a-select defaultValue="1" style="width:100%">
                      <a-select-option value="1">来访</a-select-option>
                      <a-select-option value="2">联营企业</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属楼宇"
                  >
                    <a-select defaultValue="1" style="width:100%">
                      <a-select-option value="1">来访</a-select-option>
                      <a-select-option value="2">联营企业</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="邮箱"
                  >
                    <a-input></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="网址"
                  >
                    <a-input></a-input>
                  </a-form-item>
                </a-col>

                <a-row>
                  <a-col>
                    <a-form-item
                      :labelCol="labelCol.long"
                      :wrapperCol="wrapperCol.long"
                      label="关联客户"
                    >
                      <a-textarea :rows="4" placeholder="请输入关联客户" v-decorator="['content', {}]"></a-textarea>
                    </a-form-item>

                    <a-form-item
                      :labelCol="labelCol.long"
                      :wrapperCol="wrapperCol.long"
                      label="企业简介"
                    >
                      <a-textarea :rows="4" placeholder="请输入企业简介" v-decorator="['remark', {}]"></a-textarea>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-spin>
            <!-- <a-button type="primary" @click="handleOk">确定</a-button>
            <a-button @click="handleCancel">取消</a-button>-->
          </a-card>
        </a-col>
        <a-col span="9">
          <a-card class="daily-article" :bordered="false" title="企业标识">
            <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label>
             <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
            </a-form-item>
          </a-card>
          <a-card class="daily-article" :bordered="false" title="附件">
            <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label>
              <!-- <a-input placeholder="请输入附件组ID" v-decorator="['addDocFiles', {}]" /> -->
              <a-upload
                name="file"
                :showUploadList="true"
                :multiple="false"
                :headers="tokenHeader"
                :action="importExcelUrl"
                @change="handleImportExcel"
              >
                <a-button type="primary" icon="import">营业执照</a-button>
                <!-- <span>（单个图片大小不可超过10.00M，全部图片大小不可超过30.00M）</span> -->
              </a-upload>
            </a-form-item>
            <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label>
              <!-- <a-input placeholder="请输入附件组ID" v-decorator="['addDocFiles', {}]" /> -->
              <a-upload
                name="file"
                :showUploadList="true"
                :multiple="false"
                :headers="tokenHeader"
                :action="importExcelUrl"
                @change="handleImportExcel"
              >
                <a-button type="primary" icon="import">其他附件</a-button>
                <!-- <span>（单个图片大小不可超过10.00M，全部图片大小不可超过30.00M）</span> -->
              </a-upload>
            </a-form-item>
          </a-card>
        </a-col>
      </a-row>
      <a-card class="daily-article" :bordered="false" title="分类信息">
        <a-row>
          <a-col span="8">
            <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="跟踪方式">
              <a-select defaultValue="1" style="width:100%">
                <a-select-option value="1">来访</a-select-option>
                <a-select-option value="2">联营企业</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="跟踪方式">
              <a-select defaultValue="1" style="width:100%">
                <a-select-option value="1">来访</a-select-option>
                <a-select-option value="2">联营企业</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="跟踪方式">
              <a-select defaultValue="1" style="width:100%">
                <a-select-option value="1">来访</a-select-option>
                <a-select-option value="2">联营企业</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="跟踪方式">
              <a-select defaultValue="1" style="width:100%">
                <a-select-option value="1">来访</a-select-option>
                <a-select-option value="2">联营企业</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="跟踪方式">
              <a-select defaultValue="1" style="width:100%">
                <a-select-option value="1">来访</a-select-option>
                <a-select-option value="2">联营企业</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="跟踪方式">
              <a-select defaultValue="1" style="width:100%">
                <a-select-option value="1">来访</a-select-option>
                <a-select-option value="2">联营企业</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card class="daily-article" :bordered="false" title="工商/税务信息"></a-card>
    </div>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'

export default {
  name: 'mgrProjectTraceDrawer',
  //1111111111111111111111
  props: {
    show: {
      type: Boolean,
      default: false
    }
    // headers:
  },
  model: {
    prop: 'show',
    event: 'close'
  },
  visible: false,
  //11111111111111111111112
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
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
      form: this.$form.createForm(this),
      validatorRules: {
        recordId: { rules: [{ required: true, message: '请输入记录ID!' }] },
        parkId: { rules: [{ required: true, message: '请输入园区ID!' }] }
      },
      url: {
        add: '/park.mgr/mgrProjectTrace/add',
        edit: '/park.mgr/mgrProjectTrace/edit'
      }
    }
  },
  created() {},
  methods: {
    detail(record) {
      this.visible = true
      this.record = record
    },
    handleCancel() {
      this.visible = false
    },
    handleImportExcel() {},
    importExcelUrl() {},
    tokenHeader() {},
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'recordId',
            'projectId',
            'tracker',
            'trackMethod',
            'status',
            'content',
            'resourceGroupId',
            'remark',
            'parkId',
            'addDocFiles',
            'version',
            'createUserName',
            'updateUserName'
          )
        )
        //时间格式化
        this.form.setFieldsValue({ trackDate: this.model.trackDate ? moment(this.model.trackDate) : null })
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.trackDate = formData.trackDate ? formData.trackDate.format() : null

          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
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
    },
    handleCancel() {
      this.close()
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