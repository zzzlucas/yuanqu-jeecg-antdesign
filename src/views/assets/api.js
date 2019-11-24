import { getAction, postAction, putAction } from '@/api/manage'
import qs from 'qs'

const url = {
  list: '/park.asset/baseAssetCategory/list',
  treeList: '/park.asset/baseAssetCategory/treeList',
  add: '/park.asset/baseAssetCategory/add',
  edit: '/park.asset/baseAssetCategory/edit',
  delete: '/park.asset/baseAssetCategory/delete',
  deleteBatch: '/park.asset/baseAssetCategory/deleteBatch',
}

/** 资产类别-查询所有树中类别 */
const treeListCategory = params => getAction('/park.asset/baseAssetCategory/treeList', params)
/** 资产类别-添加 */
const addCategory = params => postAction('/park.asset/baseAssetCategory/add', qs.stringify(params))
/** 资产类别-修改 */
const editCategory = params => putAction('/park.asset/baseAssetCategory/edit', qs.stringify(params))

export {
  url,
  treeListCategory,
  addCategory,
  editCategory,
}