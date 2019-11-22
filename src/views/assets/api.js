import { getAction, postAction } from '@/api/manage'

/** 资产类别-分页列表查询 */
const listCategory = params => getAction('/park.asset/baseAssetCategory/list', params)
const addCategory = params => postAction('/park.asset/baseAssetCategory/add', params)

export {
  listCategory,
  addCategory,
}