import 'jquery'
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
        beginDate: '',
        endDate: '',
      },
      // Data
      roomId: '',
      /** @deprecated */
      meeting: [],
      // Format
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
    }
  },
  methods: {
    async fetchList() {
      try {
        const params = this.queryParam
        filterObj(params)
        const resp = await listMeetingEvent(params)
        if (!resp.success) {
          throw new Error(resp.message)
        }
        return resp.result
      } catch (e) {
        this.$message.error('获取会议预定列表失败')
      }
    },
    buildEvents(list) {
      return list.map(item => {
        return {
          id: item.requestId,
          title: item.meetingroomName,
          resourceId: item.roomId,
          start: item.begDate,
          end: item.endDate,
        }
      })
    },
    async getList(start, end, timezone, callback) {
      this.queryParam.begDate = start.format(this.dateFormat)
      this.queryParam.endDate = end.format(this.dateFormat)
      const list = await this.fetchList()
      callback(this.buildEvents(list))
    },
    loadData() {
      this.getRoomList()
    },
  },
}