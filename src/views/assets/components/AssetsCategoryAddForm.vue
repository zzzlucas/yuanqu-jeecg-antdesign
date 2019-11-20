<template>
  <a-drawer
    :title="getTitle"
    width="65%"
    closable
    :mask-closable="false"
    :visible="show"
    @close="closeDrawer">
    <a-form class="drawer-form" layout="horizontal" :form="form">
      <a-row>
        <a-col :xl="12">
          <a-form-item label="分类名称" :label-col="gridOptions.formItem.label" :wrapper-col="gridOptions.formItem.value">
            <a-input v-decorator="['categoryName', {rules: rules.categoryName}]"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script>
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'

  export default {
    mixins: [
      FormEditDrawerMixin('assets-category')
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
      }
    },
  }
</script>

<style lang="less">

</style>