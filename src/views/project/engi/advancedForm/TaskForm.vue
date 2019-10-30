<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item label="建设单位">
          <a-input
            placeholder="请输入单位名称"
            v-decorator="[ 'task.name1', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item label="设计单位">
          <a-input
            placeholder="请输入单位名称"
            v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item label="代建单位">
          <a-input
            placeholder="请输入单位名称"
            v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item label="勘察单位">
          <a-input
            placeholder="请输入单位名称"
            v-decorator="[ 'task.name', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item label="施工单位">
          <a-input
            placeholder="请输入单位名称"
            v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item label="项目地址">
          <a-input
            placeholder="请输入项目地址"
            v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入项目地址', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item label="任务名">
          <a-input
            placeholder="请输入任务名称"
            v-decorator="[ 'task.name', {rules: [{ required: true, message: '请输入任务名称', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item label="联系方式">
          <a-input
            placeholder="请输入联系方式"
            v-decorator="[ 'task.description', {rules: [{ required: true, message: '请输入联系方式', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row class="form-row" :gutter="16">
      <a-col :lg="22" :md="12" :sm="24">
        <a-form-item label="项目信息">
          <a-textarea
            :rows="4"
            placeholder="请输入项目信息"
            v-decorator="[ 'task.name', {rules: [{ required: true, message: '请输入项目信息', whitespace: true}]} ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: values
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>