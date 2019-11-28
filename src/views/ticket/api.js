import { getAction, postAction, putAction } from '@/api/manage'
import qs from 'qs'

const url = {
  info: {
    list: '/workorder/mgrWorkorderInfo/list',
    add: '/workorder/mgrWorkorderInfo/add_{:id}', // Need replace {:id} to order type
    edit: '/workorder/mgrWorkorderInfo/edit',
    delete: '/workorder/mgrWorkorderInfo/delete',
    deleteBatch: '/workorder/mgrWorkorderInfo/deleteBatch',
    view: '/workorder/mgrWorkorderInfo/showDetail',
    detail: '/workorder/mgrWorkorderInfo/queryById',
    changeStatus: '/workorder/mgrWorkorderInfo/changeStatus',
  },
  operate: {
    list: '/park.workorder/mgrOrderOperate/list',
    view: '/park.workorder/mgrOrderOperate/queryById',
    add: '/park.workorder/mgrOrderOperate/add',
    edit: '/park.workorder/mgrOrderOperate/edit',
  },
}

/** 工单基本信息-新建**工单 */
const addInfo = (type, params) => postAction(url.info.add.replace('{:id}', type), qs.stringify(params))
/** 工单基本信息-编辑 */
const editInfo = params => putAction(url.info.edit, qs.stringify(params))
/** 工单基本信息-工单详情 */
const viewInfo = params => getAction(url.info.view, params)
/** 工单基本信息-工单状态管理 */
const changeStatusInfo = params => putAction(url.info.changeStatus, qs.stringify(params))
/** 工单操作记录-分页列表查询s */
const listOperate = params => getAction(url.operate.list, params)
/** 工单操作记录-添加 */
const addOperate = params => postAction(url.operate.add, params)

export {
  url,
  addInfo,
  editInfo,
  viewInfo,
  changeStatusInfo,
  listOperate,
  addOperate,
}