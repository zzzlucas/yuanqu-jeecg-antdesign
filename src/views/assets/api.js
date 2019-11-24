import { getAction, postAction, putAction } from '@/api/manage'
import qs from 'qs'

/** 资产类别-分页列表查询 */
const listCategory = params => getAction('/park.asset/baseAssetCategory/list', params)
/** 资产类别-查询所有树中类别 */
const treeListCategory = params => getAction('/park.asset/baseAssetCategory/treeList', params)
/** 资产类别-添加 */
const addCategory = params => postAction('/park.asset/baseAssetCategory/add', qs.stringify(params))
/** 资产类别-修改 */
const editCategory = params => putAction('/park.asset/baseAssetCategory/edit', qs.stringify(params))

export {
  listCategory,
  treeListCategory,
  addCategory,
  editCategory,
}