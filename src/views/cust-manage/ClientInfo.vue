<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <!-- <a-col :md="6" :sm="8">
            <a-form-item label="项目">
              <a-input placeholder v-model="queryParam.caseId"></a-input>
            </a-form-item>
          </a-col> -->
          <a-col :md="6" :sm="8">
            <a-form-item label="楼宇">
              <a-input placeholder v-model="queryParam.buidling"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="行业类型">
              <a-input placeholder v-model="queryParam.industryCategory"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="关键字">
              <a-input placeholder="请输入客户名称" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-radio-group @change="onChange" v-model="queryParam.status">
                <a-radio :style="radioStyle" :value="1">在园</a-radio>
                <a-radio :style="radioStyle" :value="2">离园</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="8" style="float:right;">
            <span
              style="float:right;overflow: hidden;width:auto;"
              class="table-page-search-submitButtons"
            >
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
              <a-button
                type="primary"
                style="float:right;margin-left: 8px"
                @click="showZero"
                icon="search"
              >登记新客户</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">迁出</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <show-zero ref="ShowZero"></show-zero>
    <!-- 表单区域 -->
    <parks-add-form v-model="rightShow"></parks-add-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import ParksAddForm from '@views/industrial-parks/components/ParksAddForm'

import ShowZero from './modules/ShowZeroD'

export default {
  name: 'IndustrialParksList',
  components: { ParksAddForm, ShowZero },
  mixins: [JeecgListMixin],
  data() {
    return {
      description: '企业管理-客户信息列表页',
      // 表头
      columns: [
        {
          title: '序号',
          align: 'center',
          dataIndex: 'custId'
        },
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'customerName'
        },
        {
          title: '注册资本',
          align: 'center',
          dataIndex: 'registrationType'
        },
        {
          title: '成立日期',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '联系方式',
          align: 'center',
          dataIndex: 'telephone'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'telephone'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.customer/baseCustomer/list',
        // list: '/park.base/basePark/list',
        queryParam: '/park.customer/baseCustomer/queryById',
        // delete: '/park.base/basePark/delete',
        // deleteBatch: '/park.base/basePark/deleteBatch',
        // exportXlsUrl: 'park.base/basePark/exportXls',
        // importExcelUrl: 'park.base/basePark/importExcel'
      },
      rightShow: false
    }
  },
  computed: {
    // importExcelUrl: function() {
    //   return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    // }
  },
  methods: {
    // handleImportExcel() {},
    showZero() {
      this.$refs.ShowZero.detail()
    }
  }
}
</script>
<style lang="less">
@import '../../assets/less/common.less';
</style>