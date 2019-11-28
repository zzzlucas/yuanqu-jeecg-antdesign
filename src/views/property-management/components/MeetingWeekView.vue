<template>
  <div class="meeting-week-view">
    <full-calendar
      ref="calendar"
      :events="events"
      :config="config" />
    <!-- Add/Edit form -->
    <meeting-event-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </div>
</template>

<script>
  import 'fullcalendar-scheduler';
  import 'fullcalendar-scheduler/dist/scheduler.min.css';
  import MeetingEventEditForm from './MeetingEventEditForm'
  import Mixin from '../mixin/calendar'

  export default {
    mixins: [
      Mixin,
    ],
    components: {
      MeetingEventEditForm,
    },
    data() {
      return {
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
          dayClick: (date, jsEvent, view) => {
            const formatDate = date.format()
            this.handleAddEvent(formatDate)
          }
        }
      }
    },
    methods: {
      handleAddEvent(date) {
        this.$refs.modalForm.add({ begDate: date });
        this.$refs.modalForm.title = "添加";
        this.$refs.modalForm.disableSubmit = false;
      },
      // Add/Edit
      async handleEditSubmit() {
        this.loadData()
      },
    }
  }
</script>
