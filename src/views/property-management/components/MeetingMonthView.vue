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
          locale: 'zh-cn',
          header: {
            left: '',
            center: 'title',
            right:  'today prev,next'
          },
          defaultView: 'month',
          dayClick: (date, jsEvent, view) => {
            const formatDate = date.format()
            this.handleAddEvent(formatDate)
          }
        }
      }
    },
    methods: {
      handleAddEvent(date) {
        this.$refs.modalForm.add({ date });
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
