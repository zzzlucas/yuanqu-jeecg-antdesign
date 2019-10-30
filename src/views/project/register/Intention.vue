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
    >
      <span slot="action" slot-scope="text, record">
        <a @click="showAnnouncement(record)">跟踪登记</a>&nbsp;
        <a @click="showAnnouncement(record)">项目维护</a>&nbsp;
        <a @click="showAnnouncement(record)">项目分配</a>
      </span>
    </a-table>

    <show-announcement ref="ShowAnnouncement"></show-announcement>
  </a-card>
</template>
<script>
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import ShowAnnouncement from '@/components/tools/ShowAnnouncement'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
export default {
  name: 'UserAnnouncementList',
  mixins: [JeecgListMixin],
  components: {
    ShowAnnouncement
  },
  data() {
    return {
      description: '项目登记页面（原系统通告表管理页面）',
      queryParam: {},
      columns: [
        {
          title: '项目名称',
          align: 'center',
          dataIndex: 'titile' //数据绑定项目
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
          title: '行业类别',
          align: 'center',
          dataIndex: 'sender',
          customRender: function(text) {
            if (text == '1') {
              //返回此页的数据目前是admin 字符串
              return '移动互联网'
            } else if (text == '2') {
              return '移动互联网'
            } else {
              return '移动互联网'
            }
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
          dataIndex: 'priority'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '项目状态',
          align: 'center',
          dataIndex: 'readFlag',
          customRender: function(text) {
            if (text == '1') {
              //返回此页的数据目前是 undefined？
              return '已申报'
            } else if (text == '2') {
              return '未申报'
            } else {
              return '未申报'
            }
          }
        },
        {
          title: '拿地面积（m²）',
          align: 'center',
          dataIndex: ''
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
      url: {
        list: '/sys/sysAnnouncementSend/getMyAnnouncementSend',
        editCementSend: 'sys/sysAnnouncementSend/editByAnntIdAndUserId',
        readAllMsg: 'sys/sysAnnouncementSend/readAll'
      },
      loading: false
    }
  },
  created() {
    //生效了？？？ url.list ?
    this.loadData()
  },
  methods: {
    //路由跳转   
    goAddLand() {
      this.$router.push({ path: '/project/register/addprojectland' })
    },
    goAddLease() {
      this.$router.push({ path: '/project/register/addprojectlease' })
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