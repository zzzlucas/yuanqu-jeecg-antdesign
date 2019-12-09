<template>
  <div class="meeting-week-view">
    <!-- Fc -->
    <full-calendar
      ref="calendar"
      :events="getList"
      :config="config"
      v-if="config.resources.length" />
    <!-- Add/Edit form -->
    <meeting-event-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
    <!-- View modal -->
    <meeting-event-view-modal
      :data="viewData"
      v-model="view"
      @edit="handleEditEvent"
      @delete="handleDeleteEvent" />
  </div>
</template>

<script>
  import 'fullcalendar-scheduler';
  import 'fullcalendar-scheduler/dist/scheduler.min.css';
  import Mixin from '../mixin/calendar'

  export default {
    mixins: [
      Mixin,
    ],
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
            right: 'today prev,next'
          },
          defaultView: 'timelineWeek',
          slotLabelInterval: { days: 1 },
          slotLabelFormat: ['ddd MM-DD'],
          resourceLabelText: "会议室",
          editable: false,
          dayClick: this.handleAddEvent,
          eventClick: this.handleViewEvent,
          // Room list
          resources: [],
        }
      }
    },
    methods: {
      buildResources() {
        this.config.resources = this.roomList.map(item => {
          return {
            id: item.roomId,
            title: item.roomName,
          }
        })
      },
      async init() {
        await this.getRoomList()
        this.buildResources()
      },
    },
    created() {
      this.init()
    },
  }
</script>
