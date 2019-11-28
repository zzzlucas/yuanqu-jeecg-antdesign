<template>
  <div class="meeting-list">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8">
            <a-form-item label="关键字">
              <a-input placeholder="资源名称、订单号、预订人、手机号" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="5">
            <a-form-item label="厂房">
              <j-dict-select-tag
                v-model="queryParam.orderType"
                :dict="types.order_type" />
            </a-form-item>
          </a-col>
          <a-col :xl="5">
            <a-form-item label="楼宇">
              <j-dict-select-tag
                v-model="queryParam.orderType"
                :dict="types.order_type" />
            </a-form-item>
          </a-col>
          <a-col :xl="5">
            <a-form-item label="人数限制">
              <j-dict-select-tag
                v-model="queryParam.orderType"
                :dict="types.order_type" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :xl="4">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
          <a-col :xl="20">
            <a-form-item style="float:right">
              <a-button type="primary" @click="handleAdd">新建</a-button>
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
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <!-- Column slot -->
      <span slot="action" slot-scope="text, record" @click.stop>
        <a-divider type="vertical" />
        <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>
    <!-- table区域-end -->
    <!-- Add/Edit form -->
    <meeting-room-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </div>
</template>

<script>
  import MeetingRoomEditForm from '@views/property-management/components/MeetingRoomEditForm'
  import JDate from '@/components/jeecg/JDate'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import { url } from '../api'
  import '@assets/less/common.less'

  export default {
    mixins: [
      JeecgListMixin,
      MixinList,
    ],
    components: {
      JDate,
      MeetingRoomEditForm,
    },
    data() {
      return {
        // Url
        url: url.meetingRoom,
        // Filter query
        queryParam: {
          orderType: '',
          keyword: '',
          status: '',
        },
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
            dataIndex: 'orderId'
          },
          {
            title: '资源名称',
            align: 'center',
            dataIndex: 'title'
          },
          {
            title: '预定时间',
            align: 'center',
            dataIndex: 'custName'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            /*customRender: t => {
              return filterDictText(this.types.order_status, t)
            }*/
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
      async handleEditSubmit() {
        this.loadData(1)
      },
    },
  }

</script>

<style lang="less">
  .meeting-list {
    .ant-table-row {
      cursor: pointer;
    }
  }
</style>