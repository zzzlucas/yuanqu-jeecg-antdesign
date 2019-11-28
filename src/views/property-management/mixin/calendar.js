import 'jquery'
import moment from 'moment'
import 'fullcalendar/dist/locale/zh-cn'
import { FullCalendar } from 'vue-full-calendar'
import MixinList from '@/mixins/List'
import 'fullcalendar/dist/fullcalendar.min.css';
import { listMeetingRoom, listMeeting } from '../api'
import { filterObj } from '@utils/util'

export default {
  mixins: [
    MixinList,
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
      roomList: [],
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
    async getRoomList() {
      try {
        const params = {
          parkId: this.queryParam.parkId,
          projectId: this.queryParam.projectId,
          buildingId: this.queryParam.buildingId,
        }
        filterObj(params)
        const resp = await listMeetingRoom(params)
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.roomList = resp.result.records
      } catch (e) {
        this.$message.error('获取会议室列表失败')
      }
    },
    async getList() {
      try {
        const params = this.queryParam
        filterObj(params)
        const resp = await listMeeting(params)
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