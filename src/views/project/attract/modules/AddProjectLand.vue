<template>
  <a-drawer
    wrapClassName="mgr-project-trace-drawer"
    width="90%"
    :visible="visible"
    @close="handleCancel"
    destroyOnClose
    :title="title"
  >
    <div>
      <a-form @submit="handleSubmit" :form="form">
        <!-- 11111111111111 -->
        <a-card :bordered="false" style="width:1200px;margin:auto" title="企业信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目单位">
                <a-input
                  placeholder
                  v-decorator="['fillUnit',{rules: [{ required: true, message: '请输入项目单位', whitespace:true}]}]"
                />
                <!-- getFieldDecorator="[]"   initialValue:'test' -->
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="组织机构代码">
                <a-input
                  placeholder
                  v-decorator="['creditCode',{rules: [{ required: true, message: '请输入组织机构代码', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行2 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="单位地址">
                <a-input
                  placeholder
                  v-decorator="['unitAddress',{rules: [{ required: true, message: '请输入单位地址', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="成立年份" required>
                <a-input
                  placeholder
                  v-decorator="['setUpYear',{rules: [{ required: true, message: '请输入成立年份', whitespace: true}]}]"
                />
                <!-- 此处不应使用时间框 -->
                <!-- <a-date-picker style="width:100%" v-decorator="['setUpYear']" /> -->
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行3 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="企业登记注册类型" required>
                <!-- {initialValue: '1'}, -->
                <a-select
                  v-decorator="['companyRegisterType',{rules: [{ required: true, message: '请输入企业登记注册类型', whitespace: true}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.companyRegisterTypeExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
                <!-- 根据excel表，此处无需字典表 -->
                <!-- <JDictSelectTag v-model="testData" dictCode="mgr-attr-addpl-companyRegisterType"></JDictSelectTag> -->
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="注册资金">
                <a-input
                  placeholder
                  addonAfter="万元"
                  v-decorator="['registerMoney',{rules: [{ required: true, message: '请输入注册资金'}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行4 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="企业总资产">
                <a-input
                  addonAfter="万元"
                  v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入企业总资产'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="固定资产净值">
                <a-input
                  addonAfter="万元"
                  v-decorator="['fixedAsset',{rules: [{ required: true, message: '请输入固定资产净值'}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行5 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="法定代表人">
                <a-input placeholder v-decorator="['legalPerson']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="联系电话（法人）">
                <a-input placeholder v-decorator="['legalTel']" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行6 -->

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="经办人">
                <a-input
                  v-decorator="['agentPerson', {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]} ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="联系电话（经办人）">
                <a-input
                  v-decorator="[ 'agentTel',{rules: [{ required: true, message: '请输入经办人电话', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行7 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="电子信箱">
                <a-input placeholder v-decorator="['email']" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行8 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="公司概况">
                <a-textarea :rows="4" placeholder v-decorator="['companyDescription']" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行9 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="团队成员情况">
                <a-textarea :rows="4" placeholder v-decorator="['teamMemberDescription']" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行10 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="年产值">
                <a-input
                  addonAfter="万元"
                  placeholder
                  v-decorator="['annualProductionValue']"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="年税金">
                <a-input addonAfter="万元" placeholder v-decorator="['annualTaxes']" />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- <a-form-item v-if="showSubmit">
            <a-button htmlType="submit">Submit</a-button>
          </a-form-item>-->
        </a-card>

        <!-- 22222222 -->
        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设项目名称">
                <a-input
                  v-decorator="['projectName',{rules: [{ required: true, message: '请输入建设项目名称', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="拟建设地址">
                <a-input
                  v-decorator="['getLandBuildingAddress',{rules: [{ required: true, message: '请输入拟建设地址', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要建设内容及规模（生产能力）">
                <a-textarea
                  :rows="4"
                  v-decorator="['mainBuildingContent',{rules: [{ required: true, message: '请输入内容', whitespace: true}]}]"
                ></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="亩均效绩介（A类、B类、C类、D类）">
                <a-textarea :rows="4" v-decorator="['areaPerformance']"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要原料">
                <a-input placeholder v-decorator="['mainMaterial']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="消耗量或产出量">
                <a-input placeholder v-decorator="['materialCost']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要产品">
                <a-input placeholder v-decorator="['mainProduct']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="消耗量或产出量">
                <a-input placeholder v-decorator="['productOutput']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="水、电等配套情况">
                <a-textarea :rows="4" v-decorator="['waterElec']"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="环保、消防等措施">
                <a-textarea :rows="4" v-decorator="['greenFire']"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="总用地面积">
                <a-input placeholder v-decorator="['allUseArea']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新征用地面积">
                <a-input placeholder v-decorator="['newUseArea']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="租赁建设面积">
                <a-input addonAfter="m²" placeholder v-decorator="['rentBuildArea']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="所属行业">
                <a-select
                  v-decorator="['industrySectorValue',{rules: [{ required: true, message: '请选择所属行业'}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.industrySectorValueExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设开始时间" required>
                <a-date-picker
                  v-decorator="['buildingBeginDate',{rules: [{ required: true, message: '请选择建设开始时间'}]}]"
                  style="width:100%"
                />
              </a-form-item>
            </a-col>

            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设结束时间" required>
                <a-date-picker
                  v-decorator="['buildingEndDate',{rules: [{ required: true, message: '请选择建设结束时间'}]}]"
                  style="width:100%"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否人才项目">
                <a-radio-group v-decorator="['isTalentProject']">
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="拿地面积">
                <a-input
                  placeholder
                  addonAfter="m²"
                  v-decorator="['gainArea',{rules: [{ required: true, message: '请输入拿地面积'}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <!-- 333333333333 -->
        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目投资">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目总投资">
                <a-input
                  addonAfter="万元"
                  v-decorator="['investAmount',{rules: [{ required: true, message: '请输入数额'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="其中项目用汇">
                <a-input addonAfter="万美元" placeholder v-decorator="['projectUseInvest']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="注册资本">
                <a-input
                  addonAfter="万元"
                  v-decorator="[ 'registerCapital',{rules: [{ required: true, message: '请输入数额'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否外资">
                <a-radio-group v-decorator="['isForeignCapital']">
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="固定资产投资">
                <a-input addonAfter="万元" placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="土建">
                <a-input placeholder v-decorator="[ 'civilWork' ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="安装">
                <a-input placeholder v-decorator="['install']" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="设备">
                <a-input placeholder v-decorator="[ 'device' ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="工程建设其他费用">
                <a-input placeholder v-decorator="['projectBuilding' ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="预备费">
                <a-input placeholder v-decorator="[ 'budget'  ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设期利息">
                <a-input placeholder v-decorator="[ 'buildingInterest' ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="铺底流动资金">
                <a-input placeholder v-decorator="[ 'bottomWorkingCapital'  ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="自有资金">
                <a-input placeholder v-decorator="[ 'freeCapital' ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="股票/债券">
                <a-input placeholder v-decorator="[ 'sharesBond'  ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="银行贷款">
                <a-input placeholder v-decorator="[  'bankLoan'   ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="其他">
                <a-input placeholder v-decorator="[ 'otherCapital' ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增销售收入">
                <a-input addonAfter="万元" placeholder v-decorator="[ 'newSale' ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增利润">
                <a-input addonAfter="万元" placeholder v-decorator="[ 'newProfit' ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增税金">
                <a-input addonAfter="万元" placeholder v-decorator="['newTax' ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="创汇">
                <a-input addonAfter="万美元" placeholder v-decorator="['foreignEarning' ]" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目申请理由简述">
                <a-textarea :rows="4" v-decorator="['applyReason' ]"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 富文本  projectTechnologyFlow   项目工艺流程及说明 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目工艺流程（图示式）及说明">
                <j-editor v-model="editor.projectTechnologyFlow"></j-editor>
                <!-- <j-editor v-decorator="['projectTechnologyFlow']"></j-editor> -->
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="备注">
                <a-textarea :rows="4" v-decorator="['remark' ]"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- upload  addDocFiles   附件 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="附件">
                <j-upload v-decorator="['addDocFiles']" />
                <!-- <a-upload name="file" :showUploadList="true" :multiple="false">
                    :headers="tokenHeader"
                    :action="importExcelUrl"
                    @change="handleImportExcel"
                    <a-button type="primary" icon="import">上传附件</a-button>
                </a-upload>-->
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </div>
    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="handleSubmit">确定</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
// import '@/components/dict/JDictSelectUtil'
// import { JeecgListMixin } from '@/mixins/JeecgListMixin'     //1107

import qs from 'qs'
import JEditor from '@/components/jeecg/JEditor'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import { AddProjectLandForm } from '@/config/pick-fields'
import { mapGetters } from 'vuex'
import JUpload from '@/components/jeecg/JUpload'
export default {
  name: 'addProjectLandForm',
  // mixins: [JeecgListMixin],
  components: { JEditor, JDictSelectTag, JUpload },
  data() {
    return {
      // title: '首页 / 拿地项目 / 项目维护',
      //   form: {}
      form: this.$form.createForm(this, { name: 'addProjectLandForm' }),
      formItem: {
        label: { span: 6 },
        value: { span: 18 }
      },
      url: {
        add: '/park.project/mgrProjectInfo/addProject',
        edit: '/park.project/mgrProjectInfo/editProject'
      },
      confirmLoading: false,
      model: {},
      editBool: false,
      // setUpYear: '',
      dateFormat: 'YYYY-MM-DD',
      // record: { id: 1191619700384071680 }
      testData: '',
      // industrySectorValue: '',
      // companyRegisterType: '',
      dict: {
        industrySectorValueExt: [{ value: '1' }],
        companyRegisterType: [{ value: '1' }]
      },
      record: {},
      visible: false,
      loading: false,
      editor: {
        projectTechnologyFlow: ''
      }
      // value:""
      // DictDataindustrySectorValue:this.form.getFieldValue('industrySectorValue')
    }
  },
  updated() {
    // this.edit(this.record.id)
  },
  computed: {
    title() {
      return '拿地项目' + (this.editBool ? '维护' : '新建')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {
    initDictOptions('industry_sector_value').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industrySectorValueExt = res.result
      }
    })
    initDictOptions('mgr-attr-addpl-companyRegisterType').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.companyRegisterTypeExt = res.result
      }
    })
  },
  methods: {
    importExcelUrl() {},
    handleImportExcel() {},
    moment,
    add() {
      this.editBool = false
      this.visible = true
    },
    // add() {
    //   this.picUrl = ''
    //   this.refresh()
    //   this.edit({ activitiSync: '1' })
    // },
    detail(record) {
      // this.record = record
      // console.log(this.record.recordId)
      this.editBool = true
      this.form.resetFields()
      //后端少的内容
      //大约因为当前写法，项目维护时点开后关闭，再次打开会无法获取
      if (record.mgrProjectCust) {
        record.totalAsset = record.mgrProjectCust.totalAsset
        record.legalTel = record.mgrProjectCust.legalTel
        record.companyDescription = record.mgrProjectCust.companyDescription
        record.updateUserName = record.mgrProjectCust.updateUserName
        record.createUserName = record.mgrProjectCust.createUserName
        record.updateTime = record.mgrProjectCust.updateTime
        record.fillUnit = record.mgrProjectCust.fillUnit
        record.version = record.mgrProjectCust.version
        record.unitAddress = record.mgrProjectCust.unitAddress
        record.companyRegisterType = record.mgrProjectCust.companyRegisterType
        record.createBy = record.mgrProjectCust.createBy
        record.creditCode = record.mgrProjectCust.creditCode
        record.createTime = record.mgrProjectCust.createTime
        record.updateBy = record.mgrProjectCust.updateBy
        record.legalPerson = record.mgrProjectCust.legalPerson
        record.fixedAsset = record.mgrProjectCust.fixedAsset
        record.registerMoney = record.mgrProjectCust.registerMoney
        record.teamMemberDescription = record.mgrProjectCust.teamMemberDescription
        record.setUpYear = record.mgrProjectCust.setUpYear
        record.email = record.mgrProjectCust.email
      }
      if (record.mgrProjectInvest) {
        record.isForeignCapital = record.mgrProjectInvest.isForeignCapital
        record.fixedAssetInvest = record.mgrProjectInvest.fixedAssetInvest
        record.newProfit = record.mgrProjectInvest.newProfit
        record.remark = record.mgrProjectInvest.remark
        record.createUserName = record.mgrProjectInvest.createUserName
        record.projectUseInvest = record.mgrProjectInvest.projectUseInvest
        record.newTax = record.mgrProjectInvest.newTax
        record.freeCapital = record.mgrProjectInvest.freeCapital
        record.addDocFiles = record.mgrProjectInvest.addDocFiles
        record.updateBy = record.mgrProjectInvest.updateBy
        record.civilWork = record.mgrProjectInvest.civilWork
        record.otherCapital = record.mgrProjectInvest.otherCapital
        record.budget = record.mgrProjectInvest.budget
        record.bankLoan = record.mgrProjectInvest.bankLoan
        record.sharesBond = record.mgrProjectInvest.sharesBond
        record.updateUserName = record.mgrProjectInvest.updateUserName
        record.updateTime = record.mgrProjectInvest.updateTime
        record.foreignEarning = record.mgrProjectInvest.foreignEarning
        record.version = record.mgrProjectInvest.version
        record.createBy = record.mgrProjectInvest.createBy
        record.registerCapital = record.mgrProjectInvest.registerCapital
        record.install = record.mgrProjectInvest.install
        record.projectBuilding = record.mgrProjectInvest.projectBuilding
        record.createTime = record.mgrProjectInvest.createTime
        record.investAmount = record.mgrProjectInvest.investAmount
        record.bottomWorkingCapital = record.mgrProjectInvest.bottomWorkingCapital
        record.newSale = record.mgrProjectInvest.bottomWorkingCapital
        record.device = record.mgrProjectInvest.device
        record.buildingInterest = record.mgrProjectInvest.buildingInterest
      }
      delete record.mgrProjectCust
      delete record.mgrProjectInvest
      delete record.mgrProjectInvestLease

      this.model = Object.assign({}, record)
      this.visible = true
      // console.log(pick(this.model, ProjectAttractShowZeroForm))
      this.$nextTick(() => {
        this.editor = {
          projectTechnologyFlow: record.projectTechnologyFlow
        }
        this.form.setFieldsValue(pick(this.model, AddProjectLandForm))
        this.form.setFieldsValue({
          buildingEndDate: this.model.buildingEndDate ? moment(this.model.buildingEndDate) : null
        })
        this.form.setFieldsValue({
          buildingBeginDate: this.model.buildingBeginDate ? moment(this.model.buildingBeginDate) : null
        })
      })
    },
    // edit(record) {
    //   console.log('edit开始了')
    //   this.form.resetFields()
    //   this.model = Object.assign({}, record)
    //   // console.log(this.model)
    //   this.visible = true
    //   this.$nextTick(() => {
    //     this.form.setFieldsValue(pick(this.model, AddProjectLandForm))
    //     //时间格式化
    //   })
    //   // console.log(this.model)
    // },

    handleCancel() {
      this.visible = false
      // this.record = {}
    },
    handleSubmit() {
      // console.log(this.form.getFieldValue('setUpYear'))
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        // values.setUpYear = 1
        // console.log(values.setUpYear)
        if (!err) {
          that.confirmLoading = true
          const { projectTechnologyFlow } = this.editor

          let httpurl = ''
          let method = ''
          // console.log('2222')
          if (!this.model.projectId) {
            //增
            console.log('post方式')
            httpurl += this.url.add
            method = 'post'
          } else {
            //改
            console.log('put方式')
            httpurl += this.url.edit
            method = 'put'
          }

          // let formData = {}
          let formData = Object.assign(this.model, values)
          // formData.setUpYear = formData.setUpYear ? formData.setUpYear.format() : null
          formData.buildingBeginDate = formData.buildingBeginDate
            ? formData.buildingBeginDate.format('YYYY-MM-DD')
            : null
          formData.buildingEndDate = formData.buildingEndDate ? formData.buildingEndDate.format('YYYY-MM-DD') : null
          formData.projectTechnologyFlow = projectTechnologyFlow
          formData.parkId = this.industrialParkId
          // console.log('1111111')
          // console.log(formData.projectTechnologyFlow)
          // console.log('222222')
          //qs.stringify  目前看来必须转换
          // formData.projectType = '1'
          if (!this.model.projectId) {
            formData.status = '1'
          }
          formData = qs.stringify(formData)
          console.log(formData)

          // formData = JSON.stringify(formData);
          // console.log(formData)

          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                // that.$message.success('项目维护编辑成功')
                that.$message.success(res.message)
                that.$emit('reload')
                this.visible = false
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              // that.close()
            })
        }
      })
      // this.form.resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
.mgr-project-trace-drawer .ant-btn {
  margin-bottom: 0;
}
.top {
  margin: 0;
}
.myinput {
  color: rgba(0, 0, 0, 0.85);
  .ant-input {
    width: 50px;
  }
}
</style>