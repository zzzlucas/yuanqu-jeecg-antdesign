<template>
  <a-card class="book-list" :bordered="false">
    <!-- Filter/Action -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="4">
            <a-form-item label="资源类">
              <a-select v-model="queryParam.type">
                <a-select-option :value="item.name" v-for="item in types.type" :key="item.name">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6">
            <a-form-item label="预定开始时间">
              <j-date v-model="queryParam.begDate" show-time style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="6">
            <a-form-item label="预定结束时间">
              <j-date v-model="queryParam.endDate" show-time style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="8">
            <a-form-item label="关键字">
              <a-input placeholder="资源名称、订单号、预定人、手机号" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="4">
            <a-form-item label="状态">
              <a-input placeholder="资源名称、订单号、预定人、手机号" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="4">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
          <a-col :xl="16">
            <a-form-item style="float:right">
              <a-button type="primary" @click="handleAdd('1')">广告位预定</a-button>
              <a-button type="primary" @click="handleAdd('2')" style="margin-left: 8px">会议室预定</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- table区域-begin -->
    <div class="table-operator">
      <a-button style="margin-left: 8px" type="danger" icon="delete" @click="batchDel" v-if="selectedRowKeys.length > 0">批量删除</a-button>
    </div>
    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div>
    <!-- Table -->
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="orderId"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :customRow="handleCustomRow">
      <!-- Action -->
      <span slot="action" slot-scope="text, record" @click.stop>
        <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定通过吗?" @confirm="() => handleReview(record, true)">
          <a>通过</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-popconfirm title="确定拒绝吗?" @confirm="() => handleReview(record, false)">
          <a>拒绝</a>
        </a-popconfirm>
      </span>
    </a-table>
    <!-- table区域-end -->
    <!-- Add/Edit form -->
    <advertising-event-edit-form
      ref="modalFormAdvertisingEvent"
      @submit="handleEditSubmit" />
    <meeting-event-edit-form
      ref="modalFormMeetingEvent"
      @submit="handleEditSubmit" />
  </a-card>
</template>

<script>
  import JDate from '@/components/jeecg/JDate'
  import AdvertisingEventEditForm from './components/AdvertisingEventEditForm'
  import MeetingEventEditForm from './components/MeetingEventEditForm'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import Mixin from './mixin/list'
  import { url, reviewBook } from './api'
  import '@assets/less/common.less'

  export default {
    components: {
      JDate,
      AdvertisingEventEditForm,
      MeetingEventEditForm,
    },
    mixins: [
      JeecgListMixin,
      MixinList,
      Mixin,
    ],
    data() {
      return {
        // Types
        types: {
          type: [
            { name: '', label: '全部' },
            { name: '1', label: '广告位' },
            { name: '2', label: '会议室' },
          ],
        },
        // Query
        queryParam: {
          type: '',
        },
        // Url
        url: url.book,
        // Table
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => Number(index) + 1
          },
          {
            title: '订单编号',
            align: 'center',
            dataIndex: 'opertionId'
          },
          {
            title: '资源名称',
            align: 'center',
            dataIndex: 'useDate'
          },
          {
            title: '预定时间',
            align: 'center',
            dataIndex: 'assertName'
          },
          {
            title: '金额',
            align: 'center',
            dataIndex: 'assertName'
          },
          {
            title: '预订人',
            align: 'center',
            dataIndex: 'assertName'
          },
          {
            title: '电话',
            align: 'center',
            dataIndex: 'assertName'
          },
          {
            title: '提交时间',
            align: 'center',
            dataIndex: 'assertName'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'assertName'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
      }
    },
    methods: {
      // Add/Edit
      handleAdd(type) {
        let modalForm
        if (type === '1') {
          modalForm = 'modalFormAdvertisingEvent'
        } else {
          modalForm = 'modalFormMeetingEvent'
        }
        this.$refs[modalForm].add();
        this.$refs[modalForm].disableSubmit = false;
      },
      handleEdit(record) {
        let modalForm
        if (record.type === '1') {
          modalForm = 'modalFormAdvertisingEvent'
        } else {
          modalForm = 'modalFormMeetingEvent'
        }
        this.$refs[modalForm].edit(record);
        this.$refs[modalForm].disableSubmit = false;
      },
      async handleEditSubmit() {
        this.loadData(1)
      },
      // Action
      async handleReview(record, pass) {
        try {
          // TODO
          const resp = await reviewBook({ id: record.id, status: pass ? '' : '' })
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('操作成功')
          this.loadData(1)
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      // View
      handleCustomRow(row) {
        return {
          on: {
            click: () => {
              // TODO
              let route
              let id
              if (row.type === '1') {
                route = ''
                id = ''
              } else {
                route = ''
                id = ''
              }
              this.$router.push({ name: `property-management-${route}}-info-@id`, params: { id } })
            }
          }
        }
      }
    },
    created() {

    },
  }
</script>

<style lang="less">
  .book-list {
    .ant-table-row {
      cursor: pointer;
    }
  }
</style>