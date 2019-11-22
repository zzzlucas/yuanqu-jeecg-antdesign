<template>
  <a-card class="assets-list" :bordered="false">
    <a-layout>
      <a-layout-sider theme="light">
        <assets-category @select="selectCategory" />
      </a-layout-sider>
      <a-layout-content>
        <!-- Filter/Action -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24" type="flex" justify="end">
              <a-col>
                <a-form-item>
                  <a-button type="primary" @click="openAddCategory">新增分类</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- Table -->
        <a-table
          ref="table"
          size="middle"
          bordered
          :columns="columns"
          :dataSource="data"
          :pagination="ipagination"
          :loading="loading">
            <span slot="action" slot-scope="text, record">
              <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                <a>删除</a>
              </a-popconfirm>
            </span>
        </a-table>
      </a-layout-content>
    </a-layout>
    <!-- Add/Edit form -->
    <assets-category-add-form :edit="edit" :edit-data="editForm" v-model="showForm" />
  </a-card>
</template>

<script>
  import './style/list.less'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import Mixin from './mixins'
  import AssetsCategoryEditForm from './components/AssetsCategoryEditForm'

  export default {
    mixins: [JeecgListMixin, Mixin],
    components: {
      AssetsCategoryAddForm: AssetsCategoryEditForm,
    },
    data() {
      return {
        url: {
          list: '/park.asset/baseAssetCategory/list',
        },
        // Table
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
          },
          {
            title: '分类名称',
            align: 'center',
            dataIndex: 'category_name'
          },
          {
            title: '分类编码',
            align: 'center',
            dataIndex: 'category_code'
          },
          {
            title: '上级分类',
            align: 'center',
            dataIndex: 'category_parent_name'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          }
        ],
        data: [
          { category_name: '笔记本', category_code: 'BJB', category_parent_name: 'IT设备类',  },
          { category_name: '运输车辆类', category_code: 'YUNS', category_parent_name: '' },
          { category_name: 'IT设备类', category_code: 'ITSBL', category_parent_name: '' },
          { category_name: '办公设备类', category_code: 'BANG', category_parent_name: '' },
          { category_name: '家具类', category_code: 'JIAJU', category_parent_name: '' },
          { category_name: '运输车辆类', category_code: 'YUNS', category_parent_name: '' },
          { category_name: 'IT设备类', category_code: 'ITSBL', category_parent_name: '' },
          { category_name: '办公设备类', category_code: 'BANG', category_parent_name: '' },
          { category_name: '家具类', category_code: 'JIAJU', category_parent_name: '' },
        ],
        // Add/Edit form
        showForm: false,
        edit: false,
        editForm: {},
      }
    },
    methods: {
      openAddCategory() {
        this.showForm = true
      },
    }
  }
</script>

<style lang="less">

</style>