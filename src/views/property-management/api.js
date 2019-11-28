import { getAction, postAction, putAction } from '@/api/manage'
import qs from 'qs'

const url = {
  architectureProject: {
    list: '/park.architecture/baseArchitectureProject/queryByParkId',
  },
  architectureBuilding: {
    list: '/park.architecture/baseArchitectureBuilding/queryByProjectId',
  },
  architectureFloor: {
    list: '/park.architecture/baseArchitectureFloor/queryByBuildingId',
  },
  advertisingPlace: {
    list: '/park.service/baseAdvertsInfo/list',
    add: '/park.service/baseAdvertsInfo/add',
    edit: '/park.service/baseAdvertsInfo/edit',
    delete: '/park.service/baseAdvertsInfo/delete',
    deleteBatch: '/park.service/baseAdvertsInfo/deleteBatch',
  },
  meetingRoom: {
    list: '/park.service/baseMeetingroomInfo/list',
    add: '/park.service/baseMeetingroomInfo/add',
    edit: '/park.service/baseMeetingroomInfo/edit',
    delete: '/park.service/baseMeetingroomInfo/delete',
    deleteBatch: '/park.service/baseMeetingroomInfo/deleteBatch',
  },
  meeting: {
    list: '/park.service/mgrMeetingroomRequest/list',
    add: '/park.service/mgrMeetingroomRequest/add',
    edit: '/park.service/mgrMeetingroomRequest/edit',
    delete: '/park.service/mgrMeetingroomRequest/delete',
    deleteBatch: '/park.service/mgrMeetingroomRequest/deleteBatch',
  },
}

/** 厂房项目列表-通过园区id查询- */
const listProject = params => getAction(url.architectureProject.list, params)
/** 楼宇列表-通过项目id查询 */
const listBuilding = params => getAction(url.architectureBuilding.list, params)
/** 楼层列表-通过楼宇id查询 */
const listFloor = params => getAction(url.architectureFloor.list, params)
/** 广告位建档-添加 */
const addPlace = params => postAction(url.advertisingPlace.add, qs.stringify(params))
/** 广告位建档-编辑 */
const editPlace = params => putAction(url.advertisingPlace.edit, qs.stringify(params))
/** 会议室建档-添加 */
const addMeetingRoom = params => postAction(url.meetingRoom.add, qs.stringify(params))
/** 会议室建档-编辑 */
const editMeetingRoom = params => putAction(url.meetingRoom.edit, qs.stringify(params))
/** 会议室建档-分页列表查询 */
const listMeetingRoom = params => getAction(url.meetingRoom.list, params)
/** 会议室预定-全部查询 */
const listMeeting = params => getAction(url.meeting.list, params)

export {
  url,
  listProject,
  listBuilding,
  listFloor,
  addPlace,
  editPlace,
  addMeetingRoom,
  editMeetingRoom,
  listMeetingRoom,
  listMeeting,
}