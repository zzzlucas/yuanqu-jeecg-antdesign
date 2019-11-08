<template>
  <page-layout :title="title">
    <!-- 应该在page-layout组件vue里写abadge -->
    <!-- <div style="width:1200px;margin:auto;"> -->
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="基本信息" key="1">
          <div class="div-detail-list">
          <detail-list>
            <detail-list-item term="企业简称">{{ info.customerAbbr }}（万元）</detail-list-item>
            <detail-list-item term="企业编号">{{ info.customerNo }} </detail-list-item>
            <detail-list-item term="法人">{{ info.legalPerson }}(万元)</detail-list-item>
            <detail-list-item term="单位电话">{{ info.telephone }}(万元)</detail-list-item>
            <detail-list-item term="招商人员">{{ info.merchantManager }}</detail-list-item>
            <detail-list-item term="服务人员">{{ info.servicer }}</detail-list-item>
            <detail-list-item term="所属项目">{{ info.caseId }}</detail-list-item>
            <detail-list-item term="入驻日期">{{ info.settledDate }}</detail-list-item>
            <detail-list-item term="所属楼宇">{{ info.buidling }}</detail-list-item>
          </detail-list></div>
          <detail-list>
            <detail-list-item term="邮 箱">否{{ info.email }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="网 址">公司概况{{ info.website }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="关联客户">团队成员情况{{ info.relCustListId }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="企业简介">{{ info.content }}</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="企业标识" key="2">
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            :loading="loading"
          >
            <!-- @change -->
            <span slot="action" slot-scope="text, record">
              <a @click.stop>编辑</a>&nbsp;
              <a @click.stop>查看</a>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="附件" key="3">
          <detail-list>
            <detail-list-item term="租赁面积">1,000.00 m²</detail-list-item>
          </detail-list>
        </a-tab-pane>

        <a-tab-pane tab="分类信息" key="4">
          <detail-list>
            <detail-list-item term="联系人">周易</detail-list-item>
            <detail-list-item term="电话">1234567899</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="工商/税务信息" key="5">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="联系人" key="6">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/page/PageLayout'

import ABadge from 'ant-design-vue/es/badge/Badge'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item

import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem
  },
  data() {
    return {
      dataSource: [],
      ipagination: [],
      loading: false,
      info: {},
      // url: {
      //   list: '/park.project/mgrProjectInfo/queryById'
      // },
      columns:[
        
      ]
    }
  },

  async created() {
    if (typeof this.$route.params.id !== 'string') {
      this.$router.back()
      this.$message.warning('ID不正确')
      return false
    }
    getAction('/park.customer/baseCustomer/queryById', { id: this.$route.params.id }).then(res => {
      if (res.code === 200) {
        this.loading = false
        this.info = res.result
        console.log(this.info)
      } else {
        this.$router.back()
        this.$message.error(res.message)
      }
    })
  },

  methods: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        processing: '进行中',
        success: '完成',
        failed: '失败'
      }
      return statusMap[status]
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
// .div-detail-list{
//   .ant-row{
//     div{
//       float: left!important;
//     }
//   }
// }
// .flex1 {
//   margin-top: 15px;
//   display: flex;
//   height: 420px;

//   .flex11 {
//     width: 55%;
//     height: 100%;
//     margin-right: 10px;
//   }
//   .flex12 {
//     display: flex;
//     flex: 1;
//     flex-direction: column;
//     justify-content: space-between;
//     .ant-card {
//       margin-bottom: 10px;
//     }
//   }
// }
</style>