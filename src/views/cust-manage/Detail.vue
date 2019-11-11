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
              <detail-list-item term="企业编号">{{ info.customerNo }}</detail-list-item>
              <detail-list-item term="法人">{{ info.legalPerson }}(万元)</detail-list-item>
              <detail-list-item term="单位电话">{{ info.telephone }}(万元)</detail-list-item>
              <detail-list-item term="招商人员">{{ info.merchantManager }}</detail-list-item>
              <detail-list-item term="服务人员">{{ info.servicer }}</detail-list-item>
              <detail-list-item term="所属项目">{{ info.caseId }}</detail-list-item>
              <detail-list-item term="入驻日期">{{ info.settledDate }}</detail-list-item>
              <detail-list-item term="所属楼宇">{{ info.buidling }}</detail-list-item>
            </detail-list>
          </div>
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
          <!-- <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columnsA"
            :dataSource="dataSource"
            :pagination="ipagination"
            :loading="loading"
          >
            <span slot="action" slot-scope="text, record">
              <a @click.stop>编辑</a>&nbsp;
              <a @click.stop>查看</a>
            </span>
          </a-table> -->
        </a-tab-pane>
        <a-tab-pane tab="附件" key="3">
          <detail-list>
            <detail-list-item term="附件">ASDASD</detail-list-item>
          </detail-list>
        </a-tab-pane>

        <a-tab-pane tab="分类信息" key="4">
          <!-- <detail-list>
            <detail-list-item term="公司性质">{{dictText.unitNatureText}}</detail-list-item>
            <detail-list-item term="行业类型">{{dictText.industryCategoryText}}</detail-list-item>
            <detail-list-item term="公司类型">{{dictText.organizationalText}}</detail-list-item>
            <detail-list-item term="技术领域">{{dictText.technicalFieldText}}</detail-list-item>
            <detail-list-item term="企业评级">{{dictText.enterpriseRatingText}}</detail-list-item>
            <detail-list-item term="注册类型">{{dictText.registrationTypeText}}</detail-list-item>
          </detail-list> -->
        </a-tab-pane>
        <a-tab-pane tab="工商/税务信息" key="5">
          <!-- <detail-list>
            <detail-list-item term="注册日期">{{info.baseCustomerBusiness.registDate}}</detail-list-item>
            <detail-list-item term="注册资本">{{info.baseCustomerBusiness.registeredCapital}}</detail-list-item>
            <detail-list-item term="转化为人民币">{{info.baseCustomerBusiness.rctoRMB}}</detail-list-item>
            <detail-list-item term="工商状态">{{info.baseCustomerBusiness.bussinessStatus}}</detail-list-item>
            <detail-list-item term="税务状态">{{info.baseCustomerBusiness.taxStatus}}</detail-list-item>
            <detail-list-item term="统一社会信用号码">{{info.baseCustomerBusiness.creditCode}}</detail-list-item>
            <detail-list-item term="注册地址">{{info.baseCustomerBusiness.registerAddress}}</detail-list-item>
            <detail-list-item term="注册地邮编">{{info.baseCustomerBusiness.registerAddressZipCode}}</detail-list-item>
            <detail-list-item term="经营范围">{{info.baseCustomerBusiness.businessScope}}</detail-list-item>
            <detail-list-item term="特许经营范围">{{info.baseCustomerBusiness.businessScopePermit}}</detail-list-item>
          </detail-list> -->
        </a-tab-pane>
        <a-tab-pane tab="联系人" key="6">
          <!-- <a-tab-pane tab="联系人" key="6" @click="getCustomerContact()"> -->
          <a-button style="margin-bottom:20px;" type="primary" @click="showAddFormDrawer">新建联系人</a-button>
          <!-- :pagination="ipagination"      -->
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columnsB"
            :dataSource="dataSource"
            :loading="loading"
            @change="handleTableChange"
            :customRow="customRow"
          ></a-table>
          <show-add-form-drawer ref="ShowAddFormDrawer"></show-add-form-drawer>
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
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
// import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

import ShowAddFormDrawer from './modules/ShowAddFormDrawer'
import qs from 'qs'

export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem,
    ShowAddFormDrawer
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
      columnsA: [],
      columnsB: [
        { title: '序号', align: 'center', dataIndex: 'projectName' },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'contactName'
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'sex',
          // customRender: text => {
          //   return filterDictText(this.projectTypeDictOptions, text)
          // }
        },
        {
          title: '手机',
          align: 'center',
          dataIndex: 'mobile'
        },
        {
          title: 'Email',
          align: 'center',
          dataIndex: 'email'
        },
        // {
        //   title: '证件类型',
        //   align: 'center',
        //   dataIndex: 'getArea'
        //   //暂改
        // },
        // {
        //   title: '证件号码',
        //   align: 'center',
        //   dataIndex: ''
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dict: {
        unitNature: [],
        industryCategory: [],
        organizational: [],
        technicalField: [],
        enterpriseRating: [],
        registrationType: []
      },
      dictText: {
        unitNatureText: '',
        industryCategoryText: '',
        organizationalText: '',
        technicalFieldText: '',
        enterpriseRatingText: '',
        registrationTypeText: ''
      }
    }
  },

  // async created() {
  created() {
    if (typeof this.$route.params.id !== 'string') {
      this.$router.back()
      this.$message.warning('ID不正确')
      return false
    }
    // getAction('/park.customer/baseCustomer/queryById', { id: this.$route.params.id }).then(res => {
    //   if (res.code === 200) {
    //     this.loading = false
    //     this.info = res.result
    //     // console.log(this.info)
    //     this.initDictConfig()
    //   } else {
    //     this.$router.back()
    //     this.$message.error(res.message)
    //   }
    // })

    console.log('test start-------------')
    this.getCustomerContact()
  },
  mounted() {},
  methods: {
    //tab页6：联系人表格数据获取 与 绑定
    getCustomerContact(arg=1) {
      // if (!this.url.list) {
      //   this.$message.error('请设置url.list属性!')
      //   return
      // }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = { cusId: '11111111' }
      // params = qs.stringify(params)
      // this.loading = true
      console.log('test start000000000000')
      getAction('/park.customer/baseCustomerContact/list', params).then(res => {
      // getAction('/park.customer/baseCustomerContact/list?cusId=11111111').then(res => {
        if (res.success) {
          console.log('test start11111111')
          console.log(res.result)
          this.dataSource = res.result.records
          // this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        // this.loading = false
      })
    },
    showAddFormDrawer() {
      this.$refs.ShowAddFormDrawer.add()
    },
    initDictConfig() {
      initDictOptions('unit_nature').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.unitNature = res.result
          this.dict.unitNature.forEach(this.switchFunctionU)
        }
      }),
        initDictOptions('industry_gategory').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.industryCategory = res.result
            this.dict.industryCategory.forEach(this.switchFunctionI)
          }
        }),
        initDictOptions('organizational').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.organizational = res.result
            this.dict.organizational.forEach(this.switchFunctionO)
          }
        }),
        initDictOptions('technical_field').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.technicalField = res.result
            this.dict.technicalField.forEach(this.switchFunctionT)
          }
        }),
        initDictOptions('enterprise_rating').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.enterpriseRating = res.result
            this.dict.enterpriseRating.forEach(this.switchFunctionE)
          }
        }),
        initDictOptions('registration_type').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.registrationType = res.result
            // this.dict.registrationType.forEach(this.switchFunctionR)
            for (const item of this.dict.registrationType) {
              if (item.value == this.info.baseCustomerType.registrationType)
                return (this.dictText.registrationTypeText = item.text)
              // break 无需
            }
          }
        })
    },
    //数据字典匹配服务端传来数据值，返回数据字典字段，以下是forEach中的六条匹配规则
    switchFunctionU(item) {
      if (item.value == this.info.baseCustomerType.unitNature) return (this.dictText.unitNatureText = item.text)
    },
    switchFunctionI(item) {
      if (item.value == this.info.baseCustomerType.industryCategory)
        return (this.dictText.industryCategoryText = item.text)
    },
    switchFunctionO(item) {
      if (item.value == this.info.baseCustomerType.organizational) return (this.dictText.organizationalText = item.text)
    },
    switchFunctionT(item) {
      if (item.value == this.info.baseCustomerType.technicalField) return (this.dictText.technicalFieldText = item.text)
    },
    switchFunctionE(item) {
      if (item.value == this.info.baseCustomerType.enterpriseRating)
        return (this.dictText.enterpriseRatingText = item.text)
    },
    // switchFunctionR(item) {
    //   if (item.value == this.info.baseCustomerType.registrationType)
    //     return (this.dictText.registrationTypeText = item.text)
    // },
    callback() {}
  },
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