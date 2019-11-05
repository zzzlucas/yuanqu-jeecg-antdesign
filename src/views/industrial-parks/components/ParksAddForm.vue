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
          <a-form-item label="园区简介" :label-col="formItem.label" :wrapper-col="formItem.value">
            <j-editor v-decorator="['content']"></j-editor>
          </a-form-item>
          <a-form-item label="优惠政策" :label-col="formItem.label" :wrapper-col="formItem.value">
            <j-editor v-decorator="['policy']"></j-editor>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="总建筑面积" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['total_buliding_area']">
              <span slot="addonAfter">㎡</span>
            </a-input>
          </a-form-item>
          <a-form-item label="工位总数" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['total_workstation']"></a-input>
          </a-form-item>
          <a-form-item label="工位收费标准" :label-col="formItem.label" :wrapper-col="formItem.value">
            <span>
              <a-input v-decorator="['fee_scale']">
                <a-select slot="addonAfter" style="width: 100px;" v-decorator="['_fee_scale_end', {initialValue: '1'}]">
                  <a-select-option value="1">元/天</a-select-option>
                  <a-select-option value="2">元/月</a-select-option>
                  <a-select-option value="3">元/年</a-select-option>
                </a-select>
              </a-input>
            </span>
          </a-form-item>
          <a-form-item label="独立空间总数" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['total_room']"></a-input>
          </a-form-item>
          <a-form-item label="独立空间收费标准" :label-col="formItem.label" :wrapper-col="formItem.value">
            <span>
              <a-input v-decorator="['fee_scale_room_unit']">
                <a-select slot="addonAfter" style="width: 100px" v-decorator="['_fee_scale_room_unit_end', {initialValue: '1'}]">
                  <a-select-option value="1">元/㎡/天</a-select-option>
                  <a-select-option value="2">元/㎡/月</a-select-option>
                  <a-select-option value="3">元/㎡/年</a-select-option>
                </a-select>
              </a-input>
            </span>
          </a-form-item>
          <a-form-item label="地址" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['address']"></a-input>
          </a-form-item>
          <a-form-item label="经度" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['lng']"></a-input>
          </a-form-item>
          <a-form-item label="纬度" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['lat']"></a-input>
          </a-form-item>
          <a-form-item label="得房率" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['room_rate']">
              <span slot="addonAfter">%</span>
            </a-input>
          </a-form-item>
          <a-form-item label="联系电话" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['telephone']"></a-input>
          </a-form-item>
          <a-form-item label="具备设备" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-select mode="tags" v-decorator="['device_group_id']">
              <a-select-option value="1">桌子</a-select-option>
              <a-select-option value="2">椅子</a-select-option>
              <a-select-option value="3">电脑</a-select-option>
            </a-select>
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
  import JEditor from '@comp/jeecg/JEditor'
  export default {
    name: 'ParksAddForm',
    components: { JEditor },
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
      onSubmit(err, form) {
        if (err === null) {
          console.log(form)
        }
      }
    }
  }
</script>