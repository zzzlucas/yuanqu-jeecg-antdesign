<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="关键字">
              <a-input placeholder="输入关键字" v-model="queryParam.titile"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="4">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
          <a-radio-group @change="handleChange" v-decorator="['auditStatus']">
            <a-radio value="1">部门审核</a-radio>
            <a-radio value="2">分管领导审核</a-radio>
            <a-radio value="3">主要领导审核</a-radio>
            <a-radio value="4">审核通过</a-radio>
            <a-radio value="5">审核未通过</a-radio>
          </a-radio-group>

          <a-col :span="8" style="float: right">
            <span style="float: right;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="AddTechProject()">新建项目</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      size="default"
      bordered
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange"
      :customRow="customRow"
    >
      <span slot="action" slot-scope="text, record">
        <a @click.stop="AuditForm(record,...arguments)">审核</a>
        <a-divider type="vertical" />
        <a @click.stop="EditTechProject(record,...arguments)">项目维护</a>
      </span>
    </a-table>

    <audit-form ref="AuditForm"></audit-form>

    <add-tech-project ref="AddTechProject" @reload="loadData"></add-tech-project>
  </a-card>
</template>
<script>
// import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import AddTechProject from './modules/AddTechProject'
import AuditForm from './modules/AuditFormM'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import Dom7 from 'dom7'

export default {
  name: 'UserAnnouncementList',
  mixins: [JeecgListMixin], //居然很重要
  components: {
    AddTechProject,
    AuditForm
  },
  data() {
    return {
      description: '',
      queryParam: {},
      auditStatusDictOptions: '',
      industrySectorValue: '',
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '项目单位',
          align: 'center',
          dataIndex: 'fillUnit'
        },
        {
          title: '经办人',
          align: 'center',
          dataIndex: 'agentPerson'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'agentTel'
        },
        {
          title: '项目名称',
          align: 'center',
          dataIndex: 'projectName'
        },
        {
          title: '所属行业',
          align: 'center',
          dataIndex: 'industrySectorValue',
          customRender: text => {
            return filterDictText(this.industrySectorValueDictOptions, text)
          }
        },
        {
          title: '项目状态',
          align: 'center',
          dataIndex: 'auditStatus',
          customRender: text => {
            return filterDictText(this.auditStatusDictOptions, text)
          }
          // customRender: function(text) {
          //   if (text == '1') {
          //     //返回此页的数据目前是 undefined？
          //     return '已审核'
          //   } else text == '2'
          //   {
          //     return '未审核'
          //   }
          // }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.project/mgrProjectLand/list'
        // editCementSend: 'sys/sysAnnouncementSend/editByAnntIdAndUserId'
        // readAllMsg: 'sys/sysAnnouncementSend/readAll'
      },
      loading: false
    }
  },
  created() {
    initDictOptions('industry_sector_value').then(res => {
      if (res.code === 0 && res.success) {
        this.industrySectorValueDictOptions = res.result
      }
    })
    initDictOptions('audit_status').then(res => {
      if (res.code === 0 && res.success) {
        this.auditStatusDictOptions = res.result
      }
    })
  },
  methods: {
    handleChange(e){
      console.log(e);
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          //过两天我应该还会来加判断条件，避免无对象获取情况的报错
          for (const item of res.result.records) {
            item.fillUnit = item.mgrProjectCust.fillUnit
            item.agentPerson = item.mgrProjectInfo.agentPerson
            item.agentTel = item.mgrProjectInfo.agentTel
            item.projectName = item.mgrProjectInfo.projectName
            item.industrySectorValue = item.mgrProjectInfo.industrySectorValue
            item.auditStatus = item.mgrProjectInfo.auditStatus
          }
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    //走编辑
    AuditForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AuditForm.edit(row)
      // console.log('row');
      // console.log(row);
    },
    AddTechProject() {
      this.$refs.AddTechProject.add()
    },
    EditTechProject(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AddTechProject.edit(row)
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            this.$router.push({ name: 'project-tech-detail-@id', params: { id: row.projectId } })
          }
        }
      }
    }

    // goAdd(record) {
    //   this.$router.push({ path: '/project/tech/addproject', query: { id: record } })
    // }
  }
}
</script>
<style scoped>
.ant-card-body .table-operator {
  margin-bottom: 18px;
}
.anty-row-operator button {
  margin: 0 5px;
}
.ant-btn-danger {
  background-color: #ffffff;
}
z .ant-modal-cust-warp {
  height: 100%;
}
.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto;
}
.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden;
}
</style>