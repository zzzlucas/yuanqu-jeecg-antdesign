<template>
  <div class="meeting-week-view">
    <!-- Filter -->
    <a-row :gutter="24">
      <a-col :xl="5">
        <a-select style="width: 100%;" v-model="roomId">
          <a-select-option :value="item.name" v-for="item in rooms" :key="item.name">{{ item.label }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <!-- Fc -->
    <full-calendar
      ref="calendar"
      :events="getList"
      :config="config" />
    <!-- Add/Edit form -->
    <meeting-event-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
    <!-- View modal -->
    <meeting-event-view-modal
      :data="viewData"
      v-model="view" />
  </div>
</template>

<script>
  import MeetingEventEditForm from './MeetingEventEditForm'
  import MeetingEventViewModal from './MeetingEventViewModal'
  import Mixin from '../mixin/calendar'
  import { viewMeetingEvent } from '../api'

  export default {
    mixins: [
      Mixin,
    ],
    components: {
      MeetingEventEditForm,
      MeetingEventViewModal,
    },
    data() {
      return {
        // View modal/aside
        viewData: {},
        view: false,
        // Fc
        config: {
          schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
          locale: 'zh-cn',
          header: {
            left: '',
            center: 'title',
            right:  'today prev,next'
          },
          defaultView: 'month',
          editable: false,
          dayClick: this.handleAddEvent,
          eventClick: this.handleViewEvent,
        }
      }
    },
    computed: {
      rooms() {
        let list = this.roomList.map(item => {
          return { label: `${item.roomName}`, name: item.roomId }
          return { label: `${item.projectId}${item.buildingId}${item.roomName}`, name: item.roomId }
        })
        list.unshift({ label: '全部', name: '' })
        return list
      }
    },
    methods: {
      // Event
      handleAddEvent(date) {
        const begDate = date.format('YYYY-MM-DD HH:mm:ss')
        const endDate = date.add(1, 'd').format('YYYY-MM-DD HH:mm:ss')
        const roomId = this.roomId
        this.$refs.modalForm.add({ begDate, endDate, roomId })
        this.$refs.modalForm.title = "添加"
        this.$refs.modalForm.disableSubmit = false
      },
      // TODO
      handleEditEvent(record) {
        this.$refs.modalForm.edit({ })
        this.$refs.modalForm.title = "编辑"
        this.$refs.modalForm.disableSubmit = false
      },
      async handleViewEvent(info) {
        try {
          const resp = await viewMeetingEvent({ id: info.id })
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.viewData = resp.result
          this.view = true
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      // Add/Edit
      async handleEditSubmit() {
        this.loadData()
      },
    },
    created() {
      this.loadData()
    },
  }
</script>
