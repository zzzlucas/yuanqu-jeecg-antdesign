<template>
  <a-drawer
    wrapClassName="meeting-event-edit-form form-edit-drawer"
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
          <!-- TODO -->
          <a-form-item label="名称" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-input v-decorator="['projectId', {rules: rules.projectId}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="预约时间">
            <a-input v-decorator="['begDate', {rules: rules.begDate}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <!-- TODO -->
          <a-form-item label="—">
            <a-input v-decorator="['endDate', {rules: rules.endDate}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <!-- TODO -->
          <a-form-item label="申请人">
            <a-input v-decorator="['r', {rules: rules.r}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <!-- TODO -->
          <a-form-item label="联系电话">
            <a-input v-decorator="['r1', {rules: rules.r1}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <!-- TODO -->
          <a-form-item label="状态">
            <a-input v-decorator="['r2', {rules: rules.r2}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <!-- TODO -->
          <a-form-item label="备注" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remarks']" :rows="6" />
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
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import { filterObj, promiseForm } from '@utils/util'
  import { addEvent, editEvent } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('meeting-event-edit'),
    ],
    components: {
      JDate,
    },
    data() {
      return {

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
            data.eventId = this.record.eventId
            resp = await editEvent(data)
          } else {
            resp = await addEvent(data)
          }
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('添加成功')
          this.closeDrawer()
          this.$emit('submit')
        } catch (e) {
          this.$message.error(e.message)
        }
      },
    }
  }
</script>

