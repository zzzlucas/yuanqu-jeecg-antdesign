import { getAction, postAction, putAction } from '@/api/manage'
import qs from 'qs'

const url = {
  info: {
    list: '/workorder/mgrWorkorderInfo/list',
    delete: '/workorder/mgrWorkorderInfo/delete',
    deleteBatch: '/workorder/mgrWorkorderInfo/deleteBatch',
  },
}

export {
  url,
}