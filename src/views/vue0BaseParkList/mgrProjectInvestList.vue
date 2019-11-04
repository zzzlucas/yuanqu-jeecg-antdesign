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
            <a-form-item label="项目总投资">
              <a-input placeholder="请输入项目总投资" v-model="queryParam.investAmount"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="其中项目用汇">
              <a-input placeholder="请输入其中项目用汇" v-model="queryParam.projectUseInvest"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="注册资本">
              <a-input placeholder="请输入注册资本" v-model="queryParam.registerCapital"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="是否外资">
              <a-input placeholder="请输入是否外资" v-model="queryParam.isForeignCapital"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('项目投资信息（拿地+技改）')">导出</a-button>
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
    <mgrProjectInvest-modal ref="modalForm" @ok="modalFormOk"></mgrProjectInvest-modal>
  </a-card>
</template>

<script>
  import mgrProjectInvestModal from './modules/mgrProjectInvestModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "mgrProjectInvestList",
    mixins:[JeecgListMixin],
    components: {
      mgrProjectInvestModal
    },
    data () {
      return {
        description: '项目投资信息（拿地+技改）管理页面',
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
            title: '项目总投资',
            align:"center",
            dataIndex: 'investAmount'
           },
		   {
            title: '其中项目用汇',
            align:"center",
            dataIndex: 'projectUseInvest'
           },
		   {
            title: '注册资本',
            align:"center",
            dataIndex: 'registerCapital'
           },
		   {
            title: '是否外资',
            align:"center",
            dataIndex: 'isForeignCapital'
           },
		   {
            title: '固定资产投资',
            align:"center",
            dataIndex: 'fixedAssetInvest'
           },
		   {
            title: '土建',
            align:"center",
            dataIndex: 'civilWork'
           },
		   {
            title: '安装',
            align:"center",
            dataIndex: 'install'
           },
		   {
            title: '设备',
            align:"center",
            dataIndex: 'device'
           },
		   {
            title: '工程建设其他费用',
            align:"center",
            dataIndex: 'projectBuilding'
           },
		   {
            title: '预备费',
            align:"center",
            dataIndex: 'budget'
           },
		   {
            title: '建设期利息',
            align:"center",
            dataIndex: 'buildingInterest'
           },
		   {
            title: '铺底流动资金',
            align:"center",
            dataIndex: 'bottomWorkingCapital'
           },
		   {
            title: '自由资金',
            align:"center",
            dataIndex: 'freeCapital'
           },
		   {
            title: '股票/债券',
            align:"center",
            dataIndex: 'sharesBond'
           },
		   {
            title: '银行贷款',
            align:"center",
            dataIndex: 'bankLoan'
           },
		   {
            title: '其他',
            align:"center",
            dataIndex: 'otherCapital'
           },
		   {
            title: '新增销售收入',
            align:"center",
            dataIndex: 'newSale'
           },
		   {
            title: '新增利润',
            align:"center",
            dataIndex: 'newProfit'
           },
		   {
            title: '新增税金',
            align:"center",
            dataIndex: 'newTax'
           },
		   {
            title: '创汇',
            align:"center",
            dataIndex: 'foreignEarning'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '园区ID',
            align:"center",
            dataIndex: 'parkId'
           },
		   {
            title: '附件组ID',
            align:"center",
            dataIndex: 'addDocFiles'
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
          delete: "/park.mgr/mgrProjectInvest/delete",
          deleteBatch: "/park.mgr/mgrProjectInvest/deleteBatch",
          exportXlsUrl: "park.mgr/mgrProjectInvest/exportXls",
          importExcelUrl: "park.mgr/mgrProjectInvest/importExcel",
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