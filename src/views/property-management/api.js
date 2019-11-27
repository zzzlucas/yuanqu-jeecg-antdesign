import { postAction, putAction } from '@/api/manage'
import qs from 'qs'

const url = {
  advertisingPlace: {
    list: '/park.service/baseAdvertsInfo/list',
    add: '/park.service/baseAdvertsInfo/add',
    edit: '/park.service/baseAdvertsInfo/edit',
    delete: '/park.service/baseAdvertsInfo/delete',
    deleteBatch: '/park.service/baseAdvertsInfo/deleteBatch',
  },
}

/** 广告位建档-添加 */
const addPlace = params => postAction(url.advertisingPlace.add, qs.stringify(params))
/** 广告位建档-编辑 */
const editPlace = params => putAction(url.advertisingPlace.edit, qs.stringify(params))

export {
  url,
  addPlace,
  editPlace,
}