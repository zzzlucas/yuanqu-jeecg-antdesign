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
            <a-form-item label="建设项目名称">
              <a-input placeholder="请输入建设项目名称" v-model="queryParam.projectName"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="项目类型">
              <a-input placeholder="请输入项目类型" v-model="queryParam.projectType"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="经办人">
              <a-input placeholder="请输入经办人" v-model="queryParam.agentPerson"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="经办人联系电话">
              <a-input placeholder="请输入经办人联系电话" v-model="queryParam.agentTel"></a-input>
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
    <mgrProjectInfo-modal ref="modalForm" @ok="modalFormOk"></mgrProjectInfo-modal>
  </a-card>
</template>

<script>
  import mgrProjectInfoModal from './modules/mgrProjectInfoModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "mgrProjectInfoList",
    mixins:[JeecgListMixin],
    components: {
      mgrProjectInfoModal
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
            title: '建设项目名称',
            align:"center",
            dataIndex: 'projectName'
           },
		   {
            title: '项目类型',
            align:"center",
            dataIndex: 'projectType'
           },
		   {
            title: '经办人',
            align:"center",
            dataIndex: 'agentPerson'
           },
		   {
            title: '经办人联系电话',
            align:"center",
            dataIndex: 'agentTel'
           },
		   {
            title: '所属主体',
            align:"center",
            dataIndex: 'belongSubject'
           },
		   {
            title: '投资主体',
            align:"center",
            dataIndex: 'investorValue'
           },
		   {
            title: '企业ID',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '拟建设地址',
            align:"center",
            dataIndex: 'getLandBuildingAddress'
           },
		   {
            title: '主要建设内容及规模',
            align:"center",
            dataIndex: 'mainBuildingContent'
           },
		   {
            title: '亩均效绩介',
            align:"center",
            dataIndex: 'areaPerformance'
           },
		   {
            title: '主要原料',
            align:"center",
            dataIndex: 'mainMaterial'
           },
		   {
            title: '消耗量',
            align:"center",
            dataIndex: 'materialCost'
           },
		   {
            title: '主要产品',
            align:"center",
            dataIndex: 'mainProduct'
           },
		   {
            title: '产出量',
            align:"center",
            dataIndex: 'productOutput'
           },
		   {
            title: '水、电等配套情况',
            align:"center",
            dataIndex: 'waterElec'
           },
		   {
            title: '环保、消防等措施',
            align:"center",
            dataIndex: 'greenFire'
           },
		   {
            title: '总用地面积',
            align:"center",
            dataIndex: 'allUseArea'
           },
		   {
            title: '新征用地面积',
            align:"center",
            dataIndex: 'newUseArea'
           },
		   {
            title: '租赁建设面积',
            align:"center",
            dataIndex: 'rentBuildArea'
           },
		   {
            title: '所属行业',
            align:"center",
            dataIndex: 'industrySectorValue'
           },
		   {
            title: '建设年限起',
            align:"center",
            dataIndex: 'buildingBeginDate'
           },
		   {
            title: '建设年限止',
            align:"center",
            dataIndex: 'buildingEndDate'
           },
		   {
            title: '是否人才项目',
            align:"center",
            dataIndex: 'isTalentProject'
           },
		   {
            title: '拿地面积',
            align:"center",
            dataIndex: 'gainArea'
           },
		   {
            title: '年产值',
            align:"center",
            dataIndex: 'annualProductionValue'
           },
		   {
            title: '年税金',
            align:"center",
            dataIndex: 'annualTaxes'
           },
		   {
            title: '项目状态',
            align:"center",
            dataIndex: 'status'
           },
		   {
            title: '项目申请理由简述',
            align:"center",
            dataIndex: 'applyReason'
           },
		   {
            title: '项目工艺流程及说明',
            align:"center",
            dataIndex: 'projectTechnologyFlow'
           },
		   {
            title: '重要程度',
            align:"center",
            dataIndex: 'importance'
           },
		   {
            title: '跟踪人员',
            align:"center",
            dataIndex: 'projectManager'
           },
		   {
            title: '审核状态',
            align:"center",
            dataIndex: 'auditStatus'
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
          delete: "/park.mgr/mgrProjectInfo/delete",
          deleteBatch: "/park.mgr/mgrProjectInfo/deleteBatch",
          exportXlsUrl: "park.mgr/mgrProjectInfo/exportXls",
          importExcelUrl: "park.mgr/mgrProjectInfo/importExcel",
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