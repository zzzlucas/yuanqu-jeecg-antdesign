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
          <a-form-item label="所属分类">
            <a-tree-select
              treeDefaultExpandAll
              v-decorator="['categoryId', {rules: rules.categoryId}]"
              :treeData="categoryTreeData" />
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="资产编号">
            <a-input v-decorator="['assetNumber', {rules: rules.assetNumber}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="资产名称">
            <a-input v-decorator="['fixedAssetName', {rules: rules.fixedAssetName}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="规格型号">
            <a-input v-decorator="['assetModel']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="单价">
            <a-input v-decorator="['stockPrice']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="总价">
            <a-input v-decorator="['stockAmount']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="采购日期">
            <j-date :trigger-change="true" v-decorator="['purchaseDate',{rules: rules.purchaseDate}]" style="width: 100%;" />
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="使用状态">
            <a-input v-decorator="['useStatus', {rules: rules.useStatus}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="使用部门">
            <a-input v-decorator="['USEDept']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="使用人">
            <a-input v-decorator="['usePerson']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="存放地点" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-input v-decorator="['location']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="备注" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remark']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="附件" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">

          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="action-row" type="flex" justify="end">
        <a-col>
          <a-form-item>
            <a-button>
              取消
            </a-button>
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
  import { filterObj, promiseForm, buildTreeData } from '@utils/util'
  import { assetsRegisterEditForm } from '@/config/pick-fields'
  import { addInfo, editInfo, treeListCategory } from '../api'

  export default {
    components: {
      JDate
    },
    mixins: [
      FormEditDrawerMixin('assets-register'),
    ],
    data() {
      return {
        // Form
        fields: assetsRegisterEditForm,
        // Rules
        rules: {
          categoryId: [
            { required: true, message: '请选择所属分类' },
          ],
          assetNumber: [
            { required: true, message: '请输入资产编号' },
          ],
          fixedAssetName: [
            { required: true, message: '请输入资产名称' },
          ],
          purchaseDate: [
            { required: true, message: '请选择采购日期' },
          ],
          useStatus: [
            { required: true, message: '请选择使用状态' },
          ],
        },
        category: [],
      }
    },
    computed: {
      categoryTreeData() {
        if (!this.category || !this.category.length) {
          return []
        }
        return buildTreeData(this.category, 'categoryId', 'categoryName')
      },
    },
    methods: {
      async getCategory() {
        if (!this.category.length) {
          await this.fetchCategory()
        }
      },
      async fetchCategory() {
        const resp = await treeListCategory({ parkId: this.industrialParkId })
        this.category = resp.result
      },
      async submit(ev) {
        ev.preventDefault();
        const data = await promiseForm(this.form)
        try {
          filterObj(data)
          data.parkId = this.industrialParkId
          let resp
          if (this.isEdit) {
            data.assetId = this.record.assetId
            resp = await editInfo(data)
          } else {
            resp = await addInfo(data)
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
        this.getCategory()
      },
    },
  }
</script>
