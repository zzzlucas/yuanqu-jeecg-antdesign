<template>
  <a-modal
    :title="title"
    :width="600"
    :closable="false"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- layout="inline" -->
        <a-form-item label="审核人员">
          <a-select style="width:100%" v-decorator="['userId', {initialValue:''}]">
            <a-select-option
              v-for="(item, key) in user"
              :value="item.id"
              :key="item.id"
            >{{ item.username }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="审核阶段">
          <a-select v-decorator="['code', {initialValue:''}]">
            <a-select-option value="N4">部门审核</a-select-option>
            <a-select-option value="N1">分管领导审核</a-select-option>
            <a-select-option value="N2">主要领导审核</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import qs from 'querystring'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'

export default {
  name: '',
  data() {
    return {
      title: '添加审核人员',
      visible: false,
      model: {},
      labelCol: {
        // xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        // xs: { span: 24 },
        sm: { span: 18 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {},
      url: {
        add: '/park.workflow/baseWorkFlowProject/add'
      },
      userId: [],
      userName: [],
      user: [],
      dict: {
        userIdExt: [{ value: '1' }]
      }
    }
  },
  created() {
    getAction('/sys/user/list').then(res => {
      console.log(res.result.records)
      this.user = res.result.records
    })
    initDictOptions('tech_user_id').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.userIdExt = res.result
      }
    })
  },
  methods: {
    add() {
      this.visible = true
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          httpurl += this.url.add
          method = 'post'
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData = qs.stringify(formData)
          console.log('formData')
          console.log(formData)
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
              that.close()
            })
        }
      })
    },
    handleCancel() {
      // this.close()
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
/** Button按钮间距 */
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
</style>