<template>
  <page-layout :title="title">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="活动概况" key="1">
          <a-spin :spinning="confirmLoading">
            <detail-list :col="1">
              <detail-list-item term="开始时间">{{ info.fillUnit }}</detail-list-item>
              <detail-list :col="1"></detail-list>
              <detail-list-item term="结束时间">{{ info.creditCode }}</detail-list-item>
              <detail-list :col="1"></detail-list>
              <detail-list-item term="活动地点">{{ info.unitAddress }}</detail-list-item>
              <detail-list :col="1"></detail-list>
              <detail-list-item term="主办单位">{{ info.setUpYear }}</detail-list-item>
              <detail-list :col="1"></detail-list>
              <detail-list-item term="报名情况">{{ info.registerMoney }}万元</detail-list-item>
            </detail-list>
          </a-spin>
        </a-tab-pane>

        <a-tab-pane tab="活动图片" key="2"></a-tab-pane>

        <a-tab-pane tab="参与情况" key="3">
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSourceA"
            :pagination="ipagination"
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
        </a-tab-pane>

        <a-tab-pane tab="活动介绍" key="4">
          <p>暂无介绍</p>
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
import qs from 'querystring'
import Dom7 from 'dom7'
import moment from 'moment'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

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
      dateFormat: 'YYYY-MM-DD',
      confirmLoading: false,
      info: {},
      dict: {},
      dataSourceA: [],
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '报名人',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '报名时间',
          align: 'center',
          dataIndex: 'tracker'
        },
        {
          title: '参加人数',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '手机号码',
          align: 'center',
          dataIndex: 'trackMethod'
        },
        {
          title: '联系邮箱',
          align: 'center',
          dataIndex: 'trackMethod'
        },
        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'trackMethod',
          customRender: text => {
            return filterDictText(this.dict.trackMethodDictOptions, text)
          }
        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      url: {
        list: '/park.project/mgrProjectLand/queryById'
      }
    }
  },

  created() {
    // console.log('aaa')
    // if (typeof this.$route.params.id !== 'string') {
    //   this.$router.back()
    //   this.$message.warning('ID不正确')
    //   return false
    // }
    this.confirmLoading = true
    // console.log(this.$route.params.id);
    getAction('/park.service/mgrActivityInfo/showDetail', { activityId: this.$route.params.id }).then(res => {
      if (res.code === 200) {
        this.info = res.result
        this.confirmLoading = false
        // console.log(this.info)
      } else {
        this.$router.back()
        this.$message.error(res.message)
      }
    })

    initDictOptions('mgr-attr-addpl-companyRegisterType').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.companyRegisterTypeExt = res.result
      }
    })
    initDictOptions('industry_sector_value').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industrySectorValueExt = res.result
      }
    })
  },
  mounted() {},
  methods: {
    moment,
    filterDictText
  },
  filters: {
    formatDate: function(time) {
      if (!time) return ''
      time = time ? moment(time).format('YYYY-MM-DD') : null
      return time
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