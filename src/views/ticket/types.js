export const orderTypeProjectPeriod = [
  '1', // 物业报修 TODO: wrong?
  '7', // 公共设施
  '9', // 建筑垃圾处置 TODO: may wrong too, this option does not have any logic on design for whatever the reason is
  '10', // 临时占用道路
  '12', // 建筑物及设施改造
]

export const orderTypeProject = [
  '8', // 施工企业备案
]

export const orderTypesWithSpecialFields = {
  'projectPeriod': { description: '有项目和周期性的工单', types: orderTypeProjectPeriod, },
  'project': { description: '有项目性的工单', types: orderTypeProject, },
}