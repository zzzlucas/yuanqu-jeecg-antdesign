<template>
  <div>
    <page-layout :title="title">
      <a-divider type="vertical" />

      <a-form @submit="handleSubmit" :form="form" disabled>
        <!-- <a-card > </a-card> -->
        <a-card :bordered="false" style="width:1200px;margin:auto">
          <a-tabs defaultActiveKey="1">
            <!-- @change="callback" -->
            <a-tab-pane tab="项目初次申请" key="1">
              <!-- 11111111111111 -->

              <a-card :bordered="false" title="企业信息">
                <!-- 行1 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="项目单位">
                      <a-input
                        disabled
                        placeholder
                        v-decorator="['fillUnit',{rules: [{ required: true, message: '请输入项目单位', whitespace:true}]}]"
                      />
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
                        placeholder
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
                    <a-form-item label="注册资金（万元）">
                      <a-input
                        placeholder
                        v-decorator="['registerMoney',{rules: [{ required: true, message: '请输入注册资金'}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行4 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="企业总资产（万元）">
                      <a-input
                        placeholder
                        v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入企业总资产'}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="固定资产净值（万元）">
                      <a-input
                        placeholder
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
                    <a-form-item label="联系电话（法人">
                      <a-input placeholder v-decorator="['legalTel']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行6 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="经办人">
                      <a-input
                        placeholder
                        v-decorator="['agentPerson', {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]} ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="联系电话（经办人）">
                      <a-input
                        placeholder
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
                    <a-form-item label="年产值（万元）">
                      <a-input placeholder v-decorator="[    'annualProductionValue'   ]" />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="年税金（万元）">
                      <a-input placeholder v-decorator="[  'annualTaxes'  ]" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
              <a-card :bordered="false" title="项目信息">
                <!-- 行1 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="建设项目名称">
                      <a-input
                        placeholder
                        v-decorator="['projectName',{rules: [{ required: true, message: '请输入建设项目名称', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="拟建设地址">
                      <a-input
                        placeholder
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
                        placeholder
                        v-decorator="['mainBuildingContent',{rules: [{ required: true, message: '请输入内容', whitespace: true}]}]"
                      ></a-textarea>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="亩均效绩介（A类、B类、C类、D类）">
                      <a-textarea placeholder :rows="4" v-decorator="['areaPerformance']"></a-textarea>
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
                      <a-textarea placeholder :rows="4" v-decorator="['waterElec']"></a-textarea>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="环保、消防等措施">
                      <a-textarea placeholder :rows="4" v-decorator="['greenFire']"></a-textarea>
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
                    <a-form-item label="租赁建设面积（平方米）">
                      <a-input placeholder v-decorator="['rentBuildArea']" />
                    </a-form-item>
                  </a-col>
                  <!-- 按要求，应该使用数据字典 -->
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="所属行业" required>
                      <!-- <JDictSelectTag v-decorator="['industrySectorValue', {initialValue: '1'}]" dictCode="INDUSTRY_SECTOR_VALUE"></JDictSelectTag> -->
                      <!-- {initialValue: dict.industrySectorValueExt[0].value} -->
                      <a-select placeholder v-decorator="['industrySectorValue']">
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
                        placeholder
                        v-decorator="['buildingBeginDate']"
                        style="width:100%"
                      />
                    </a-form-item>
                  </a-col>

                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="建设结束时间" required>
                      <a-date-picker
                        placeholder
                        v-decorator="['buildingEndDate']"
                        style="width:100%"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="是否人才项目">
                      <a-radio-group placeholder v-decorator="['isTalentProject']">
                        <a-radio value="1">是</a-radio>
                        <a-radio value="2">否</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="拿地面积（m²）">
                      <a-input
                        placeholder
                        v-decorator="['gainArea',{rules: [{ required: true, message: '请输入拿地面积'}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>

              <!-- 333333333333 -->
              <a-card :bordered="false" title="项目投资">
                <!-- 行1 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="项目总投资（万元）">
                      <a-input
                        placeholder
                        v-decorator="['investAmount',{rules: [{ required: true, message: '请输入数额'}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="其中项目用汇（万美元）">
                      <a-input placeholder v-decorator="['projectUseInvest']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="注册资本（万元）">
                      <a-input
                        placeholder
                        v-decorator="[ 'registerCapital',{rules: [{ required: true, message: '请输入数额'}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="是否外资">
                      <a-radio-group placeholder v-decorator="['isForeignCapital']">
                        <a-radio value="1">是</a-radio>
                        <a-radio value="2">否</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="固定资产投资（万元）">
                      <a-input placeholder v-decorator="['fixedAssetInvest']" />
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
                    <a-form-item label="新增销售收入（万元）">
                      <a-input placeholder v-decorator="[ 'newSale' ]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="新增利润（万元）">
                      <a-input placeholder v-decorator="[ 'newProfit' ]" />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="新增税金（万元）">
                      <a-input placeholder v-decorator="['newTax' ]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="创汇（万美元）">
                      <a-input placeholder v-decorator="['foreignEarning' ]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="项目申请理由简述">
                      <a-textarea placeholder :rows="4" v-decorator="['applyReason' ]"></a-textarea>
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 富文本  projectTechnologyFlow   项目工艺流程及说明 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="项目工艺流程（图示式）及说明">
                      <j-editor placeholder v-model="editor.projectTechnologyFlow"></j-editor>
                      <!-- <j-editor v-decorator="['projectTechnologyFlow']"></j-editor> -->
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="备注">
                      <a-textarea placeholder :rows="4" v-decorator="['remark' ]"></a-textarea>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="projectId test">
                      <a-input
                        placeholder
                        v-decorator="['projectId', {rules: [{ required: true, message: '请输入projectId', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="parkId test">
                      <a-input
                        placeholder
                        v-decorator="['parkId', {rules: [{ required: true, message: '请输入parkId', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="projectType test">
                      <a-input
                        placeholder
                        v-decorator="['projectType', {rules: [{ required: true, message: '请输入projectType', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- upload  addDocFiles   附件 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                    <a-form-item label="附件">
                      <a-upload name="file" :showUploadList="true" :multiple="false">
                        <a-button type="primary" icon="import">上传附件</a-button>
                        <!-- <span>（单个图片大小不可超过10.00M，全部图片大小不可超过30.00M）</span> -->
                      </a-upload>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
              <a-card :bordered="false" size="small">
                <a-button style="float:right;" type="primary" @click="handleSubmit">保存（Test Submit）</a-button>
                <!-- <a-button type="primary" html-type="submit" @click="handleSubmit">Test Submit</a-button> -->
              </a-card>
            </a-tab-pane>

            <!-- 2222222222222222222222222222222222222222222222222222222222222222 -->
            <a-tab-pane tab="项目二次申请" key="2">
              <a-card :bordered="false" title="公司注册信息">
                <!-- 行1 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="拟注册公司名称" required>
                      <a-input
                        v-decorator="['custName',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="拟注册资本">
                      <a-input
                        v-decorator="['registerAssets',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="法人代表" required>
                      <a-input
                        v-decorator="['legalPerson',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="联系方式">
                      <a-input
                        v-decorator="['legalTel',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="拟注册地址">
                      <a-input
                        v-decorator="['registerAddress',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="经营范围">
                      <a-textarea :rows="4" v-decorator="['businessScope']" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>

              <a-card :bordered="false" title="法人股东">
                <a-table
                  ref="table"
                  size="default"
                  bordered
                  rowKey="id"
                  :columns="columns1"
                  :dataSource="dataSource"
                  :pagination="ipagination"
                  :loading="loading"
                >
                  <!-- @change="handleTableChange" -->
                  <span slot="action" slot-scope="text, record">
                    <a @click="twoShowOne(record)">编辑</a>
                  </span>
                </a-table>
              </a-card>
              <a-card :bordered="false" title="法人股东">
                <a-table
                  ref="table"
                  size="default"
                  bordered
                  rowKey="id"
                  :columns="columns2"
                  :dataSource="dataSource"
                  :pagination="ipagination"
                  :loading="loading"
                >
                  <span slot="action" slot-scope="text, record">
                    <a @click="twoShowOne(record)">编辑</a>
                  </span>
                </a-table>
              </a-card>
              <a-card :bordered="false" title="法人股东">
                <a-table
                  ref="table"
                  size="default"
                  bordered
                  rowKey="id"
                  :columns="columns3"
                  :dataSource="dataSource"
                  :pagination="ipagination"
                  :loading="loading"
                >
                  <span slot="action" slot-scope="text, record">
                    <a @click="twoShowOne(record)">编辑</a>
                  </span>
                </a-table>
              </a-card>
              <a-card :bordered="false" title="生产工艺情况">
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="单位产品原材料消耗（吨/吨产品）">
                      <a-input v-decorator="['unitProductMaterialCost']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="生产工艺流程">
                      <a-input v-decorator="['produceFlow']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="安全生产">
                      <a-input v-decorator="['produceSafe']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="技术来源">
                      <!-- technologySource -->
                      <a-select defaultValue="1" style="width:100%">
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="引进" required>
                      <a-select v-decorator="['introduce']" defaultValue="1" style="width:100%">
                        <a-select-option value="1">国内</a-select-option>
                        <a-select-option value="2">国外</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="专利号">
                      <a-input v-decorator="['patentNo']" />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="颁证年月" required>
                      <a-date-picker v-decorator="['issueDate']" style="width:100%" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="品牌名称">
                      <a-input v-decorator="['productName']" />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="颁证单位" required>
                      <a-input v-decorator="['issueAuthority']" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
              <a-card :bordered="false" title="环保、安全、卫生">
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="污染所属类型">
                      <a-select defaultValue="1" style="width:100%">
                        <!-- pollutionType -->
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="{span: 12}">
                    <a-form-item label="废物排放种类">
                      <a-select defaultValue="1" style="width:100%">
                        <!-- wasteDischargeType -->
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="污水管网是否接通">
                      <a-radio-group v-decorator="['isSewerLine']">
                        <a-radio value="1">是</a-radio>
                        <a-radio value="2">否</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="污水管网计划接通时间">
                      <a-date-picker v-decorator="['planSewerLineTime']" style="width:100%" />
                      <!-- <a-input v-decorator="['planSewerLineTime']"></a-input> -->
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="使用锅炉情况">
                      <!-- boilerUse -->
                      <a-select defaultValue="1" style="width:100%">
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="项目与敏感点方位距离（米）">
                      <a-input v-decorator="['projectToPointDistance']"></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="在一年内，环保、安全生产（消防）方面是否发生过重大事件">
                      <a-radio-group v-decorator="['isHappenAccent']">
                        <a-radio value="1">是</a-radio>
                        <a-radio value="2">否</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
              <a-card :bordered="false" title="能源与资源消耗情况（年消耗量）">
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="水（吨）">
                      <a-input v-decorator="['waterConsume']" />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="原煤（吨）">
                      <a-input v-decorator="['coalConsume']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="电（万千瓦时）">
                      <a-input v-decorator="['powerConsume']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="蒸汽（吨）">
                      <a-input v-decorator="['steamConsume']" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-form>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/page/PageLayout'
import JEditor from '@/components/jeecg/JEditor'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import pick from 'lodash.pick'
import moment from 'moment'
import { AddProjectLandForm } from '@/config/pick-fields'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import qs from 'qs'

export default {
  mixins: [JeecgListMixin],
  components: { PageLayout, JEditor },

  data() {
    return {
      title: '首页 / 技改项目/项目维护',
      //   form: {}
      form: this.$form.createForm(this),
      model: {},
      dict: {
        industrySectorValueExt: [{ value: '1' }],
        companyRegisterType: [{ value: '1' }]
      },
      editor: {
        projectTechnologyFlow: ''
      },
      columns1: [
        {
          title: '序号',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '公司名称',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '股权占比',
          align: 'center',
          dataIndex: 'tracker'
        },
        {
          title: '已授权发明专利数',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns2: [
        {
          title: '序号',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '股权占比',
          align: 'center',
          dataIndex: 'tracker'
        },
        {
          title: '学历',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns3: [
        {
          title: '序号',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '职务',
          align: 'center',
          dataIndex: 'tracker'
        },
        {
          title: '出生年月',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.project/mgrProjectInfo/addProject',
        edit: '/park.project/mgrProjectInfo/editProject'
      }
    }
  },
  created() {
    this.detail()
  },
  methods: {
    handleSubmit() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { projectTechnologyFlow } = this.editor
          let httpurl = ''
          let method = ''
          httpurl += this.url.edit
          method = 'put'
          let formData = Object.assign(this.model, values)
          formData.buildingBeginDate = formData.buildingBeginDate
            ? formData.buildingBeginDate.format('YYYY-MM-DD')
            : null
          formData.buildingEndDate = formData.buildingEndDate ? formData.buildingEndDate.format('YYYY-MM-DD') : null
          formData.projectTechnologyFlow = projectTechnologyFlow
          formData = qs.stringify(formData)
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
            })
        }
      })
    },
    detail() {
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
      let params = { projectId: this.$route.params.id }
      console.log(params)
      this.loading = true
      getAction('/park.project/mgrProjectInfo/queryProjectById', params).then(res => {
        if (res.success) {
          let record = res.result
          this.form.resetFields()
          //后端少的内容
          record.totalAsset = record.mgrProjectCust.totalAsset
          record.legalTel = record.mgrProjectCust.legalTel
          record.companyDescription = record.mgrProjectCust.companyDescription
          record.updateUserName = record.mgrProjectCust.updateUserName
          record.createUserName = record.mgrProjectCust.createUserName
          record.updateTime = record.mgrProjectCust.updateTime
          record.fillUnit = record.mgrProjectCust.fillUnit
          record.version = record.mgrProjectCust.version
          record.unitAddress = record.mgrProjectCust.unitAddress
          // record.parkId = record.mgrProjectCust.parkId
          record.companyRegisterType = record.mgrProjectCust.companyRegisterType
          record.createBy = record.mgrProjectCust.createBy
          record.creditCode = record.mgrProjectCust.legalTel
          record.createTime = record.mgrProjectCust.createTime
          record.updateBy = record.mgrProjectCust.updateBy
          record.legalPerson = record.mgrProjectCust.legalPerson
          record.fixedAsset = record.mgrProjectCust.fixedAsset
          record.registerMoney = record.mgrProjectCust.registerMoney
          record.teamMemberDescription = record.mgrProjectCust.teamMemberDescription
          // record.projectId = record.mgrProjectCust.projectId
          record.setUpYear = record.mgrProjectCust.setUpYear
          record.email = record.mgrProjectCust.email

          record.isForeignCapital = record.mgrProjectInvest.isForeignCapital
          record.fixedAssetInvest = record.mgrProjectInvest.fixedAssetInvest
          record.newProfit = record.mgrProjectInvest.newProfit
          record.remark = record.mgrProjectInvest.remark
          record.createUserName = record.mgrProjectInvest.createUserName
          // // record.parkId = record.mgrProjectInvest.parkId
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
          // record.projectId = record.mgrProjectInvest.projectId
          record.device = record.mgrProjectInvest.device
          record.buildingInterest = record.mgrProjectInvest.buildingInterest
          delete record.mgrProjectCust
          delete record.mgrProjectInvest
          delete record.mgrProjectInvestLease

          this.model = Object.assign({}, record)
          this.visible = true
          this.$nextTick(() => {
            this.editor = {
              projectTechnologyFlow: record.projectTechnologyFlow
            }
            this.form.setFieldsValue(pick(this.model, AddProjectLandForm))
            //时间格式化
            this.form.setFieldsValue({
              buildingEndDate: this.model.buildingEndDate ? moment(this.model.buildingEndDate) : null
            })
            this.form.setFieldsValue({
              buildingBeginDate: this.model.buildingBeginDate ? moment(this.model.buildingBeginDate) : null
            })
          })
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
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