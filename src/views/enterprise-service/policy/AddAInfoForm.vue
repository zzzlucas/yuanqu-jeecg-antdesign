<template>
  <a-drawer :title="title" width="50%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="标题">
          <a-input v-decorator="['titile',  {rules: [{required: true, message: '请输入标题'}]}]" />
        </a-form-item>
        <a-form-item label="政策类别">
          <a-checkbox-group v-decorator="['typeGroups']">
            <a-checkbox
              v-for="(item, key) in dict.talentPolicy"
              :key="key"
              :value="item.value"
            >{{ item.text || item.label }}</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="发布部门">
          <a-checkbox-group v-decorator="['deptGroups']">
            <a-checkbox
              v-for="(item, key) in dict.publishingDepartment"
              :key="key"
              :value="item.value"
            >{{ item.text || item.label }}</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="发布时间">
          <a-time-picker  format="HH:mm" size="large" />
          <a-date-picker
            :showTime="{disabledSeconds: disabledSeconds}"
            placeholder
            style="width:100%"
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="['publishTime',  {rules: [{required: true, message: '请输入发布时间'}]}]"
          />
        </a-form-item>
        <a-form-item label="内容描述">
          <j-editor v-model="editor.context"></j-editor>
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="handleOk">发布</a-button>
      <a-button @click="handleOOKK">暂存</a-button>
    </a-card>
  </a-drawer>
</template>

<script>
import JEditor from '@comp/jeecg/JEditor'
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: { JEditor },
  data() {
    return {
      form: this.$form.createForm(this),
      // title: '通知消息',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      //常用数据初始化
      record: {},
      editor: {},
      model: {},
      visible: false,
      loading: false,
      editBool: false,
      dict: {
        talentPolicyExt: '',
        publishingDepartmentExt: ''
      },
      url: {
        add: '/park.service/mgrPolicyInfo/add',
        edit: '/park.service/mgrPolicyInfo/edit'
      }
    }
  },
  computed: {
    title() {
      return '政策' + (this.editBool ? '编辑' : '新建')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {
    this.initConfig()
  },
  methods: {
    disabledSeconds(h, m){
      console.log(h, m)
      return []
    },
    initConfig() {
      initDictOptions('policy_type').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.talentPolicy = res.result
        }
      })
      initDictOptions('publishing_department').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.publishingDepartment = res.result
        }
      })
    },
    handleOOKK() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { context } = this.editor
          let httpurl = ''
          let method = ''
          if (!this.model.policyId) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          formData.publishTime = formData.publishTime ? formData.publishTime.format('YYYY-MM-DD HH:mm:ss') : null
          formData.context = context
          formData.isPublic = '0'
          formData.parkId = this.industrialParkId
          //把 formData.typeGroups 转换成逗号分割的字符串
          formData.typeGroups = formData.typeGroups.toString()
          formData.deptGroups = formData.deptGroups.toString()
          formData = qs.stringify(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('reload')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.handleCancel()
            })
        }
      })
    },
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { context } = this.editor
          let httpurl = ''
          let method = ''
          if (!this.model.policyId) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          formData.publishTime = formData.publishTime ? formData.publishTime.format('YYYY-MM-DD HH:mm:ss') : null
          formData.context = context
          formData.isPublic = '1'
          formData.parkId = this.industrialParkId
          //把 formData.typeGroups 转换成逗号分割的字符串
          formData.typeGroups = formData.typeGroups.toString()
          formData.deptGroups = formData.deptGroups.toString()
          formData = qs.stringify(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('reload')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.handleCancel()
            })
        }
      })
    },
    detail(record) {
      this.editBool = true
      console.log('record')
      console.log(record)
      this.form.resetFields()
      //做俩类别数据的数组出来
      record.typeGroups = []
      for (const item of record.types) {
        record.typeGroups.push(item.labelNo)
      }
      record.deptGroups = []
      for (const item of record.depts) {
        record.deptGroups.push(item.labelNo)
      }
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.editor = {
          context: record.context
        }
        this.form.setFieldsValue(pick(this.model, 'publishTime', 'titile', 'typeGroups', 'deptGroups', 'type'))
        this.form.setFieldsValue({
          publishTime: this.model.publishTime ? moment(this.model.publishTime) : null
        })
      })
    },
    Add() {
      this.editBool = false
      this.form.resetFields()
      this.visible = true
      let record = {}
      record.publishTime = moment()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'publishTime'))
      })
    },
    handleCancel() {
      this.visible = false
      this.editor.context = ''
    }
  }
}
</script>

<style lang="less">
.announcementCustomModal {
  .ant-modal-header {
    border: none;
    display: inline-block;
    position: absolute;
    z-index: 1;
    right: 56px;
    padding: 0;
    .ant-modal-title {
      .custom-btn {
        width: 56px;
        height: 56px;
        border: none;
        box-shadow: none;
      }
    }
  }
  .daily-article {
    border-bottom: 0;
  }
}
</style>
<style scoped lang="less">
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
.daily-article {
  .article-button {
    font-size: 1.2rem !important;
  }
  .ant-card-body {
    padding: 18px !important;
  }
  .ant-card-head {
    padding: 0 1rem;
  }
  .ant-card-meta {
    margin-bottom: 1rem;
  }
  .article-content {
    p {
      word-wrap: break-word;
      word-break: break-all;
      text-overflow: initial;
      white-space: normal;
      font-size: 0.9rem !important;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
