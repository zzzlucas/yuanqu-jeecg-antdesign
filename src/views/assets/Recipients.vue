<template>
  <a-card class="assets-list" :bordered="false">

    <a-layout>
      <a-layout-sider theme="light">
        <assets-category @select="selectCategory" v-if="showCategory" />
      </a-layout-sider>
      <a-layout-content>
        <!-- Filter/Action -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">
              <a-col :xl="8">
                <a-form-item label="关键字">
                  <a-input placeholder="资产名称、资产编号、规格型号" v-model="queryParam.keyword"></a-input>
                </a-form-item>
              </a-col>
              <a-col :xl="6">
                <a-form-item label="领用部门">
                  <a-select v-model="queryParam.department">
                    <a-select-option
                      :value="item.name"
                      v-for="item in filter.department"
                      :key="item.name">{{ item.label }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                </span>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :xl="8">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="handleAdd('consumables')">易耗品领用登记</a-button>
                  <a-button type="primary" @click="handleAdd('fixedAsset')" style="margin-left: 8px">固定资产领用登记</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- Table -->
        <a-table
          ref="table"
          size="middle"
          rowKey="opertionId"
          bordered
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
            <!-- Column slot -->
            <span slot="action" slot-scope="text, record">
              <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <!-- Footer -->
            <template slot="footer" class="table-operator">
              <a-button
                style="margin-left: 8px"
                type="danger"
                icon="delete"
                @click="batchDel">
                批量删除
              </a-button>
            </template>
        </a-table>
      </a-layout-content>
    </a-layout>
    <!-- Add/Edit form -->
    <assets-recipients-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { mixinList } from '@/utils/mixin'
  import Mixin from './mixins'
  import AssetsRecipientsEditForm from '@views/assets/components/AssetsRecipientsEditForm'
  import { url } from './api'
  import './style/list.less'

  export default {
    components: { AssetsRecipientsEditForm },
    mixins: [
      JeecgListMixin,
      mixinList,
      Mixin,
    ],
    data() {
      return {
        // Url
        url: url.info,
        // Filter options
        filter: {
          department: [
            { name: 'all', label: '全部' },
            { name: '1', label: '智慧办公室' },
            { name: '2', label: '班子成员' },
          ],
        },
        // Filter query
        queryParam: {
          categoryId: '',
          keyword: '',
          department: 'all',
        },
        // Table
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => Number(index) + 1
          },
          {
            title: '领用单号',
            align: 'center',
            dataIndex: 'opertionId'
          },
          {
            title: '领用日期',
            align: 'center',
            dataIndex: 'useDate'
          },
          {
            title: '领用部门',
            align: 'center',
            dataIndex: 'useDepartment'
          },
          {
            title: '领用人',
            align: 'center',
            dataIndex: 'usePerson'
          },
          {
            title: '领用资产名称',
            align: 'center',
            dataIndex: 'location'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'remark'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
      }
    },
    watch: {
      selectCategoryKey(val) {
        this.queryParam.categoryId = val
        this.loadData(1)
      },
      handleAdd(type) {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = "新增"
        this.$refs.modalForm.type = type
        this.$refs.modalForm.disableSubmit = false
      },
    }
  }
</script>
