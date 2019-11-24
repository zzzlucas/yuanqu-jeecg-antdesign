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
                <a-form-item label="类别">
                  <a-select v-model="queryParam.type">
                    <a-select-option
                      :value="item.name"
                      v-for="item in filter.type"
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
                <span style="float: right">
                  <a-form-item >
                    <a-button type="primary" @click="handleAdd">批量登记入库</a-button>
                    <a-button @click="handleExportXls" style="margin-left: 8px;">Excel导出</a-button>
                  </a-form-item>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- table区域-begin -->
        <div class="table-operator">
          <a-button style="margin-left: 8px" type="danger" icon="delete" @click="batchDel" v-if="selectedRowKeys.length > 0">批量删除</a-button>
        </div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
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
        </a-table>
        <!-- table区域-end -->
      </a-layout-content>
    </a-layout>
    <!-- Add/Edit form -->
    <assets-standing-book-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { mixinList } from '@/utils/mixin'
  import Mixin from './mixins'
  import { url } from './api'
  import './style/list.less'
  import AssetsStandingBookEditForm from '@views/assets/components/AssetsStandingBookEditForm'

  export default {
    components: { AssetsStandingBookEditForm },
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
          type: [
            { name: 'all', label: '全部' },
            { name: '1', label: '闲置' },
            { name: '2', label: '已领用' },
            { name: '3', label: '已借用' },
            { name: '4', label: '已处置' },
          ],
        },
        // Filter query
        queryParam: {
          categoryId: '',
          keyword: '',
          type: 'all',
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
            title: '资产名称',
            align: 'center',
            dataIndex: 'assetsName'
          },
          {
            title: '资产编号',
            align: 'center',
            dataIndex: 'assetsNumber'
          },
          {
            title: '所属分类',
            align: 'center',
            dataIndex: 'categoryName'
          },
          {
            title: '规格型号',
            align: 'center',
            dataIndex: 'assetModel'
          },
          {
            title: '单价',
            align: 'center',
            dataIndex: 'stockPrice'
          },
          {
            title: '采购日期',
            align: 'center',
            dataIndex: 'purchaseDate'
          },
          {
            title: '使用状态',
            align: 'center',
            dataIndex: 'useStatus'
          },
        ],
      }
    },
    watch: {
      selectCategoryKey(val) {
        this.queryParam.categoryId = val
        this.loadData(1)
      },
    }
  }
</script>
