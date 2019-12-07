<template>
  <div class="meeting-week-view">
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
          resourceLabelText: "会议室",
          editable: false,
          dayClick: this.handleAddEvent,
          eventClick: this.handleViewEvent,
        }
      }
    },
    methods: {

    }
  }
</script>
