<template>
  <div>
    <page-layout :title="title">
      <a-divider type="vertical" />
      <a-form @submit="handleSubmit" :form="form">
        <!-- 11111111111111 -->
        <a-card :bordered="false" style="width:1200px;margin:auto" title="企业信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目单位" required>
                <a-input
                  placeholder
                  v-decorator="['fillUnit',{rules: [{ required: true, message: '请输入单位名称', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="组织机构代码" required>
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
              <a-form-item label="单位地址" required>
                <a-input
                  placeholder
                  v-decorator="['unitAddress',{rules: [{ required: true, message: '请输入单位地址', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <!-- 成立年份！！！！！！！！！！！！！没有v-decorator -->
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="成立年份" required>
                <a-date-picker v-model="setUpYear" style="width:100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行3 -->
          <a-row class="form-row" :gutter="16">
            <!-- 企业登记注册类型!!!!!!!!!!! 没有v-decorator-->
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="企业登记注册类型" required>
                <a-select defaultValue="1" style="width:100%" v-model="companyRegisterType">
                  <a-select-option value="1">股份合作企业</a-select-option>
                  <a-select-option value="2">联营企业</a-select-option>
                  <a-select-option value="3">有限责任公司</a-select-option>
                  <a-select-option value="4">股份有限公司</a-select-option>
                  <a-select-option value="5">私营企业</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="注册资金（万元）" required>
                <a-input
                  placeholder
                  v-decorator="['registerMoney',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行4 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="企业总资产（万元）" required>
                <a-input
                  placeholder
                  v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="固定资产净值（万元）" required>
                <a-input
                  placeholder
                  v-decorator="['fixedAsset',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行5 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="法定代表人">
                <a-input
                  placeholder
                  v-decorator="['legalPerson',{rules: [{ required: true, message: '请输入法人姓名', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="联系电话（法人">
                <a-input
                  placeholder
                  v-decorator="['legalTel',{rules: [{ required: true, message: '请输入法人电话', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行6 -->
          <!-- 无内鬼 -->
          <!-- <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="经办人" required>
                <a-input
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="联系电话（经办人）" required>
                <a-input
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入经办人电话', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>-->
          <!-- 行7 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="电子信箱">
                <a-input
                  placeholder
                  v-decorator="['email',{rules: [{ required: true, message: '请输入电子信箱', whitespace: true}]}]"
                />
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
          <!-- <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="年产值（万元）">
                <a-input
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="年税金（万元）">
                <a-input
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>-->

          <!-- <a-form-item v-if="showSubmit">
            <a-button htmlType="submit">Submit</a-button>
          </a-form-item>-->
        </a-card>

        <!-- 22222222 -->
        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设项目名称" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入项目名称', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="拟建设地址" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入拟建设地址', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要建设内容及规模（生产能力）" required>
                <a-textarea :rows="4"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="亩均效绩介（A类、B类、C类、D类）" required>
                <a-textarea :rows="4"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <!--进度 1.5 / 4-->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要原料">
                <a-input
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入原料', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="消耗量或产出量">
                <a-input
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入数量', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要产品">
                <a-input
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入产品', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="消耗量或产出量">
                <a-input
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入数量', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="所属行业" required>
                <a-select defaultValue="1" style="width:100%">
                  <a-select-option value="1">股份合作企业</a-select-option>
                  <a-select-option value="2">联营企业</a-select-option>
                  <a-select-option value="3">有限责任公司</a-select-option>
                  <a-select-option value="4">股份有限公司</a-select-option>
                  <a-select-option value="5">私营企业</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设开始时间" required>
                <a-date-picker style="width:100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设结束时间" required>
                <a-date-picker style="width:100%" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否人才项目">
                <a-radio-group v-model="Rvalue">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <!-- 333333333333 -->
        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目投资">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目总投资（万元）" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="其中项目用汇（万美元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="注册资本（万元）" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否外资">
                <a-radio-group v-model="Rvalue">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="固定资产投资（万元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="土建">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="安装">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="设备">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="工程建设其他费用">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="预备费">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设期利息">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="铺底流动资金">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="自有资金">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="股票/债券">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="银行贷款">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="其他">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增销售收入（万元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增利润（万元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增税金（万元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="创汇（万美元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'addProjectLandForm.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目申请理由简述">
                <a-textarea :rows="4"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-form-item>
          <a-button type="primary" html-type="submit">Test Submit</a-button>
        </a-form-item>
      </a-form>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/page/PageLayout'
import JEditor from '@/components/jeecg/JEditor'

import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
export default {
  name: 'addProjectLandForm',
  components: { PageLayout, JEditor },
  data() {
    return {
      title: '首页 / 技改项目 / 项目维护',
      //   form: {}
      form: this.$form.createForm(this, { name: 'addProjectLandForm' }),
      formItem: {
        label: { span: 6 },
        value: { span: 18 }
      },
      url: {
        // list: '/park.project/mgrProjectInfo/addProject',
        add: '/park.project/mgrProjectInfo/addProject'
      }
    }
  },
  created() {},
  // methods: {
  //   handleSubmit() {
  //     this.form.validateFieldsAndScroll(this.onSubmit.bind(this)) //MM
  //   },
  //   onSubmit(err) {
  //     if (err === null) {
  //     }
  //   }
  // },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'projectId',
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
            'parkId',
            'version',
            'createUserName',
            'updateUserName'
          )
        )
        //时间格式化
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化

          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
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