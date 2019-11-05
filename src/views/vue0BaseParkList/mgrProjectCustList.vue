<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="项目ID">
              <a-input placeholder="请输入项目ID" v-model="queryParam.projectId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="单位名称">
              <a-input placeholder="请输入单位名称" v-model="queryParam.fillUnit"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="组织机构代码">
              <a-input placeholder="请输入组织机构代码" v-model="queryParam.creditCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="单位地址">
              <a-input placeholder="请输入单位地址" v-model="queryParam.unitAddress"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="成立年份">
              <a-input placeholder="请输入成立年份" v-model="queryParam.setUpYear"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
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
      <a-button type="primary" icon="download" @click="handleExportXls('项目企业信息（拿地+租赁+技改）')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <mgrProjectCust-modal ref="modalForm" @ok="modalFormOk"></mgrProjectCust-modal>
  </a-card>
</template>

<script>
  import mgrProjectCustModal from './modules/mgrProjectCustModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "mgrProjectCustList",
    mixins:[JeecgListMixin],
    components: {
      mgrProjectCustModal
    },
    data () {
      return {
        description: '项目企业信息（拿地+租赁+技改）管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '项目ID',
            align:"center",
            dataIndex: 'projectId'
           },
		   {
            title: '单位名称',
            align:"center",
            dataIndex: 'fillUnit'
           },
		   {
            title: '组织机构代码',
            align:"center",
            dataIndex: 'creditCode'
           },
		   {
            title: '单位地址',
            align:"center",
            dataIndex: 'unitAddress'
           },
		   {
            title: '成立年份',
            align:"center",
            dataIndex: 'setUpYear'
           },
		   {
            title: '企业登记注册类型',
            align:"center",
            dataIndex: 'companyRegisterType'
           },
		   {
            title: '注册资金',
            align:"center",
            dataIndex: 'registerMoney'
           },
		   {
            title: '企业总资产',
            align:"center",
            dataIndex: 'totalAsset'
           },
		   {
            title: '固定资产净值',
            align:"center",
            dataIndex: 'fixedAsset'
           },
		   {
            title: '法定代表人',
            align:"center",
            dataIndex: 'legalPerson'
           },
		   {
            title: '法人联系电话',
            align:"center",
            dataIndex: 'legalTel'
           },
		   {
            title: '电子信箱',
            align:"center",
            dataIndex: 'email'
           },
		   {
            title: '公司概况',
            align:"center",
            dataIndex: 'companyDescription'
           },
		   {
            title: '团队成员情况',
            align:"center",
            dataIndex: 'teamMemberDescription'
           },
		   {
            title: '园区ID',
            align:"center",
            dataIndex: 'parkId'
           },
		   {
            title: '版本号',
            align:"center",
            dataIndex: 'version'
           },
		   {
            title: '创建者名称',
            align:"center",
            dataIndex: 'createUserName'
           },
		   {
            title: '更新者名称',
            align:"center",
            dataIndex: 'updateUserName'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/park.project/mgrProjectInfo/list",
          // list: "/park.mgr/mgrProjectCust/list",
          delete: "/park.mgr/mgrProjectCust/delete",
          deleteBatch: "/park.mgr/mgrProjectCust/deleteBatch",
          exportXlsUrl: "park.mgr/mgrProjectCust/exportXls",
          importExcelUrl: "park.mgr/mgrProjectCust/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
     
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>