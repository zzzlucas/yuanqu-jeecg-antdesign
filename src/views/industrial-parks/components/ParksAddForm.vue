<template>
  <a-drawer
    title="登记园区"
    wrapClassName="industrial-parks-list-form"
    width="65%"
    :closable="false"
    :mask-closable="false"
    :visible="show"
    @close="closeDrawer">
    <a-form layout="horizontal" :form="form">
      <a-row>
        <a-col span="12">
          <a-form-item label="园区名称" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['park_name', {rules: [{required: true, message: '请输入园区名称'}]}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="总建筑面积" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['total_buliding_area']"></a-input>
          </a-form-item>
          <a-form-item label="工位总数" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['total_workstation']"></a-input>
          </a-form-item>
          <a-form-item label="工位收费标准" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['fee_scale']"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="handleSubmit">确定</a-button>
      <a-button @click="closeDrawer">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
  export default {
    name: 'ParksAddForm',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'show',
      event: 'close'
    },
    data() {
      return {
        formItem: {
          label: { span: 6 },
          value: { span: 18 }
        },
        form: this.$form.createForm(this, { name: 'park' })
      }
    },
    methods: {
      closeDrawer() {
        this.$emit('close', false)
      },
      handleSubmit() {
        this.form.validateFieldsAndScroll(this.onSubmit.bind(this))
      },
      onSubmit(err) {
        if (err === null) {

        }
      }
    }
  }
</script>