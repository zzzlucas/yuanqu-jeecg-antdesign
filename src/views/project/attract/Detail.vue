<template>
  <page-layout :title="title">
    <!-- 应该在page-layout组件vue里写abadge -->
    <!-- <div style="width:1200px;margin:auto;"> -->
    <a-card :bordered="false">
      <!-- <a slot="extra" @click.prevent="addShowTwo">
        <a-icon type="plus-square" style="margin-right:5px;margin-top:5px" />新增
      </a>-->
      <a-tabs defaultActiveKey="1">
        <!-- @change="callback" -->
        <a-tab-pane tab="企业基本信息" key="1">
          <detail-list>
            <detail-list-item term="投资额">{{ info.mgrProjectInvest.investAmount }}（万元）</detail-list-item>
            <detail-list-item term="注册投资">{{ info.mgrProjectCust.registerMoney }}（万元）</detail-list-item>
            <detail-list-item term="年产值">{{ info.annualProductionValue }}(万元)</detail-list-item>
            <detail-list-item term="年税金">{{ info.annualTaxes }}(万元)</detail-list-item>
            <!-- 这个租赁项目才有 -->
            <!-- v-if="info.projectType == 2" -->
            <!-- <detail-list-item term="重要程度" >{{ info.importance }}</detail-list-item> -->
            <detail-list-item term="是否外资">{{ info.mgrProjectInvest.isForeignCapital=="1"?"是":"否" }}</detail-list-item>
          </detail-list>
          <!-- 这个只有租赁才有吗 v-if projectType==2 点击跳转公共平台  -->
          <detail-list>
            <detail-list-item term="新建项目申请">
              <a href="#">查看新建项目申请信息</a>
            </detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="是否人才项目">{{ info.isTalentProject=="1"?"是":"否" }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="公司概况">{{ info.mgrProjectCust.companyDescription }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="团队成员情况">{{ info.mgrProjectCust.teamMemberDescription }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="备注">{{ info.mgrProjectInvest.remark }}</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <!-- 2222222222222222222222222 -->
        <a-tab-pane tab="跟踪记录" key="2">
          <detail-show-two></detail-show-two>
        </a-tab-pane>
        <!-- 2222222222222222222222222 -->
        <a-tab-pane tab="项目需求" key="3">
          <detail-list>
            <detail-list-item term="拿地面积" v-if="info.projectType == 1">{{info.gainArea}}㎡</detail-list-item>
            <detail-list-item term="租赁面积" v-if="info.projectType == 2">{{info.rentBuildArea}}㎡</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="联系人" key="4">
          <detail-list>
            <detail-list-item term="联系人">{{info.agentPerson}}</detail-list-item>
            <detail-list-item term="电话">{{info.agentTel}}</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="附件" key="5">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="公司注册信息" key="6">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="股权架构(法人股东）" key="7">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="股权架构(个人股东）" key="8">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="团队成员具体信息" key="9">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="生产工艺情况" key="10">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="环保、安全、卫生" key="11">
          <detail-list>
            <detail-list-item term="附件"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="能源与资源消耗情况(年消耗量）" key="12">
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

import DetailShowTwo from './modules/DetailShowTwoM'

export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem,
    DetailShowTwo
  },
  data() {
    return {
      // dataSource: [],
      // ipagination: [],
      loading: false,
      info: {},
      url: {
        list: '/park.project/mgrProjectInfo/queryProjectById'
      }
    }
  },

  async created() {
    if (typeof this.$route.params.id !== 'string') {
      this.$router.back()
      this.$message.warning('ID不正确')
      return false
    }
    getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: this.$route.params.id }).then(res => {
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
.flex1 {
  margin-top: 15px;
  display: flex;
  height: 420px;

  .flex11 {
    width: 55%;
    height: 100%;
    margin-right: 10px;
  }
  .flex12 {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .ant-card {
      margin-bottom: 10px;
    }
  }
}
</style>