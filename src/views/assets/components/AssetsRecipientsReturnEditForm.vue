<template>
  <a-drawer
    class="form-edit-drawer"
    :title="getTitle"
    width="65%"
    closable
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
        <a-col :xl="12">
          <a-form-item label="资产编号">
            <a-input v-decorator="['assetNumber']" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="资产名称">
            <a-input v-decorator="['fixedAssetName']" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="归还人">
            <a-input v-decorator="['usePerson', {rules: rules.usePerson}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="归还部门">
            <a-input v-decorator="['useDepartment']" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="操作人">
            <a-input v-decorator="['usePerson']" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="归还时间">
            <a-input v-decorator="['useDate']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="归还原因" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['reason', {rules: rules.reason}]" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="备注" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remark']" :rows="6" />
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
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import { filterObj, promiseForm } from '@utils/util'
  import { assetsRegisterEditForm } from '@/config/pick-fields'
  import { addInfo } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('assets-recipients-return'),
    ],
    data() {
      return {
        // Form
        type: '',
        fields: assetsRegisterEditForm,
        // Rules
        rules: {
          usePerson: [
            { required: true, message: '请输入归还人' },
          ],
          reason: [
            { required: true, message: '请输入归还原因' },
          ],
        },
        category: [],
        // Asset modal
        assetModal: false,
      }
    },
    methods: {
      openAssetModal() {
        this.assetModal = true
      },
      async submit(ev) {
        ev.preventDefault();
        const data = await promiseForm(this.form)
        try {
          filterObj(data)
          data.parkId = this.industrialParkId
          const resp = await addInfo(data)
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
    },

  }
</script>
