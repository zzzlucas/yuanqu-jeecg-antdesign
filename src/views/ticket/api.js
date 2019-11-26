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
}

/** 工单基本信息-新建**工单 */
const addInfo = (type, params) => postAction(url.info.add.replace('{:id}', type), qs.stringify(params))
/** 工单基本信息-编辑 */
const editInfo = params => putAction(url.info.edit, qs.stringify(params))
/** 工单基本信息-工单状态管理 */
const changeStatusInfo = params => putAction(url.info.changeStatus, qs.stringify(params))

export {
  url,
  addInfo,
  editInfo,
  changeStatusInfo,
}