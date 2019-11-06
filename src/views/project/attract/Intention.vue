<template>
  <!-- 项目登记 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="关键字">
              <a-input placeholder="输入项目名称" v-model="queryParam.titile"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="8">
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
          <!-- 右侧新建项目 -->
          <a-col :span="8" style="float: right">
            <span style="float: right;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="goAddLand()">新建项目（拿地）</a-button>
              <a-button type="primary" @click="goAddLease()" style="margin-left: 8px">新建项目（租赁）</a-button>
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
        <a-dropdown>
          <a class="ant-dropdown-link" @click.stop="showZero(record)">
            跟踪登记
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click.stop="showTwo(record)">跟踪记录</a>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="确定转为重点跟进吗?" @confirm="() => handleDelete(record.id)">
                <a>转为重点跟进</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="确定转为拟落地吗?" @confirm="() => handleDelete(record.id)">
                <a>转为拟落地</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item>
              <a @click="goLuoDi()">转为落地</a>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="确定转为留存吗?" @confirm="() => handleDelete(record.id)">
                <a>转为留存</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider type="vertical" />
        <!-- 写一个三元表达式判断对应表单类型？
        -->
        <a @click.stop="goAddLease(record)">项目维护</a>

        <a-divider type="vertical" />
        <a @click.stop="showOne(record)">项目分配</a>
      </span>
    </a-table>

    <!-- 表单区域 -->

    <!-- <mgr-project-trace-drawer v-model="rightShow"></mgr-project-trace-drawer> -->

    <show-zero ref="ShowZero"></show-zero>
    <show-two @showOneToZero="showZero" ref="ShowTwo"></show-two>
    <show-one ref="ShowOne"></show-one>

    <!-- <register-form v-model="rightShow"></register-form> -->
  </a-card>
</template>
<script>
//不知道是否必要
function stopDefault(e) {
  e.stopPropagation()
}

import { filterObj } from '@/utils/util'
//必要
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

// import Config from '@/defaultSettings'
// import RegisterForm from './modules/RegisterForm'

// import MgrProjectTraceDrawer from './modules/mgrProjectTraceDrawer'
import ShowOne from './modules/ShowOneD'
import ShowTwo from './modules/ShowTwoM'
import ShowZero from './modules/ShowZeroD'
//数据字典使用步骤0
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'UserAnnouncementList',
  mixins: [JeecgListMixin],
  components: {
    ShowOne,
    ShowTwo,
    ShowZero,
    filterDictText
    // RegisterForm,
    // MgrProjectTraceDrawer
  },
  data() {
    return {
      description: '招商项目列表页',
      queryParam: {},
      // 数据字典使用步骤1
      projectTypeDictOptions: '',
      industrySectorValueDictOptions: '',
      statusDictOptions: '',
      columns: [
        {
          title: '项目名称',
          align: 'center',
          dataIndex: 'projectName' //数据绑定项目
        },
        //用数据字典过滤，便于维护人员操作       数据字典使用步骤2
        {
          title: '项目类别',
          align: 'center',
          dataIndex: 'projectType',
          customRender: text => {
            return filterDictText(this.projectTypeDictOptions, text)
          }
        },
        {
          title: '行业类别',
          align: 'center',
          dataIndex: 'industrySectorValue',
          customRender: text => {
            return filterDictText(this.industrySectorValueDictOptions, text)
          }
        },
        {
          title: '总投资（万元）',
          align: 'center',
          dataIndex: 'sendTime'
        },
        {
          title: '项目联系人',
          align: 'center',
          dataIndex: 'agentPerson'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'agentTel'
        },
        {
          title: '项目状态',
          align: 'center',
          dataIndex: 'status',
          customRender: text => {
            return filterDictText(this.statusDictOptions, text)
          }
        },
        {
          title: '拿地面积（m²）',
          align: 'center',
          dataIndex: 'gainArea'
        },
        {
          title: '最近跟踪纪要',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      customRow: record => {
        return {
          on: {
            click: e => {
              this.$router.push({ path: '/project/attract/detail' })
              // this.$router.push({ path: '/project/attract/detail/:record.projectId' })
            }
          }
        }
      },
      url: {
        // list: '/sys/sysAnnouncementSend/getMyAnnouncementSend',
        list: '/park.project/mgrProjectInfo/list',
        editCementSend: 'sys/sysAnnouncementSend/editByAnntIdAndUserId',
        readAllMsg: 'sys/sysAnnouncementSend/readAll'
      },
      loading: false,
      confirmLoading: false
      // rightShow: false
    }
  },
  mounted() {
    // console.log('接下来显示数据 zzz')
    // console.log(this.columns)
    // console.log(this.columns.gainArea)
  },
  created() {
    //数据字典使用步骤3
    this.initDictConfig()
  },
  methods: {
    // searchQuery() {},
    // searchQuery() {
    //   this.loadData(1)
    // },
    // 数据字典使用步骤4
    initDictConfig() {
      initDictOptions('projectType').then(res => {
        if (res.success) {
          this.projectTypeDictOptions = res.result
        }
      })
      initDictOptions('industrySectorValue').then(res => {
        if (res.success) {
          this.industrySectorValueDictOptions = res.result
        }
      })
      initDictOptions('project_status').then(res => {
        if (res.success) {
          this.statusDictOptions = res.result
        }
      })
    },
    goAddLand() {
      this.$router.push({ path: '/project/attract/addprojectland' })
    },
    goAddLease() {
      this.$router.push({ path: '/project/attract/addprojectlease' })
    },
    goLuoDi() {
      this.$router.push({ path: '/project/attract/ldxm' })
    },
    handleDetail: function(record) {
      this.$refs.sysAnnouncementModal.detail(record)
      this.$refs.sysAnnouncementModal.title = '查看'
    },
    showOne(record) {
      // console.log("1101.1445 showone");
      putAction(this.url.editCementSend, { anntId: record.anntId }).then(res => {
        if (res.success) {
          this.loadData()
        }
      })
      this.$refs.ShowOne.detail(record)
    },
    showTwo(record) {
      // putAction(this.url.editCementSend, { anntId: record.anntId }).then(res => {
      //   if (res.success) {
      //     this.loadData()
      //   }
      // })
      this.$refs.ShowTwo.detail(record)
    },
    showZero(record) {
      // console.log("1101.1445 showzero");
      // putAction(this.url.editCementSend, { anntId: record.anntId }).then(res => {
      //   if (res.success) {
      //     this.loadData()
      //   }
      // })
      this.$refs.ShowZero.detail(record)
    },
    readAll() {
      var that = this
      that.$confirm({
        title: '确认操作',
        content: '是否全部标注已读?',
        onOk: function() {
          putAction(that.url.readAllMsg).then(res => {
            if (res.success) {
              that.$message.success(res.message)
              that.loadData()
            }
          })
        }
      })
    }
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