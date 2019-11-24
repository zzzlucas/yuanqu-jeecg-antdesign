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
          <a-form-item label="借用日期">
            <a-input v-decorator="['categoryId', {rules: rules.categoryId}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="借用人">
            <a-input v-decorator="['categoryId2', {rules: rules.categoryId2}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="备注" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remark']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="借用资产" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-button @click="openAssetModal">添加</a-button>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="附件" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">

          </a-form-item>
        </a-col>
        <!--        <a-col :xl="24">
                  <a-form-item label="上级分类" :label-col="gridOptions.formItem.label" :wrapper-col="gridOptions.formItem.value">
                    <a-tree-select
                      treeDefaultExpandAll
                      v-decorator="['parentId']"
                      :treeData="categoryTreeData" />
                  </a-form-item>
                </a-col>-->
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
    <!-- Asset modal -->
    <assets-search-modal v-model="assetModal" />
  </a-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import AssetsSearchModal from './AssetsSearchModal'
  import { filterObj, promiseForm, buildTreeData } from '@utils/util'
  import { assetsRegisterEditForm } from '@/config/pick-fields'
  import { addInfo, editInfo, treeListCategory } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('assets-borrow'),
    ],
    components: {
      AssetsSearchModal,
    },
    data() {
      return {
        // Form
        fields: assetsRegisterEditForm,
        // Rules
        rules: {
          categoryId: [
            { required: true, message: '请选择借用日期' },
          ],
          categoryId2: [
            { required: true, message: '请输入借用人' },
          ],
        },
        category: [],
        // Asset modal
        assetModal: false,
      }
    },
    computed: {
      ...mapGetters([
        'industrialParkId'
      ]),
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
      openAssetModal() {
        this.assetModal = true
      },
      async submit(ev) {
        ev.preventDefault();
        const data = await promiseForm(this.form)
        try {
          filterObj(data)
          data.parkId = this.industrialParkId
          let resp
          if (this.isEdit) {
            data.categoryId = this.record.categoryId
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
