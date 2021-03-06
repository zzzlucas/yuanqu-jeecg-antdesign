<template>
  <a-drawer
    wrapClassName="advertising-event-edit form-edit-drawer"
    width="65%"
    closable
    :title="getTitle"
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer">
    <a-form
      class="form-edit-drawer-form"
      layout="horizontal"
      :form="form"
      :label-col="gridOptions.formItem.label"
      :wrapper-col="gridOptions.formItem.value"
      @submit="submit">
      <a-row>
        <a-col :xl="24">
          <a-form-item label="广告位名称" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-select v-decorator="['advertId', {rules: rules.advertId}]">
              <a-select-option :value="item.advertId" v-for="item in advertisingPlaceList" :key="item.advertId">{{ item.advertName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="预约时间">
            <j-date show-time dateFormat="YYYY-MM-DD HH:mm:ss" v-decorator="['begDate', {rules: rules.begDate}]" style="width: 100%;"></j-date>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item class="form-item-label-align" label="—" :colon="false">
            <j-date show-time dateFormat="YYYY-MM-DD HH:mm:ss" v-decorator="['endDate', {rules: rules.endDate}]" style="width: 100%;"></j-date>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="需求描述" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remark']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="附件" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <j-upload v-decorator="['addDocFiles']" />
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="联系人">
            <a-input v-decorator="['requestPerson', {rules: rules.requestPerson}]"></a-input>
          </a-form-item>
        </a-col>
        <!-- TODO -->
        <a-col :xl="12">
          <a-form-item label="公司/企业">
            <a-input v-decorator="['corp', {rules: rules.corp}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="手机号码">
            <a-input v-decorator="['telephone', {rules: rules.telephone}]"></a-input>
          </a-form-item>
        </a-col>
        <!-- TODO -->
        <a-col :xl="12">
          <a-form-item label="邮箱">
            <a-input v-decorator="['zipCode', {rules: rules.zipCode}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="手机号码">
            <a-input v-decorator="['telephone', {rules: rules.telephone}]"></a-input>
          </a-form-item>
        </a-col>
        <!-- TODO -->
        <a-col :xl="12">
          <a-form-item label="联系地址">
            <a-input v-decorator="['r3', {rules: rules.r2}]"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- TODO -->
      <a-row>
        <a-col :xl="24" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
          <a-form-item label="收费标准">
            <a-input disabled />
          </a-form-item>
          <a-form-item label="预定广告位">
            <a-input disabled />
          </a-form-item>
          <a-form-item label="收费价格">
            <a-input disabled />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="action-row" type="flex" justify="end">
        <a-col :xl="2">
          <a-form-item style="float: right">
            <a-button @click="closeDrawer">
              取消
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :xl="2">
          <a-form-item style="float: right">
            <a-button type="primary" html-type="submit">
              确认
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script>
  import JDate from '@/components/jeecg/JDate'
  import JUpload from '@/components/jeecg/JUpload'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import { advertisingPlace as BookAdvertisingMixin } from '../mixin/book'
  import { filterObj, promiseForm } from '@utils/util'
  import { advertisingEventForm } from '@/config/pick-fields'
  import { addAdEvent, editAdEvent } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('advertising-event-edit'),
      BookAdvertisingMixin,
    ],
    components: {
      JDate,
      JUpload,
    },
    data() {
      return {
        // Form
        fields: advertisingEventForm,
        // Rules
        rules: {
          begDate: [
            { required: true, message: '请填写预约时间' },
          ],
          endDate: [
            { required: true, message: '请填写预约时间' },
          ],
          requestPerson: [
            { required: true, message: '请填写申请人' },
          ],
          corp: [
            { required: true, message: '请填写公司/企业' },
          ],
          telephone: [
            { required: true, message: '请填写手机号码' },
          ],
          zipCode: [
            { required: true, message: '请填写邮箱' },
          ],
          r3: [
            { required: true, message: '请填写联系地址' },
          ],
        }
      }
    },
    methods: {
      async submit(ev) {
        ev.preventDefault();
        const data = await promiseForm(this.form)
        try {
          filterObj(data)
          data.parkId = this.industrialParkId
          let resp
          if (this.isEdit) {
            // data.eventId = this.record.eventId
            resp = await editAdEvent(data)
          } else {
            resp = await addAdEvent(data)
          }
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('操作成功')
          this.closeDrawer()
          this.$emit('submit')
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      async init() {
        this.getAdvertisingPlaceList()
        if (!this.isEdit) {
          await this.$nextTick()
          this.form.setFieldsValue({
            advertId: this.record.advertId,
            begDate: this.record.begDate,
            endDate: this.record.endDate,
          })
        }
      }
    },
    watch: {
      'show'(val) {
        if (!val) {
          return
        }
        this.init()
      }
    }
  }
</script>

<style lang="less">
  .advertising-event-edit {
    .form-item-label-align label {
      text-align: center;
      display: block;
      &:before {
        content: '';
      }
    }
  }
</style>