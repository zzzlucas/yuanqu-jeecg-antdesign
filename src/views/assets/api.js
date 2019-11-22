import { getAction, postAction } from '@/api/manage'
import qs from 'qs'

/** 资产类别-分页列表查询 */
const listCategory = params => getAction('/park.asset/baseAssetCategory/list', params)
/** 资产类别-查询所有树中类别 */
const treeListCategory = () => getAction('/park.asset/baseAssetCategory/treeList')
/** 资产类别-添加 */
const addCategory = params => postAction('/park.asset/baseAssetCategory/add', qs.stringify(params))

export {
  listCategory,
  treeListCategory,
  addCategory,
}