<template>
  <a-drawer
    class="form-edit-drawer"
    :title="getTitle"
    width="65%"
    closable
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer">
    <a-form class="form-edit-drawer-form" layout="horizontal" :form="form" @submit="submit">
      <a-row>
        <a-col :xl="24">
          <a-form-item label="分类名称" :label-col="gridOptions.formItem.label" :wrapper-col="gridOptions.formItem.value">
            <a-input v-decorator="['categoryName', {rules: rules.categoryName}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="分类编号" :label-col="gridOptions.formItem.label" :wrapper-col="gridOptions.formItem.value">
            <a-input disabled v-decorator="['categoryNo']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="上级分类" :label-col="gridOptions.formItem.label" :wrapper-col="gridOptions.formItem.value">
            <a-tree-select
              v-decorator="['parentCategory']"
              :treeData="categoryTreeNodes" />
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
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import { promisify, filterObj } from '@utils/util'
  import { listCategory, addCategory } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('assets-category'),
    ],
    data() {
      return {
        // Grid
        gridOptions: {
          formItem: {
            label: { span: 6 },
            value: { span: 18 }
          },
        },
        // Rules
        rules: {
          categoryName: [
            { required: true, message: '请输入分类名称' }
          ],
        },
        category: [],
      }
    },
    computed: {
      categoryTreeNodes() {
        let nodes = []
        if (!this.category || !this.category.length) {
          return nodes
        }
        // todo
        return nodes
      },
    },
    methods: {
      async getCategory() {
        if (!this.category.length) {
          await this.fetchCategory()
        }
      },
      async fetchCategory() {
        const resp = await listCategory()
        this.category = resp.result
      },
      async submit(ev) {
        ev.preventDefault();
        try {
          const values = await promisify(this.form.validateFields)
          filterObj(values)
          debugger
          console.log(this.$store)
          // await addCategory({ })
        } catch (e) {
          // Ignore
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
