<template>
  <!-- 跟踪记录表单  下拉1-->

  <a-modal
    :title="title"
    :width="1300"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    destroyOnClose
    :footer="null"
  >
    <a-card :bordered="false">
      <a-form :form="form">
        <a-row>
          <a-col :span="7">
            <a-form-item label="跟踪日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-range-picker></a-range-picker>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="跟踪人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select style="width:100%" defaultValue="1">
                <a-select-option value="1">小张</a-select-option>
                <a-select-option value="2">小李</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="跟踪方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="6" :sm="8"> -->
          <a-col :span="5">
            <span style="overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            </span>
          </a-col>
        </a-row>
        <a-row>
          <a-button
            @click="twoShowOne(record)"
            type="primary"
            icon="plus"
            style="float:left;margin-left:0"
          >新增</a-button>
        </a-row>
        <a-table
          ref="table"
          size="default"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSourceSTM"
          :pagination="ipaginationSTM"
          :loading="loading"
          @change="handleTableChange"
        >
          <!-- :customRow="customRow" -->
          <span slot="action" slot-scope="text, record">
            <a @click="twoShowOne(record, ...arguments)">编辑</a>
            <a-divider type="vertical" />
            <a @click="showCard(record, ...arguments)">查看</a>
            <a-divider type="vertical" />
            <a @click="deleteeee(record)">删除</a>
          </span>
        </a-table>
      </a-form>
    </a-card>
    <show-card ref="ShowCard"></show-card>
  </a-modal>
</template>

<script>
//父组件已有，子组件不需要
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'

import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ShowCard from './ShowTwoMCard'
import Dom7 from 'dom7'

export default {
  mixins: [JeecgListMixin],
  name: 'SysAnnouncementModal',
  components: { ShowCard },
  data() {
    return {
      //
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: '跟踪记录',
      record: {},
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      },
      dataSourceSTM: [],
      ipaginationSTM: [],
      visible: false,
      loading: false,
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      columns: [
        {
          title: '序号',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '跟踪日期',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '跟踪人员',
          align: 'center',
          dataIndex: 'tracker'
        },
        {
          title: '跟踪纪要',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '跟踪方式',
          align: 'center',
          dataIndex: 'trackMethod'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.project/mgrProjectTrace/list'
      }
    }
  },
  created() {
    console.log('test start-------------')
    // this.getProjectTrace()
  },
  methods: {
    detail(record) {
      this.visible = true
      this.record = record
      // this.record.projectId = record.projectId
      //this.record.projectId 获取到了，在get请求前传入值
      this.getProjectTrace()
    },
    //表格跟踪记录获取  通过projectId查询
    getProjectTrace(arg = 1) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = { projectId: this.record.projectId }
      this.loading = true
      getAction('/park.project/mgrProjectTrace/getById', params).then(res => {
        if (res.success) {
          console.log('test start getAction')
          console.log(res.result)
          this.dataSourceSTM = res.result
          this.ipaginationSTM.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    //要给卡片传recordid
    showCard(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      // console.log(row.__key)
      this.$refs.ShowCard.detail(row)
    },
    //其实是showzero
    twoShowOne(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      console.log(row.__key)
      this.$emit('showOneToZero', row)
    },

    handleOk() {},
    handleCancel() {
      this.visible = false
    },
    deleteeee() {}
  }
}
</script>

<style lang="less">
.announcementCustomModal {
  .ant-modal-header {
    border: none;
    display: inline-block;
    position: absolute;
    z-index: 1;
    right: 56px;
    padding: 0;
    .ant-modal-title {
      .custom-btn {
        width: 56px;
        height: 56px;
        border: none;
        box-shadow: none;
      }
    }
  }
  .daily-article {
    border-bottom: 0;
  }
}
</style>
<style scoped lang="less">
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
.daily-article {
  .article-button {
    font-size: 1.2rem !important;
  }
  .ant-card-body {
    padding: 18px !important;
  }
  .ant-card-head {
    padding: 0 1rem;
  }
  .ant-card-meta {
    margin-bottom: 1rem;
  }
  .article-content {
    p {
      word-wrap: break-word;
      word-break: break-all;
      text-overflow: initial;
      white-space: normal;
      font-size: 0.9rem !important;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
