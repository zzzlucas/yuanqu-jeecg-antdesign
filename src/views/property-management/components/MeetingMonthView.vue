<template>
  <div class="meeting-week-view">
    <full-calendar
      ref="calendar"
      :events="events"
      :config="config" />
  </div>
</template>

<script>
  import Mixin from '../mixin/calendar'

  export default {
    mixins: [
      Mixin,
    ],
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
        }
      }
    },
  }
</script>
