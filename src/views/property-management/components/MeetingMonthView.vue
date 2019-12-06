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
        // Fc
        config: {
          locale: 'zh-cn',
          header: {
            left: '',
            center: 'title',
            right:  'today prev,next'
          },
          defaultView: 'month',
          dayClick: (moment, jsEvent, view) => {
            this.handleAddEvent(moment)
          }
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
        const roomName = this.roomName
        this.$refs.modalForm.add({ begDate, endDate, roomId, roomName })
        this.$refs.modalForm.title = "添加"
        this.$refs.modalForm.disableSubmit = false
      },
      // Add/Edit
      async handleEditSubmit() {
        this.loadData()
      },
    },
  }
</script>
