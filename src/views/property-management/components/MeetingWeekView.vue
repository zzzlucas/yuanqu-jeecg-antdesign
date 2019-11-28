<template>
  <div class="meeting-week-view">
    <full-calendar
      ref="calendar"
      :events="internalEvents"
      :config="config" />
  </div>
</template>

<script>
  import 'jquery'
  import 'fullcalendar/dist/locale/zh-cn'
  import { FullCalendar } from 'vue-full-calendar'
  import 'fullcalendar/dist/fullcalendar.css'
  import '../api'

  export default {
    props: {
      config: {
        type: Object,
        default: () => {
          return {}
        }
      },
      events: {
        type: Array,
        default: () => [],
      }
    },
    components: {
      FullCalendar,
    },
    data() {
      return {
        internalEvents: [],
      }
    },
    methods: {
      async buildEvents() {
        const events = this.events
        if (events.length) {
          this.internalEvents = events
          return
        }
        await this.fetchList()
      },
      fetchList() {

      },
    },
    created() {
      this.buildEvents()
    },
    watch: {
      'events'() {
        this.buildEvents()
      }
    }
  }
</script>
