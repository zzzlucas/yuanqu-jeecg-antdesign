<template>
  <a-drawer :title="title" width="50%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="活动名称">
          <a-input v-decorator="['title',  {rules: [{required: true, message: '请输入活动名称'}]}]" />
        </a-form-item>
        <a-form-item label="活动时间">
          <!-- <a-range-picker
            v-decorator="[['begDate','endDate'], {initialValue: ['2019-11-11','2019-11-25']}]"
          ></a-range-picker>-->
          <a-date-picker
            showTime
            style="width:50%"
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="['begDate',  {rules: [{required: true, message: '请输入活动开始时间'}]}]"
          />
          <a-date-picker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            style="width:50%"
            v-decorator="['endDate',  {rules: [{required: true, message: '请输入活动结束时间'}]}]"
          />
        </a-form-item>
        <a-form-item label="活动地点">
          <a-input v-decorator="['address',  {rules: [{required: true, message: '请输入活动地点'}]}]" />
        </a-form-item>
        <a-form-item label="主办单位">
          <a-input v-decorator="['hostUnit',  {rules: [{required: true, message: '请输入主办单位'}]}]" />
        </a-form-item>
        <a-form-item label="所属园区 （暂园区ID">
          <a-input v-decorator="['parkId',  {rules: [{required: true, message: '请输入所属园区'}]}]" />
        </a-form-item>
        <a-form-item label="活动限额">
          <a-input
            v-decorator="['applyMembersMax',  {rules: [{required: true, message: '请输入活动限额'}]}]"
          />
        </a-form-item>

        <a-form-item label="活动介绍">
          <!-- <a-input v-decorator="['context', {rules: [{required: true, message: '请输入活动介绍'}]}]" /> -->
          <j-editor v-model="editor.context"></j-editor>
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="handleOk">发布</a-button>
      <a-button @click="handleCancel">取消</a-button>
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
      //这是跟踪人，不是服务人员，是否走字典有待考究
      dict: {
        trackerExt: [{ value: '1' }]
      },
      url: {
        add: '/park.service/mgrActivityInfo/add',
        edit: '/park.service/mgrActivityInfo/edit'
      }
    }
  },
  computed: {
    title() {
      return '活动' + (this.editBool ? '编辑' : '发布')
    }
  },
  created() {
    initDictOptions('tracker').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.trackerExt = res.result
      }
    })
  },
  methods: {
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { context } = this.editor
          let httpurl = ''
          let method = ''
          if (!this.model.activityId) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          formData.begDate = formData.begDate ? formData.begDate.format('YYYY-MM-DD HH:mm:ss') : null
          formData.endDate = formData.endDate ? formData.endDate.format('YYYY-MM-DD HH:mm:ss') : null
          formData.context = context
          formData = qs.stringify(formData)
          // console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                // that.visible = false
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
      // this.form.resetFields()
    },
    detail(record) {
      // this.record = record
      // console.log('record');
      // console.log(record);
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'custId', 'customerName', 'servicer'))
      })
    },
    Add() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
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
