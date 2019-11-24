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
                <a-form-item label="借用部门">
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
              <a-col :xl="4">
                <a-form-item style="float:right">
                  <a-button type="primary" @click="handleAdd">固定资产借用登记</a-button>
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
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
        </a-table>
      </a-layout-content>
    </a-layout>
    <!-- Add/Edit form -->
    <assets-borrow-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { mixinList } from '@/utils/mixin'
  import Mixin from './mixins'
  import AssetsBorrowEditForm from '@views/assets/components/AssetsBorrowEditForm'
  import { url } from './api'
  import './style/list.less'

  export default {
    components: { AssetsBorrowEditForm },
    mixins: [
      JeecgListMixin,
      mixinList,
      Mixin
    ],
    data() {
      return {
        // Url
        //url: url.info
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
            title: '借用单号',
            align: 'center',
            dataIndex: 'operation_id'
          },
          {
            title: '借用日期',
            align: 'center',
            dataIndex: 'use_date'
          },
          {
            title: '借用部门',
            align: 'center',
            dataIndex: 'use_person_department'
          },
          {
            title: '借用人',
            align: 'center',
            dataIndex: 'use_person'
          },
          {
            title: '借用资产名称',
            align: 'center',
            dataIndex: 'use_assets_name'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'remark'
          },
        ],
        data: [
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '借用人', use_assets_name: '借用资产名称', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '3125436435r', use_assets_name: 'dfsafsatfsavs', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '3125436435r', use_assets_name: 'dfsafsatfsavs', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '3125436435r', use_assets_name: 'dfsafsatfsavs', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '3125436435r', use_assets_name: 'dfsafsatfsavs', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '借用人', use_assets_name: '借用资产名称', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '3125436435r', use_assets_name: 'dfsafsatfsavs', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '3125436435r', use_assets_name: 'dfsafsatfsavs', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '3125436435r', use_assets_name: 'dfsafsatfsavs', remark: 'ok' },
          { operation_id: '11111111111111111111', use_date: '2019-11-20 16:05:06', use_person_department: 'IT设备类', use_person: '3125436435r', use_assets_name: 'dfsafsatfsavs', remark: 'ok' },
        ],
      }
    }
  }
</script>
