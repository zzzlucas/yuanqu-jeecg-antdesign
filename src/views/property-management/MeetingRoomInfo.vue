<template>
  <page-layout :title="data.roomName">
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <template v-if="activeTabKey === 'basic'">
        <detail-list>
          <detail-list-item term="会议室名称">{{ data.roomName }}</detail-list-item>
          <detail-list-item term="占地面积">{{ data.chargingArea }}m<sup>2</sup></detail-list-item>
          <detail-list-item term="容纳人数">{{ data.maxCapacity }}人</detail-list-item>
          <!-- TODO -->
          <detail-list-item term="所属建筑项目">{{ data.projectId }}</detail-list-item>
          <!-- TODO -->
          <detail-list-item term="详细地址">{{ data.projectId }} {{ data.address }}</detail-list-item>
          <detail-list-item term="提供设备">{{ data.roomDevices }} &nbsp;</detail-list-item>
          <detail-list-item term="联系人">{{ data.contactPerson }}</detail-list-item>
          <detail-list-item term="联系电话">{{ data.contactTel }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="开放时间起">{{ data.begTime }}</detail-list-item>
          <detail-list-item term="开放时间止">{{ data.endTime }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="预定须知">{{ data.remarks }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="会议室详情">{{ data.summary }}</detail-list-item>
        </detail-list>
      </template>
      <template v-if="activeTabKey === 'image'">
        <j-upload ref="uploader" />
      </template>
      <template v-if="activeTabKey === 'weekView'">

      </template>
      <template v-if="activeTabKey === 'monthView'">

      </template>
    </a-card>
    <!-- Add/Edit form -->
    <meeting-room-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </page-layout>
</template>

<script>
  import PageLayout from '@/components/page/PageLayout'
  import DetailList from '@/components/tools/DetailList'
  import JUpload from '@/components/jeecg/JUpload'
  import MeetingRoomEditForm from './components/MeetingRoomEditForm'
  import ViewMixin from '@/mixins/View'
  import { url, viewMeetingRoom, listOperateProcess, listOperateFeedback } from './api'
  const DetailListItem = DetailList.Item

  export default {
    mixins: [
      ViewMixin,
    ],
    components: {
      PageLayout,
      DetailList,
      DetailListItem,
      JUpload,
      MeetingRoomEditForm,
    },
    data() {
      return {
        // Url
        url: url.meetingRoom,
        // Types
        dictesCreateFields: ['order_type', 'order_status'],
        // Data
        recordLoading: true,
        records: {
          process: [],
          feedback: [],
        },
        // Tab
        tabList: [
          {
            key: 'basic',
            tab: '基本信息'
          },
          {
            key: 'image',
            tab: '图片'
          },
          {
            key: 'weekView',
            tab: '周视图'
          },
          {
            key: 'monthView',
            tab: '月视图'
          },
        ],
        activeTabKey: 'basic',
      }
    },
    computed: {

    },
    methods: {
      // Route
      getRouteParams() {
        return { id: this.$route.params.id }
      },
      // Request data
      async loadData() {
        this.loadDetail().then(() => {
          this.$refs.uploader.initFileList(this.data.addDocFiles)
        })
        // this.loadRecords()
      },
      async loadDetail() {
        this.loading = true
        try {
          const resp = await viewMeetingRoom(this.getRouteParams())
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.data = resp.result
        } catch (e) {
          this.$message.error(e.message)
        }
        this.loading = false
      },
      async loadRecords() {
        this.recordLoading = true
        try {
          const promises = [
            listOperateProcess({ orderId: this.getRouteParams().orderId }),
            listOperateFeedback({ orderId: this.getRouteParams().orderId }),
          ]
          const respCollection = await Promise.all(promises)
          for (const [i, resp] of respCollection.entries()) {
            if (!resp.success) {
              throw new Error(resp.message)
            }
            const records = resp.result
            if (i === 0) {
              this.records.process = records
            } else {
              this.records.feedback = records
            }
          }
        } catch (e) {
          this.$message.error(e.message)
        }
        this.recordLoading = false
      },
      // Edit submit
      async handleEditSubmit() {
        this.loadData()
      },
    },
    async created() {
      if (!this.checkRouteConfig()) {
        return
      }
      await this.initDictConfig()
      this.loadData()
    }
  }
</script>