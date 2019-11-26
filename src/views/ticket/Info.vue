<template>
  <div class="ticket-view">
    <a-card
      class="ticket-header-container"
      :bordered="false"
      :loading="loading">
      <a-breadcrumb>
        <a-breadcrumb-item>工单管理</a-breadcrumb-item>
        <a-breadcrumb-item>TODO: INSERT CATEGORY NAME HERE</a-breadcrumb-item>
        <a-breadcrumb-item>工单详情</a-breadcrumb-item>
      </a-breadcrumb>
      <a-row class="ticket-header-content">
        <a-col :xl="18">
          <div class="ticket-header-content-box">
            <div class="ticket-header-content-box-left">
              <a-avatar class="ticket-header-icon">
                <a-icon type="mail" theme="twoTone" />
              </a-avatar>
            </div>
            <div class="ticket-header-content-box-right">
              <h1>主题：{{ info.title }}</h1>
              <a-row>
                <a-col :xl="12">工单类别：公用部分</a-col>
                <a-col :xl="12">工单编号：FWD20191012102601</a-col>
                <a-col :xl="12">负责人：胡俊琪</a-col>
                <a-col :xl="12">提单时间：2019-10-12</a-col>
                <a-col :xl="12">来源渠道：手动创建</a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <a-col class="ticket-header-action" :xl="6">
          <div class="ticket-action-container">
            <a-button-group>
              <a-button>受理</a-button>
              <a-button>退回</a-button>
              <a-button>删除</a-button>
            </a-button-group>
            <a-button-group>
              <a-button type="primary">编辑</a-button>
            </a-button-group>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <div class="ticket-content-container">
      <a-tabs defaultActiveKey="detail" @change="callback">
        <a-tab-pane tab="详情" key="detail">
          <a-card
            :bordered="false"
            :loading="loading">
            <p class="detail-heading detail-row">主题：XXXX</p>
            <p class="detail-row">企业名称：有限公司</p>
            <p class="detail-row">经办人：?</p>
            <p class="detail-row">联系方式：1585733333</p>
            <p class="detail-row">项目名称：办公楼平改坡</p>
            <div class="detail-row">问题描述：Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ea quas voluptatibus. Ab consequuntur cum debitis dicta, dolor et eveniet id, illo inventore ipsa molestiae nam obcaecati provident, recusandae vel.</div>
            <div class="detail-row">文件：</div>
          </a-card>
        </a-tab-pane>
        <a-tab-pane tab="处理记录" key="records">
          <a-card
            :bordered="false"
            :loading="loading">
            test
          </a-card>
        </a-tab-pane>
        <a-tab-pane tab="反馈记录" key="feedback">
          <a-card
            :bordered="false"
            :loading="loading">
            test
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  import View from '@/mixins/View'

  export default {
    mixins: [
      View,
    ],
    data() {
      return {
        loading: false,
      }
    },
  }
</script>

<style lang="less">
  .ticket-view {
    // Remove extra margin on parent layout
    margin: -12px -12px 0;
    // Header
    .ticket-header-container {
      border-top: 0;
    }
    .ticket-header-content {
      margin-top: 20px;
    }
    .ticket-header-content-box {
      display: flex;
      h1 {
        line-height: 1;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .ticket-header-content-box-right {
      padding-left: 10px;
      .ant-row {
        margin-top: 20px;
        > div {
          margin: 5px 0;
        }
      }
    }
    .ticket-header-icon {
      background: rgb(24, 144, 255);
    }
    .ticket-header-action {
      display: flex;
      justify-content: flex-end;
      // Buttons
      .ant-btn-group {
        + .ant-btn-group {
          margin-left: 10px;
        }
      }
    }
    // Content
    .ticket-content-container {
      background: #f0f2f5;
      .ant-tabs-bar {
        background: #fff;
        padding-left: 32px;
        padding-right: 32px;
        .ant-tabs-nav-container {
          margin-top: 0;
        }
      }
      .ant-tabs-content {
        .ant-card {
          margin: 20px 35px;
        }
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