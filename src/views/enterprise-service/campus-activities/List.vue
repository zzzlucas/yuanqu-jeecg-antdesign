<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label>
              <a-input placeholder="活动名称" v-model="queryParam.buidling"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="8">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
          <a-col :md="4" :sm="8">
            <a-dropdown v-if="selectedRowKeys.length > 0">
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="batchDel">
                  <a-icon type="delete" />删除
                </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                批量操作
                <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-col>
          <a-col :md="8" :sm="8" style="float:right;">
            <a-button style="float:right;margin-left: 8px" type="primary" @click="searchQuery">发布活动</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div class="industrial-parks-list">
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
      >
        <span slot="action" slot-scope="text, record">
          <a @click.stop="showAllot(record, ...arguments)">分配</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <show-allot ref="ShowAllot" @reload="loadData"></show-allot>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import ShowAllot from './modules/ShowAllotD'
import { getAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'

export default {
  name: 'IndustrialParksList',
  components: { ShowAllot },
  mixins: [JeecgListMixin],
  data() {
    return {
      description: '',
      dict: {
        merchantManagerExt: [{ value: '' }],
        servicerExt: [{ value: '' }],
        unitNatureExt: [{ value: '' }],
        industryCategoryExt: [{ value: '' }],
        organizationalExt: [{ value: '' }],
        technicalFieldExt: [{ value: '' }],
        enterpriseRatingExt: [{ value: '' }],
        registrationTypeExt: [{ value: '' }]
      },
      columns: [
        // {
        //   title: '序号',
        //   align: 'center',
        //   dataIndex: 'custId'
        // },
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '活动名称',
          align: 'center',
          dataIndex: 'customerName'
        },
        {
          title: '活动时间',
          align: 'center'
          // dataIndex: 'baseCustomerBusiness.registeredCapital'
        },
        {
          title: '发布时间',
          align: 'center',
          dataIndex: 'legalPerson'
        },
        {
          title: '点击数',
          align: 'center',
          dataIndex: 'baseCustomerBusiness.rCToRMB'
        },
        {
          title: '报名数',
          align: 'center',
          dataIndex: 'merchantDate'
        },
        {
          title: '评论数',
          align: 'center',
          dataIndex: 'servicer'
        },
        {
          title: '活动状态',
          align: 'center',
          dataIndex: 'servicer'
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
        queryParam: '/park.customer/baseCustomer/queryById'
      },
      temprow: '',
      rightShow: false,
      cusId: ''
    }
  },
  computed: {},
  created() {
    initDictOptions('industry_gategory').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industryCategoryExt = res.result
      }
    })
  },
  methods: {
    customRow(row) {
      return {
        on: {
          click: () => {
            console.log(row.custId)
            this.cusId = row.custId
            //拿到id
            this.$router.push({ name: 'cust-manage-detail-@id', params: { id: row.custId } })
          }
        }
      }
    },
    //
    showAllot(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowAllot.detail(row)
    },
    handleEdit(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.temprow = row
      console.log(this.temprow)
      // this.$refs.form.edit(row)
    }
  }
}
</script>
<style lang="less">
@import '../../../assets/less/common.less';
</style>