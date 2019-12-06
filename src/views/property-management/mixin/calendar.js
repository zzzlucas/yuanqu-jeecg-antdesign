import 'jquery'
import moment from 'moment'
import 'fullcalendar/dist/locale/zh-cn'
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.min.css';
import { filterObj } from '@utils/util'
import MixinList from '@/mixins/List'
import { meetingRoom as BookMeetingRoomMixin } from './book'
import { listMeetingEvent } from '../api'

export default {
  mixins: [
    MixinList,
    BookMeetingRoomMixin,
  ],
  components: {
    FullCalendar,
  },
  data() {
    return {
      // Query
      queryParam: {
        projectId: '',
        buildingId: '',
      },
      // Data
      roomId: '',
      meeting: [],
      // Events
      events: [
        {
          title: "test",
          resourceId: "a",
          start: moment(),
          end: moment().add(1, "d")
        },
        {
          title: "test2",
          resourceId: "a2",
          start: moment().add(2, "d"),
          end: moment().add(3, "d")
        }
      ],
    }
  },
  methods: {
    async getList() {
      try {
        const params = this.queryParam
        filterObj(params)
        const resp = await listMeetingEvent(params)
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.meeting = resp.result
      } catch (e) {
        this.$message.error('获取会议预定列表失败')
      }
    },
    loadData() {
      this.getList()
      this.getRoomList()
    },
  },
  created() {
    this.loadData()
  },
}