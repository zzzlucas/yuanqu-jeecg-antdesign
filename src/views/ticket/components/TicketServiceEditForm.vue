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
          <a-form-item label="工单类别">
            <j-dict-select-tag
              v-decorator="['orderType', {rules: rules.orderType}]"
              :triggerChange="true"
              dictCode="order_type"
              @change="changeOrderType" />
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="负责人">
            <a-input v-decorator="['principalUser', {rules: rules.principalUser}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="服务方式">
            <j-dict-select-tag
              v-decorator="['method', {rules: rules.method}]"
              :triggerChange="true"
              dictCode="service_type" />
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="是否收费">
            <a-switch v-decorator="['isCharge']"></a-switch>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="客户名称">
            <a-input v-decorator="['custName', {rules: rules.custName}]"></a-input>
          </a-form-item>
        </a-col>
        <template v-if="isCurrentTypeInProject">
          <a-col :xl="12">
            <a-form-item label="项目名称">
              <a-input v-decorator="['title', {rules: rules.title}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="经办人">
              <a-input v-decorator="['principalUser', {rules: rules.principalUser}]"></a-input> <!-- TODO: name? -->
            </a-form-item>
            <a-col :xl="24">
              <a-form-item label="附件" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">

              </a-form-item>
            </a-col>
          </a-col>
        </template>
        <template v-if="isCurrentTypeInProjectPeriod">
          <a-col :xl="12">
            <a-form-item label="项目名称">
              <a-input v-decorator="['title', {rules: rules.title}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="经办人">
              <a-input v-decorator="['principalUser', {rules: rules.principalUser}]"></a-input> <!-- TODO: name? -->
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="期限开始时间">
              <a-input v-decorator="['begDate', {rules: rules.begDate}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="期限结束时间">
              <a-input v-decorator="['endDate', {rules: rules.endDate}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item label="附件" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">

            </a-form-item>
          </a-col>
<!--          <a-col :xl="12"> &lt;!&ndash; TODO: depend on type &ndash;&gt;
            <a-form-item label="所属园区">
              <a-input v-decorator="['parkId', {rules: rules.parkId}]"></a-input>
            </a-form-item>
          </a-col>-->
        </template>
        <a-col :xl="24">
          <a-form-item label="主题" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-input v-decorator="['title', {rules: rules.title}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="内容" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <j-editor v-decorator="['content', {rules: rules.content}]" triggerChange></j-editor>
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
  import JEditor from '@/components/jeecg/JEditor'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import { filterObj, promiseForm } from '@utils/util'
  import { assetsCategoryEditForm } from '@/config/pick-fields'
  import { orderTypesWithSpecialFields } from '@views/ticket/types'
  import { addInfo, editInfo } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('ticket-service'),
    ],
    components: {
      JEditor
    },
    data() {
      return {
        // Types
        types: {
          orderTypesWithSpecialFields,
        },
        // Form
        fields: assetsCategoryEditForm,
        orderType: '',
        // Rules
        rules: {
          orderType: [
            { required: true, message: '请输入分类名称' }
          ],
          principalUser: [
            { required: true, message: '请选择负责人名称' }
          ],
          method: [
            { required: true, message: '请选择服务方式' }
          ],
          custName: [
            { required: true, message: '请输入客户名称' }
          ],
          parkId: [
            { required: true, message: '请输入所属园区' }
          ],
          title: [
            { required: true, message: '请输入主题' }
          ],
          content: [
            { required: true, message: '请输入内容' }
          ],
        },
      }
    },
    computed: {
      orderTypeProjectPeriod() {
        return this.types.orderTypesWithSpecialFields.projectPeriod.types
      },
      orderTypeProject() {
        return this.types.orderTypesWithSpecialFields.project.types
      },
      isCurrentTypeInProjectPeriod() {
        return this.orderTypeProjectPeriod.includes(this.orderType)
      },
      isCurrentTypeInProject() {
        return this.orderTypeProject.includes(this.orderType)
      },
    },
    methods: {
      changeOrderType(value) {
        this.orderType = value
      },
      async submit(ev) {
        ev.preventDefault();
        const data = await promiseForm(this.form)
        try {
          filterObj(data)
          data.parkId = this.industrialParkId
          let resp
          if (this.isEdit) {
            resp = await editInfo(data)
          } else {
            resp = await addInfo(this.orderType, data)
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
    },
    watch: {
      show(val) {
        if (!val) {
          return
        }

      },
    },
  }
</script>
