<template>
  <!-- 项目登记 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="类别">
              <a-select v-model="queryParam.sex" placeholder="工业项目">
                <a-select-option value="1">工业项目</a-select-option>
                <a-select-option value="2">住宅项目</a-select-option>
                <a-select-option value="3">商业项目</a-select-option>
                <a-select-option value="4">基础设施项目</a-select-option>
                <a-select-option value="4">字典表管理</a-select-option>
              </a-select>
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
              <a-button type="primary" @click="add">立项登记</a-button>
              <!-- <ad ref="myd"></ad>
              <am ref="mym"></am> -->
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
        <a @click="showAnnouncement(record)">跟踪登记</a>&nbsp;
        <a @click="showAnnouncement(record)">跟踪记录</a>&nbsp;
        <a @click="showAnnouncement(record)">进程管理</a>
      </span>
    </a-table>

    <show-announcement ref="ShowAnnouncement"></show-announcement>
  </a-card>
</template>

<script>
import ad from './Drawer' //这里是右侧抽屉
import am from './Modal' //这里是中间对话框

import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import ShowAnnouncement from '@/components/tools/ShowAnnouncement'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
export default {
  name: 'UserAnnouncementList',
  mixins: [JeecgListMixin],
  components: {
    ShowAnnouncement,
    ad,
    am
  },
  data() {
    return {
      customRow: record => {
        return {
          on: {
            click: e => {
              // this.modalShow = true
              this.$router.push({ path: '/project/engi/detail' })
            }
          }
        }
      },
      description: '项目登记页面（原系统通告表管理页面）',
      queryParam: {},
      columns: [
        {
          title: '所在园区',
          align: 'center',
          dataIndex: 'titile' //数据绑定项目
        },
        {
          title: '项目名称',
          align: 'center',
          dataIndex: '' //数据绑定项目
        },
        {
          title: '项目类别',
          align: 'center',
          dataIndex: 'msgCategory',
          customRender: function(text) {
            if (text == '1') {
              return '租赁'
            } else if (text == '2') {
              return '拿地'
            } else {
              return text
            }
          }
        },
        {
          title: '项目总投资（万元）',
          align: 'center',
          dataIndex: 'sendTime'
        },
        {
          title: '计划开竣工日期',
          align: 'center',
          dataIndex: 'priority'
        },
        {
          title: '项目进展',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '总用地面积m2',
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
      url: {
        list: '/sys/sysAnnouncementSend/getMyAnnouncementSend',
        editCementSend: 'sys/sysAnnouncementSend/editByAnntIdAndUserId',
        readAllMsg: 'sys/sysAnnouncementSend/readAll'
      },
      loading: false
    }
  },
  created() {
    // url.list ?
    this.loadData()
  },
  methods: {
    add() {
      this.$refs.myd.showDrawer()
    },
    info() {
      this.$refs.mym.showDrawer()
    },
    handleDetail: function(record) {
      this.$refs.sysAnnouncementModal.detail(record)
      this.$refs.sysAnnouncementModal.title = '查看'
    },
    showAnnouncement(record) {
      putAction(this.url.editCementSend, { anntId: record.anntId }).then(res => {
        if (res.success) {
          this.loadData()
        }
      })
      this.$refs.ShowAnnouncement.detail(record)
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