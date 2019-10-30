<template>
  <!-- 项目登记 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="审核阶段">
              <a-select v-model="queryParam.sex" placeholder="全部" >
                <a-select-option value="1" >全部</a-select-option>
                <a-select-option value="2" >部门审核</a-select-option>
                <a-select-option value="3" >分管领导审核</a-select-option>
                <a-select-option value="4" >主要领导审核</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-item label="发布人">
              <a-input placeholder="请输入发布人" v-model="queryParam.sender"></a-input>
            </a-form-item>
          </a-col>-->

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
              <a-button type="primary" @click="searchQuery">添加审核人</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- <div class="table-operator">
      <a-button type="primary" @click="readAll" icon="book">全部标注已读</a-button>
    </div>-->

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
      :rowSelection="rowSelection"
    >
      <!-- <span slot="action" slot-scope="text, record">
        <a @click="showAnnouncement(record)">审核</a>&nbsp
        <a @click="showAnnouncement(record)">项目维护</a>
      </span> -->
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
      rowSelection:{},
      columns: [
        {
          title: '审核部门',
          align: 'center',
          dataIndex: 'msgCategory'
        },
        {
          title: '审核人',
          align: 'center',
          dataIndex: 'priority'
        },
        {
          title: ' 审核阶段',
          align: 'center',
          dataIndex: 'readFlag',
          customRender: function(text) {
            if (text == '1') {
              //返回此页的数据目前是 undefined？
              return '已审核'
            } else if (text == '2') {
              return '未审核'
            } else {
              return '未审核'
            }
          }
        },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   scopedSlots: { customRender: 'action' }
        // }
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