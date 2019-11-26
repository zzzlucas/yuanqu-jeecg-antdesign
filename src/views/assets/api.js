import { getAction, postAction, putAction } from '@/api/manage'
import qs from 'qs'

const url = {
  category: {
    list: '/park.asset/baseAssetCategory/list',
    treeList: '/park.asset/baseAssetCategory/treeList',
    add: '/park.asset/baseAssetCategory/add',
    edit: '/park.asset/baseAssetCategory/edit',
    delete: '/park.asset/baseAssetCategory/delete',
    deleteBatch: '/park.asset/baseAssetCategory/deleteBatch',
  },
  info: {
    list: '/park.asset/baseAssetInfo/list',
    add: '/park.asset/baseAssetInfo/add',
    edit: '/park.asset/baseAssetInfo/edit',
    delete: '/park.asset/baseAssetInfo/delete',
    deleteBatch: '/park.asset/baseAssetInfo/deleteBatch',
  },
  mgrAssetOpertion: {
    list: '/park.asset/mgrAssetOpertion/list',
    add: '/park.asset/mgrAssetOpertion/add',
    edit: '/park.asset/mgrAssetOpertion/edit',
    delete: '/park.asset/mgrAssetOpertion/delete',
    deleteBatch: '/park.asset/mgrAssetOpertion/deleteBatch',
  },
}

/** 资产类别-查询所有树中类别 */
const treeListCategory = params => getAction('/park.asset/baseAssetCategory/treeList', params)
/** 资产类别-添加 */
const addCategory = params => postAction('/park.asset/baseAssetCategory/add', qs.stringify(params))
/** 资产类别-编辑 */
const editCategory = params => putAction('/park.asset/baseAssetCategory/edit', qs.stringify(params))
/** 资产建档-添加 */
const addInfo = params => postAction('/park.asset/baseAssetInfo/add', qs.stringify(params))
/** 资产建档-编辑 */
const editInfo = params => postAction('/park.asset/baseAssetInfo/edit', qs.stringify(params))

export {
  url,
  treeListCategory,
  addCategory,
  editCategory,
  addInfo,
  editInfo,
}