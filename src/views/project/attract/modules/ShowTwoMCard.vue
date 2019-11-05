<template>
  <!-- 跟踪记录表单  下拉2  表格里的查看卡片-->

  <a-modal
    :title="title"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    :footer="null"
    style="top: 200px;"
  >
    <a-card :bordered="false">
      <detail-list :col="2">
        <detail-list-item term="项目名称">2000</detail-list-item>
        <detail-list-item term="项目名称">???</detail-list-item>
        <detail-list-item term="跟踪日期">200</detail-list-item>
        <detail-list-item term="跟踪人">20</detail-list-item>
      </detail-list>
      <detail-list>
        <detail-list-item term="跟踪方式">来访</detail-list-item>
      </detail-list>
      <detail-list>
        <detail-list-item term="过程纪要">测试</detail-list-item>
      </detail-list>
      <detail-list>
        <detail-list-item term="意向房源"></detail-list-item>
      </detail-list>
      <detail-list>
        <detail-list-item term="备注"></detail-list-item>
      </detail-list>
    </a-card>
  </a-modal>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item

export default {
  mixins: [JeecgListMixin],
  name: 'SysAnnouncementModal',
  components: { DetailList, DetailListItem },
  data() {
    return {
      // form: this.$form.createForm(this),
      title: '跟踪记录',
      record: {},
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      },
      visible: false,
      loading: false,
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      url: {
        list: '/park.project/mgrProjectTrace/list'
      }
    }
  },
  created() {},
  methods: {
    handleOk() {},
    detail(record) {
      this.visible = true
      this.record = record
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>

<style lang="less">
.announcementCustomModal {
  .ant-modal-header {
    border: none;
    display: inline-block;
    position: absolute;
    z-index: 1;
    right: 56px;
    padding: 0;
    .ant-modal-title {
      .custom-btn {
        width: 56px;
        height: 56px;
        border: none;
        box-shadow: none;
      }
    }
  }
  .daily-article {
    border-bottom: 0;
  }
}
</style>
<style scoped lang="less">
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
.daily-article {
  .article-button {
    font-size: 1.2rem !important;
  }
  .ant-card-body {
    padding: 18px !important;
  }
  .ant-card-head {
    padding: 0 1rem;
  }
  .ant-card-meta {
    margin-bottom: 1rem;
  }
  .article-content {
    p {
      word-wrap: break-word;
      word-break: break-all;
      text-overflow: initial;
      white-space: normal;
      font-size: 0.9rem !important;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
