<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名称" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="项目状态">
              <a-select placeholder="请选择项目状态" allow-clear v-model="queryParam.status">
                <a-select-option value="1">未开始</a-select-option>
                <a-select-option value="2">进行中</a-select-option>
                <a-select-option value="3">已完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="项目类别">
                <a-select placeholder="请选择项目类别" allow-clear v-model="queryParam.types">
                  <a-select-option value="1">工业项目</a-select-option>
                  <a-select-option value="2">住宅项目</a-select-option>
                  <a-select-option value="3">商业项目</a-select-option>
                  <a-select-option value="4">基础设施项目</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="项目进展">
                <a-select placeholder="请选择项目进展" allow-clear v-model="queryParam.engineeringProcess">
                  <a-select-option value="1">前期准备</a-select-option>
                  <a-select-option value="2">办证</a-select-option>
                  <a-select-option value="3">已入库</a-select-option>
                  <a-select-option value="4">在建中</a-select-option>
                  <a-select-option value="5">已竣工</a-select-option>
                  <a-select-option value="6">已投产</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('工程项目')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a style="margin-left: 5px;">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <mgrEngineeringInfo-drawer ref="modalForm" @ok="modalFormOk"></mgrEngineeringInfo-drawer>
  </a-card>
</template>

<script>
  import MgrEngineeringInfoDrawer from './modules/MgrEngineeringInfoDrawer'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: 'MgrEngineeringInfoList',
    mixins: [JeecgListMixin],
    components: {
      MgrEngineeringInfoDrawer
    },
    data() {
      return {
        deleteKey: 'projectId',
        description: '工程项目管理页面',
        // 表头
        columns: [
          {
            title: '项目ID',
            align: 'center',
            dataIndex: 'projectId'
          },
          {
            title: '项目名称',
            align: 'center',
            dataIndex: 'projectName'
          },
          {
            title: '项目类别',
            align: 'center',
            dataIndex: 'types'
          },
          {
            title: '所属单位',
            align: 'center',
            dataIndex: 'customerName'
          },
          {
            title: '项目总投资（万元）',
            align: 'center',
            dataIndex: 'invest'
          },
          {
            title: '项目进展',
            align: 'center',
            dataIndex: 'engineeringProcess'
          },
          {
            title: '计划开工日期',
            align: 'center',
            dataIndex: 'planStartDate'
          },
          {
            title: '计划完工日期',
            align: 'center',
            dataIndex: 'planEndDate'
          },
          {
            title: '项目性质',
            align: 'center',
            dataIndex: 'nature'
          },
          {
            title: '项目状态',
            align: 'center',
            dataIndex: 'status'
          },
          {
            title: '总建筑面积',
            align: 'center',
            dataIndex: 'overGroundArea'
          },
          {
            title: '总建筑面积',
            align: 'center',
            dataIndex: 'underGroundArea'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/park.engineering/mgrEngineeringInfo/list',
          delete: '/park.engineering/mgrEngineeringInfo/delete',
          deleteBatch: '/park.engineering/mgrEngineeringInfo/deleteBatch',
          exportXlsUrl: 'park.engineering/mgrEngineeringInfo/exportXls',
          importExcelUrl: 'park.engineering/mgrEngineeringInfo/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {}
  }
</script>
<style lang="less">
  @import '~@assets/less/common.less';
</style>