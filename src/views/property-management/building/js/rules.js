export const block = {
  projectName: [
    {required: true, message: '园区名称不能为空'}
  ],
  projectAbbr: [
    {required: true, message: '园区简称不能为空'}
  ]
}

export const tower = {
  buildingProjectId: [
    {required: true, message: '归属不能为空'}
  ]
}

export const floor = {
  buildingId: [
    {required: true, message: '归属不能为空'}
  ]
}

export const room = {
  floorId: [
    {required: true, message: '归属不能为空'}
  ]
}