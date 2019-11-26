<template>
  <a-drawer :title="title" width="50%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="资讯名称">
          <a-input v-decorator="['titile',  {rules: [{required: true, message: '请输入资讯名称'}]}]" />
        </a-form-item>
        <a-form-item label="资讯类别">
          <a-radio-group v-decorator="['type',  {rules: [{required: true, message: '请选择资讯类别'}]}]">
            <a-radio
              v-if="item.value>=2"
              v-for="(item, key) in dict.newsTypeExt"
              :value="item.value"
              :key="key"
            >{{item.text}}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="发布时间">
          <a-date-picker
            showTime
            placeholder
            style="width:100%"
            format="YYYY-MM-DD HH:mm:ss"
            v-decorator="['publishTime',  {rules: [{required: true, message: '请输入发布时间'}]}]"
          />
        </a-form-item>
        <a-form-item label="内容">
          <j-editor v-model="editor.context"></j-editor>
        </a-form-item>
        <a-form-item label="图片"></a-form-item>
      </a-form>

      <a-button type="primary" @click="handleOk">确定</a-button>
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
      //这是跟踪人，不是服务人员，是否走字典有待考究
      dict: {},
      url: {
        add: '/park.service/mgrNewsInfo/add',
        edit: '/park.service/mgrNewsInfo/edit'
      }
    }
  },
  computed: {
    title() {
      return '资讯' + (this.editBool ? '编辑' : '新建')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {
    initDictOptions('news_type').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.newsTypeExt = res.result
      }
    })
  },
  methods: {
    handleOOKK() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { context } = this.editor
          let httpurl = ''
          let method = ''
          if (!this.model.newId) {
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
          if (!this.model.newId) {
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
      console.log(record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.editor = {
          context: record.context
        }
        this.form.setFieldsValue(pick(this.model, 'titile', 'type'))
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
