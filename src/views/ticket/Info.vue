<template>
  <div class="ticket-view">
    <a-card
      class="ticket-header-container"
      :bordered="false"
      :loading="loading">
      <!-- Nav (unclickable) -->
      <a-breadcrumb>
        <a-breadcrumb-item>工单管理</a-breadcrumb-item>
        <a-breadcrumb-item>{{ filterDictText(this.types.order_type, data.orderType) }}</a-breadcrumb-item>
        <a-breadcrumb-item>工单详情</a-breadcrumb-item>
      </a-breadcrumb>
      <!-- Layout Header -->
      <a-row class="ticket-header-content">
        <!-- Header left -->
        <a-col :xl="18">
          <!-- Content box -->
          <div class="ticket-header-content-box">
            <!-- Icon column -->
            <div class="ticket-header-content-box-left">
              <a-avatar class="ticket-header-icon">
                <a-icon type="mail" theme="twoTone" />
              </a-avatar>
            </div>
            <!-- Info column -->
            <div class="ticket-header-content-box-right">
              <h1>主题：{{ data.title }}</h1>
              <a-row>
                <a-col :xl="12">工单类别：{{ filterDictText(this.types.order_type, data.orderType) }}</a-col>
                <a-col :xl="12">工单编号：{{ data.orderId }}</a-col>
                <a-col :xl="12">负责人：{{ data.principalUser }}</a-col>
                <a-col :xl="12">提单时间：{{ data.createTime }}</a-col>
                <a-col :xl="12">来源渠道：手动创建</a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <!-- Header right -->
        <a-col class="ticket-header-action-column" :xl="6">
          <!-- Action -->
          <div class="ticket-action-container">
            <a-button-group>
              <a-button @click="handleChangeStatus('1')">受理</a-button>
              <a-button @click="handleChangeStatus('2')">退回</a-button>
              <a-button @click="handleChangeStatus('3')">删除</a-button>
            </a-button-group>
            <a-button-group>
              <a-button type="primary" @click="handleEdit">编辑</a-button>
            </a-button-group>
          </div>
          <div class="ticket-status-container">
            状态
            <span>{{ filterDictText(this.types.order_status, data.status) }}</span>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <!-- Layout content -->
    <div class="ticket-content-container">
      <a-tabs defaultActiveKey="detail">
        <a-tab-pane tab="详情" key="detail">
          <a-card
            :bordered="false"
            :loading="loading">
            <p class="detail-heading detail-row">主题：{{ data.title }}</p>
            <!-- TODO -->
            <template v-if="isCurrentTypeInProject">
              <p class="detail-row">企业名称：{{ data.custName }}</p>
              <p class="detail-row">经办人：{{ data.contactName }}</p>
              <p class="detail-row">联系方式：{{ data.mobile }}</p>
              <p class="detail-row">项目名称：{{ data.title }}</p>
            </template>
            <div class="detail-row">问题描述：
              <br>
              <br>
              <div v-html="data.content"></div>
            </div>
            <!-- TODO -->
            <div class="detail-row">文件：</div>
          </a-card>
        </a-tab-pane>
        <a-tab-pane tab="处理记录" key="records">
          <a-card
            title="工单处理记录"
            :bordered="false"
            :loading="loading">
            <a-button type="primary" slot="extra" icon="plus" shape="circle" @click="handleAddRecord" />
            <a-timeline>
              <a-timeline-item>
                <p class="timeline-heading">2019-10-28 13:24:20 【演示用户】工单进展</p>
                <p class="timeline-content">时间、用户名、工单进展、备注内容或操作步骤（完成、退回、）</p>
              </a-timeline-item>
              <a-timeline-item>
                <p class="timeline-heading">2019-10-28 13:24:20【演示用户】完成工单</p>
                <p class="timeline-content">点击设为完成是生成工单处理记录</p>
              </a-timeline-item>
              <a-timeline-item>
                <p class="timeline-heading">2019-10-28 13:30:20【演示用户】受理工单</p>
                <p class="timeline-content">点击受理工单生成受理工单记录</p>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-tab-pane>
        <a-tab-pane tab="反馈记录" key="feedback">
          <a-card
            title="工单反馈记录"
            :bordered="false"
            :loading="loading">
            <a-button type="primary" slot="extra" icon="plus" shape="circle" @click="handleAddRecord" />
            <a-timeline>
              <a-timeline-item>
                <p class="timeline-heading">2019-10-28 13:24:20 【演示用户】工单进展</p>
                <p class="timeline-content">反馈记录要求前端也可以看到</p>
              </a-timeline-item>
              <a-timeline-item>
                <p class="timeline-heading">2019-10-28 13:24:20 【演示用户】工单进展</p>
                <p class="timeline-content">反馈记录要求前端也可以看到</p>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- Add/Edit form -->
    <ticket-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </div>
</template>

<script>
  import TicketEditForm from '@views/ticket/components/TicketEditForm'
  import { filterDictText } from '@/components/dict/JDictSelectUtil'
  import ViewMixin, { lifeCycle as ViewLifeCycleMixin } from '@/mixins/View'
  import Mixin from './mixin'
  import { url, changeStatusInfo } from './api'

  export default {
    mixins: [
      ViewMixin,
      ViewLifeCycleMixin,
      Mixin,
    ],
    components: {
      TicketEditForm,
    },
    data() {
      return {
        // Url
        url: url.info,
        // Types
        dictesCreateFields: ['order_type', 'order_status'],
      }
    },
    computed: {
      isCurrentTypeInProjectPeriod() {
        return this.orderTypeProjectPeriod.includes(this.data.orderType)
      },
      isCurrentTypeInProject() {
        return this.orderTypeProject.includes(this.data.orderType)
      },
    },
    methods: {
      // Route
      getRouteParams() {
        return { orderId: this.$route.params.id }
      },
      // Filter
      filterDictText,
      // Action
      handleAddRecord() {

      },
      // Change status
      async handleChangeStatus(status) {
        try {
          const params = { status, orderId: this.data.orderId }
          const resp = await changeStatusInfo(params)
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('操作成功')
          this.loadData()
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      // Edit submit
      async handleEditSubmit() {
        this.loadData()
      },
    }
  }
</script>

<style lang="less">
  .ticket-view {
    // Remove extra margin on parent layout
    margin: -12px -12px 0;

    // --Layout Header--
    .ticket-header-content {
      margin-top: 20px;
    }
    // Header content box
    .ticket-header-content-box {
      display: flex;
      h1 {
        line-height: 1;
        font-size: 20px;
        font-weight: bold;
      }
      // Left side
      // Icon
      .ticket-header-icon {
        background: rgb(24, 144, 255);
      }
      // Right side
      .ticket-header-content-box-right {
        padding-left: 10px;
        .ant-row {
          margin-top: 20px;
          > div {
            margin: 5px 0;
          }
        }
      }
    }
    // Header action column
    .ticket-header-action-column {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      // Buttons
      .ticket-action-container {
        .ant-btn-group {
          + .ant-btn-group {
            margin-left: 10px;
          }
        }
      }
      // Status
      .ticket-status-container {
        margin-top: 20px;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        span {
          margin-top: 5px;
          color: #000000;
          font-size: 20px;
        }
      }
    }

    // --Layout Content--
    .ticket-content-container {
      background: #f0f2f5;
      // Tab
      .ant-tabs-bar {
        background: #fff;
        padding-left: 32px;
        padding-right: 32px;
        .ant-tabs-nav-container {
          margin-top: 0;
        }
      }
      // Tab panel
      .ant-tabs-content {
        // Card
        .ant-card {
          margin: 20px 35px;
        }
        // Detail
        .detail-row {
          margin: 10px 0;
        }
        .detail-heading {
          font-size: 18px;
        }
      }
    }
  }
</style>