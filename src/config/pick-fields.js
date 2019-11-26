export const PickParksForm = ['parkName', 'totalBulidingArea', 'totalWorkstation', 'feeScale', 'feeScaleUnit', 'totalRoom', 'feeScaleRoom', 'feeScaleRoomUnit', 'address', 'lng', 'lat', 'roomRate', 'telephone', 'deviceGroupId']
export const PickMgrEngineeringInfoForm = ['parkId', 'projectName', 'customerName', 'types', 'invest', 'engineeringProcess', 'setUpInvest', 'setUpSerialNum', 'approveSerialNum', 'projectTypes', 'serialNum', 'manager', 'nature', 'status', 'overGroundArea', 'underGroundArea', 'defenceArea', 'area', 'floorNumber', 'greenbeltArea', 'plotRatio', 'greeningRate', 'familyNum', 'structuralStyle']
export const ProjectAttractShowZeroForm = [
  'recordId',
  'projectId',
  'projectName',
  'tracker',
  'trackMethod',
  'status',
  'content',
  'resourceGroupId',
  'remark',
  'parkId',
  'addDocFiles',
  'version',
  'createUserName',
  'updateUserName'
]
export const AddProjectLandForm = [
  'projectId', //id
  'fillUnit',
  'creditCode',
  'unitAddress',
  'setUpYear',
  'companyRegisterType',
  'registerMoney',
  'totalAsset',
  'fixedAsset',
  'legalPerson',
  'legalTel',
  'email',
  'companyDescription',
  'teamMemberDescription',
  'parkId', //表单无此项
  'version', //版本号
  'createUserName', //创建者名称
  'updateUserName', //更新者名称

  'projectName',
  'projectType', //无
  'agentPerson',
  'agentTel',
  'belongSubject', //无  所属主体
  'investorValue', //无  投资主体
  'custId', //无  企业ID
  'getLandBuildingAddress',
  'mainBuildingContent', //目前注释  已填   textarea
  'areaPerformance', //目前注释  已填   textarea
  'mainMaterial',
  'materialCost',
  'mainProduct',
  'productOutput',
  'waterElec', //目前注释  已填   textarea
  'greenFire', //目前注释  已填   textarea
  'allUseArea',
  'newUseArea',
  'rentBuildArea',
  'industrySectorValue', //目前注释  已填   select 可能数据字典
  'isTalentProject', //目前注释  已填  radio
  'gainArea', //需加require
  'annualProductionValue',
  'annualTaxes',
  'status', //无  表单无此项  项目状态
  'applyReason', //目前注释  已填   textarea
  'projectTechnologyFlow', //目前注释  已填   富文本
  'importance', //无
  'projectManager', //无
  'auditStatus', //无

  'investAmount',
  'projectUseInvest',
  'registerCapital',
  'isForeignCapital', //目前注释  已填  radio
  'fixedAssetInvest',
  'civilWork',
  'install',
  'device',
  'projectBuilding',
  'budget',
  'buildingInterest',
  'bottomWorkingCapital',
  'freeCapital',
  'sharesBond',
  'bankLoan',
  'otherCapital',
  'newSale',
  'newProfit',
  'newTax',
  'foreignEarning',
  'remark',
  'addDocFiles'

  //表单有，但是这里没有的
  //buildingBeginDate
  //buildingEndDate
]
export const AddProjectLeaseForm = [
  'addDocFiles',
  'agentPerson',
  'agentTel',
  'allBuildingArea',
  'allUseArea',
  'annualProductionValue',
  'annualTaxes',
  'applyReason',
  'areaFixedInvest',
  'areaOutput',
  'areaPerformance',
  'areaTax',
  'auditStatus',
  'belongSubject',
  'buildingArea',
  'buildingBeginDate',
  'buildingDensity',
  'buildingEndDate',
  'companyDescription',
  'companyRegisterType',
  'createBy',
  'createTime',
  'createUserName',
  'creditCode',
  'custId',
  'deviceInvest',
  'email',
  'endDate',
  'fillUnit',
  'fixedAsset',
  'fixedAssetInvest',
  'gainArea',
  'getLandBuildingAddress',
  'greenFire',
  'importance',
  'industryAddedValue',
  'industrySectorValue',
  'investAmount',
  'investorValue',
  'isForeignCapital',
  'isTalentProject',
  'legalPerson',
  'legalTel',
  'mainBuildingContent',
  'mainMaterial',
  'mainProduct',
  'materialCost',
  'addedEnergy',
  'newUseArea',
  'otherInvest',
  'parkId',
  'plotRatio',
  'productOutput',
  'productionRate',
  'projectId',
  'projectManager',
  'projectName',
  'projectTechnologyFlow',
  'projectType',
  'registerCapital',
  'registerMoney',
  'remark',
  'rentBuildArea',
  'reportTime',
  'setUpYear',
  'startDate',
  'status',
  'teamMemberDescription',
  'totalAsset',
  'unitAddress',
  'updateBy',
  'updateTime',
  'updateUserName',
  'version',
  'waterElec'
]

export const AddbaseCustomerForm = [
  'creditCode',
  'addDocFiles',
  'buidling',
  'businessAddress',
  'businessAddressZipCode',
  'businessLicense',
  'businessScope',
  'businessScopePermit',
  'bussinessStatus',
  'caseId',
  'contactId',
  'contactName',
  'content',
  'createBy',
  'createTime',
  'createUserName',
  'baseCustomerBusiness.businessAddress',
  'custId',
  'customerAbbr',
  'customerName',
  'customerNo',
  'delFlag',
  'deptIdS',
  'deptOrgCodeS',
  'email',
  'enterpriseRating',
  'fax',
  'hasWorkshop',
  'imageList',
  'industryCategory',
  'isEnable',
  'labelGroupId',
  'lat',
  'legalPerson',
  'lng',
  'longLat',
  'merchantDate',
  'merchantManager',
  'mobile',
  'organizational',
  'parkId',
  'position',
  'qq',
  'rCToRMB',
  'registDate',
  'registerAddress',
  'registerAddressZipCode',
  'registeredCapital',
  'registeredCapitalUnit',
  'registrationType',
  'relCustListId',
  'rentalNumber',
  'servicer',
  'settledDate',
  'sex',
  'sortOrder',
  'status',
  'taxStatus',
  'technicalField',
  'telephone',
  'unitNature',
  'updateBy',
  'updateTime',
  'updateUserName',
  'version',
  'weChat',
  'website'
]

export const PickBuildingBlockForm = [
  'address',
  'buildingArea',
  'ownerName',
  'parkId',
  'projectAbbr',
  'projectName',
  'propertyCompany',
  'remark',
  'rentArea',
  'rentTypeValue'
]

export const AddTechProjectForm = [
  'addDocFiles',
  'agentPerson',
  'agentTel',
  'allUseArea',
  'annualProductionValue',
  'annualTaxes',
  'applyReason',
  'areaPerformance',
  'auditStatus',
  'bankLoan',
  'belongSubject',
  'bottomWorkingCapital',
  'budget',
  'buildingBeginDate',
  'buildingEndDate',
  'buildingInterest',
  'civilWork',
  'companyDescription',
  'companyRegisterType',
  'createBy',
  'createTime',
  'createUserName',
  'creditCode',
  'custId',
  'device',
  'email',
  'fillUnit',
  'fixedAsset',
  'fixedAssetInvest',
  'foreignEarning',
  'freeCapital',
  'gainArea',
  'getLandBuildingAddress',
  'greenFire',
  'importance',
  'industrySectorValue',
  'install',
  'investAmount',
  'investorValue',
  'isChangeBuild',
  'isForeignCapital',
  'isTalentProject',
  'legalPerson',
  'legalTel',
  'mainBuildingContent',
  'mainMaterial',
  'mainProduct',
  'materialCost',
  'newBuildArea',
  'newProfit',
  'newSale',
  'newTax',
  'newUseArea',
  'originalBuildArea',
  'otherCapital',
  'ownLandNumber',
  'parkId',
  'productOutput',
  'projectBuilding',
  'projectId',
  'projectManager',
  'projectName',
  'projectTechnologyFlow',
  'projectType',
  'projectUseInvest',
  'projectWorkFlowId',
  'registerCapital',
  'registerMoney',
  'remark',
  'rentBuildArea',
  'rentLandNumber',
  'reportTime',
  'setUpYear',
  'sharesBond',
  'status',
  'teamMemberDescription',
  'totalAsset',
  'totalUseArea',
  'unitAddress',
  'updateBy',
  'updateTime',
  'updateUserName',
  'version',
  'waterElec',
  'workFlowUseObject',
  'afterChangeBuildArea'
]
export const PickBuildingTowerForm = ['buildingProjectId', 'buildingName', 'estimateArea', 'groundFloor', 'undergroundFloor', 'isVirtual', 'remark']
export const PickBuildingFloorForm = ['buildingId', 'floorName', 'allarea', 'height', 'bearing', 'isVirtual', 'remark']
export const PickBuildingRoomForm = ['floorId', 'roomName', 'actualArea', 'isRented', 'isSelfUse', 'isVirtual', 'remark']

export const assetsCategoryEditForm = [
  'categoryName',
  'parentId',
]

export const assetsRegisterEditForm = [
  'categoryId',
  'categoryType',
  'assetNumber',
  'fixedAssetName',
  'assetModel',
  'qty',
  'stockPrice',
  'stockAmount',
  'purchaseDate',
  'useStatus',
  'USEDept',
  'usePerson',
  'location',
  'remark',
]
