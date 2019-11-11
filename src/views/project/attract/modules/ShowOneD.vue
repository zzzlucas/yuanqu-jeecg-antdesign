<template>
  <!-- 项目分配表单 -->
  <a-drawer title="选择跟踪人员" width="50%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="项目名称">
          <a-input
            placeholder="请输入项目名称"
            v-decorator="['projectId',  {rules: [{required: true, message: '请输入项目名称'}]}]"
          />
        </a-form-item>
        <a-form-item label="跟踪人" required>
          <!-- 数据字典 -->
          <a-input
            placeholder="请输入跟踪人"
            v-decorator="['tracker',  {rules: [{required: true, message: '请输入跟踪人'}]}]"
          />
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="handleOk">确定</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-card>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
export default {
  name: 'SysAnnouncementModal',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      title: '通知消息',
      record: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      loading: false,
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
      url: {
        list: '/park.project/mgrProjectInfo/assignProject',
        
      }
    }
  },
  created() {},
  methods: {
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          // console.log('2222')
          if (!this.model.id) {
            //增
            console.log('post方式')
            httpurl += this.url.add
            method = 'post'
          } else {
            //改
            console.log('put方式')
            httpurl += this.url.edit
            method = 'put'
          }
          // let formData = {}
          let formData = Object.assign(this.model, values)
          formData = qs.stringify(formData)
          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                // that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              // that.close()
            })
        }
      })
      // this.form.resetFields()
    },
    detail(record) {
      this.visible = true
      this.record = record
    },
    handleCancel() {
      this.visible = false
    },
    /** 切换全屏显示 */
    handleClickToggleFullScreen() {
      let mode = !this.modelStyle.fullScreen
      if (mode) {
        this.modelStyle.width = '100%'
        this.modelStyle.style.top = '20px'
      } else {
        this.modelStyle.width = '60%'
        this.modelStyle.style.top = '50px'
      }
      this.modelStyle.fullScreen = mode
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
