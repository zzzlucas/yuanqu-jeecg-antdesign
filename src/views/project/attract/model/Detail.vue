<template>
  <page-layout :title="title">
    <!-- 应该在page-layout组件vue里写abadge -->
    <!-- <div style="width:1200px;margin:auto;"> -->
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="企业基本信息" key="1">
          <detail-list>
            <detail-list-item term="投资额">2000（万元）</detail-list-item>
            <detail-list-item term="注册投资">已取货</detail-list-item>
            <detail-list-item term="年产值">200 (万元)</detail-list-item>
            <detail-list-item term="年税金">20 (万元)</detail-list-item>
            <detail-list-item term="重要程度">一般项目</detail-list-item>
            <detail-list-item term="是否外资">否</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="新建项目申请（租赁）">查看新建项目申请信息</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="是否人才项目">否</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="公司概况">公司概况</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="团队成员情况">团队成员情况</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="备注"></detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="跟踪记录" key="2">
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            :loading="loading"
            @change
          >
            <span slot="action" slot-scope="text, record">
              <a @click>编辑</a>&nbsp;
              <a @click>查看</a>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="项目需求" key="3">
          <detail-list>
            <detail-list-item term="租赁面积">1,000.00 m²</detail-list-item>
          </detail-list>
        </a-tab-pane>

        <a-tab-pane tab="联系人" key="4">
          <detail-list>
            <detail-list-item term="联系人">周易</detail-list-item>
            <detail-list-item term="电话">1234567899</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="附件" key="5">
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
// import STable from '@/components/table/'

import ABadge from 'ant-design-vue/es/badge/Badge'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item

export default {
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem
    // STable
  },
  data() {
    return {
      dataSource: [],
      ipagination: [],
      loading: false,
      columns: [
        {
          title: '跟踪日期',
          align: 'center',
          dataIndex: 'titile'
        },
        {
          title: '跟踪人员',
          align: 'center',
          dataIndex: 'msgCategory'
        },

        {
          title: '跟踪纪要',
          align: 'center',
          dataIndex: 'sendTime'
        },
        {
          title: '跟踪方式',
          align: 'center',
          dataIndex: 'priority'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/sys/sysAnnouncementSend/getMyAnnouncementSend',
        editCementSend: 'sys/sysAnnouncementSend/editByAnntIdAndUserId',
        readAllMsg: 'sys/sysAnnouncementSend/readAll'
      },
      goodsColumns: [
        {
          title: '商品编号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '商品条码',
          dataIndex: 'barcode',
          key: 'barcode'
        },
        {
          title: '单价',
          dataIndex: 'price',
          key: 'price',
          align: 'right'
        },
        {
          title: '数量（件）',
          dataIndex: 'num',
          key: 'num',
          align: 'right'
        },
        {
          title: '金额',
          dataIndex: 'amount',
          key: 'amount',
          align: 'right'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadGoodsData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                id: '1234561',
                name: '矿泉水 550ml',
                barcode: '12421432143214321',
                price: '2.00',
                num: '1',
                amount: '2.00'
              },
              {
                id: '1234562',
                name: '凉茶 300ml',
                barcode: '12421432143214322',
                price: '3.00',
                num: '2',
                amount: '6.00'
              },
              {
                id: '1234563',
                name: '好吃的薯片',
                barcode: '12421432143214323',
                price: '7.00',
                num: '4',
                amount: '28.00'
              },
              {
                id: '1234564',
                name: '特别好吃的蛋卷',
                barcode: '12421432143214324',
                price: '8.50',
                num: '3',
                amount: '25.50'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      },

      scheduleColumns: [
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '当前进度',
          dataIndex: 'rate',
          key: 'rate'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作员ID',
          dataIndex: 'operator',
          key: 'operator'
        },
        {
          title: '耗时',
          dataIndex: 'cost',
          key: 'cost'
        }
      ],
      loadScheduleData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                key: '1',
                time: '2017-10-01 14:10',
                rate: '联系客户',
                status: 'processing',
                operator: '取货员 ID1234',
                cost: '5mins'
              },
              {
                key: '2',
                time: '2017-10-01 14:05',
                rate: '取货员出发',
                status: 'success',
                operator: '取货员 ID1234',
                cost: '1h'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      }
    }
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