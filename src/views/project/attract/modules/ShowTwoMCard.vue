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
      <a-spin :spinning="confirmLoading">
        <detail-list v-if="info" :col="1">
          <!-- <detail-list-item term="项目ID">{{info.projectId}}</detail-list-item> -->
          <detail-list-item term="项目名称">{{info.projectName}}</detail-list-item>
        </detail-list>
        <detail-list v-if="info" :col="2">
          <detail-list-item term="跟踪日期">{{info.trackDate}}</detail-list-item>
          <detail-list-item term="跟踪人">{{dictText.trackerText}}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="跟踪方式">{{dictText.trackMethodText}}</detail-list-item>
        </detail-list>
        <detail-list :col="1">
          <detail-list-item term="过程纪要">{{info.content}}</detail-list-item>
        </detail-list>
        <detail-list :col="1">
          <detail-list-item term="意向房源">{{info.resourceGroupNames}}</detail-list-item>
        </detail-list>
        <detail-list :col="1">
          <detail-list-item term="备注">{{info.remark}}</detail-list-item>
        </detail-list>
      </a-spin>
    </a-card>
  </a-modal>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import DetailList from '@/components/tools/DetailList'
import { getAction, putAction } from '@/api/manage'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
const DetailListItem = DetailList.Item

export default {
  mixins: [JeecgListMixin],
  name: 'SysAnnouncementModal',
  components: { DetailList, DetailListItem },
  data() {
    return {
      confirmLoading: false,
      // form: this.$form.createForm(this),
      title: '跟踪记录',
      record: {},
      dict: {
        tracker: [],
        trackMethod: []
      },
      dictText: {
        trackerText: '',
        trackMethodText: ''
      },
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
      info: {},
      url: {
        list: '/park.project/mgrProjectTrace/list'
      }
    }
  },
  created() {
    initDictOptions('project_status').then(res => {
      if (res.success) {
        this.dict.projectStatusDictOptions = res.result
      }
    })
  },
  methods: {
    handleOk() {},
    detail(record) {
      this.visible = true
      this.record = record
      this.confirmLoading = true
      // console.log(this.record)
      //定义获取小卡片内容的方法

      //存在跟踪记录才请求
      if (this.record) {
        getAction('/park.project/mgrProjectTrace/selectById', { id: this.record.recordId }).then(res => {
          if (res.code === 200) {
            let proId = res.result.projectId
            // console.log('object')
            // console.log(proId)
            getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: proId }).then(resAAA => {
              this.info = res.result
              if (this.info.content > 0 && this.info.content < 10) {
                this.info.content = '转为' + filterDictText(this.dict.projectStatusDictOptions, this.info.content)
              }
              this.info.projectName = resAAA.result.projectName
              this.initDictConfig()
              // console.log(this.info.projectName)
            })

            // console.log(this.info)
            // this.initDictConfig()
          } else {
            this.$router.back()
            this.$message.error(res.message)
          }
          this.confirmLoading = false
        })
      }
      // setTimeout((this.confirmLoading = false), 5000)
    },
    handleCancel() {
      this.visible = false
      this.info = {}
      this.dictText.trackerText = ''
      this.dictText.trackMethodText = ''
    },
    initDictConfig() {
      //因为每次都在这里面比对，所以现需要info...
      initDictOptions('tracker').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.tracker = res.result
          for (const item of this.dict.tracker) {
            if (item.value == this.info.tracker)
              // console.log(item.value);
              return (this.dictText.trackerText = item.text)
          }
        }
      })
      initDictOptions('track_method').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.trackMethod = res.result
          for (const item of this.dict.trackMethod) {
            if (item.value == this.info.trackMethod)
              // console.log(item.value);
              return (this.dictText.trackMethodText = item.text)
          }
        }
      })
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
