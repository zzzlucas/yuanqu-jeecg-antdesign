<template>
  <a-drawer
    wrapClassName="cust-manage-showzero-d"
    width="80%"
    :visible="visible"
    @close="handleCancel"
    destroyOnClose
    :title="title"
  >
    <div>
      <a-form class="project-drawer-form" :form="form">
        <a-spin :spinning="confirmLoading">
          <a-row>
            <a-col span="15">
              <a-card class="daily-article" :bordered="false" title="基本信息">
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业名称"
                  >
                    <!-- 99999999 -->
                    <a-input
                      v-decorator="['customerName',{rules: [{ required: true, message: '请输入企业名称', whitespace:true}]}]"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业简称"
                  >
                    <a-input v-decorator="['customerAbbr']"></a-input>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业编号"
                  >
                    <a-input v-decorator="['customerNo']"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="法人"
                  >
                    <a-input v-decorator="['legalPerson']"></a-input>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="单位电话"
                  >
                    <a-input v-decorator="['telephone']"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="招商人员"
                  >
                    <a-select v-decorator="['merchantManager']" placeholder>
                      <a-select-option
                        v-for="(item, key) in dict.merchantManagerExt"
                        :value="item.value"
                        :key="key"
                      >{{ item.text }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="服务人员"
                  >
                    <a-select v-decorator="['servicer']" placeholder>
                      <a-select-option
                        v-for="(item, key) in dict.servicerExt"
                        :value="item.value"
                        :key="key"
                      >{{ item.text }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="引进日期"
                  >
                    <a-date-picker placeholder style="width:100%" v-decorator="[ 'merchantDate']" />
                  </a-form-item>
                </a-col>
                <!-- 五行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="入驻日期"
                  >
                    <a-date-picker placeholder style="width:100%" v-decorator="[ 'settledDate']" />
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属园区"
                  >
                    <a-select
                      style="width:100%"
                      v-decorator="['parkId',{rules: [{ required: true, message: '请输入', whitespace:true}]}]"
                      @change="getBlockList"
                    >
                      <a-select-option
                        v-for="item in info.parkList"
                        :value="item.parkId"
                      >{{item.parkName}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- 六行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属项目"
                  >
                    <a-select
                      style="width:100%"
                      v-decorator="['caseId',{rules: [{ required: true, message: '请输入', whitespace:true}]}]"
                      @change="getBuildingList"
                    >
                      <a-select-option
                        v-for="item in info.BlockList"
                        :value="item.buildingProjectId"
                      >{{item.projectName}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属楼宇"
                  >
                    <a-select style="width:100%" v-decorator="['buidling']">
                      <a-select-option
                        v-for="item in info.BuildingList"
                        :value="item.buildingId"
                      >{{item.buildingName}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="邮箱"
                  >
                    <a-input v-decorator="['email']"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="网址"
                  >
                    <a-input v-decorator="['website']"></a-input>
                  </a-form-item>
                </a-col>

                <a-row>
                  <a-col>
                    <a-form-item
                      :labelCol="labelCol.long"
                      :wrapperCol="wrapperCol.long"
                      label="关联客户"
                    >
                      <a-select style="width:100%" mode="multiple" v-model="CUSTOMERNAMEARRAY">
                        <a-select-option
                          v-for="item in info.CustList"
                          :value="item.id"
                        >{{item.realname}}</a-select-option>
                      </a-select>
                    </a-form-item>

                    <a-form-item
                      :labelCol="labelCol.long"
                      :wrapperCol="wrapperCol.long"
                      label="企业简介"
                    >
                      <a-textarea :rows="4" placeholder v-decorator="['content', {}]"></a-textarea>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>

            <a-col span="9">
              <a-card class="daily-article" :bordered="false" title="企业标识">
                <!-- <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" /> -->
                <!-- :options="plainOptions"   摘出 -->
                <a-checkbox-group v-model="checkedList" @change="onChange"></a-checkbox-group>
                <a-row>
                  <a-col :span="24">
                    <a-radio-group v-model="BS.A">
                      <a-radio value="1">挂靠企业</a-radio>
                      <a-radio value="2">实地入驻企业</a-radio>
                    </a-radio-group>
                    <a-radio-group v-model="BS.B">
                      <a-radio value="1">内资</a-radio>
                      <a-radio value="2">外资</a-radio>
                    </a-radio-group>
                    <a-checkbox-group v-model="BS.C">
                      <a-checkbox value="1">园区合作企业</a-checkbox>
                      <a-checkbox value="2">中介服务企业</a-checkbox>
                      <a-checkbox value="3">大学生企业</a-checkbox>
                      <a-checkbox value="4">留学人员企业</a-checkbox>
                      <a-checkbox value="5">大学教师创业</a-checkbox>
                    </a-checkbox-group>
                    <a-radio-group v-model="BS.D">
                      <a-radio value="1">一般纳税人</a-radio>
                      <a-radio value="2">小规模纳税人</a-radio>
                    </a-radio-group>
                    <a-checkbox-group v-model="BS.E">
                      <a-checkbox value="1">高新技术企业</a-checkbox>
                    </a-checkbox-group>
                    <a-checkbox-group v-model="BS.F">
                      <a-checkbox value="1">与创业导师建立辅导关系</a-checkbox>
                    </a-checkbox-group>
                    <a-checkbox-group v-model="BS.G">
                      <a-checkbox value="1">毕业企业</a-checkbox>
                    </a-checkbox-group>
                    <a-radio-group v-model="BS.H">
                      <a-radio value="1">在园企业</a-radio>
                      <a-radio value="2">在孵企业</a-radio>
                    </a-radio-group>
                    <a-radio-group v-model="BS.I">
                      <a-radio value="1">龙头企业</a-radio>
                      <a-radio value="2">明星企业</a-radio>
                    </a-radio-group>
                    <a-radio-group v-model="BS.J">
                      <a-radio value="1">税收落户</a-radio>
                      <a-radio value="2">税收未落户</a-radio>
                    </a-radio-group>
                    <a-checkbox-group v-model="BS.K">
                      <a-checkbox value="1">上市企业</a-checkbox>
                    </a-checkbox-group>
                  </a-col>
                </a-row>
              </a-card>
              <a-card class="daily-article" :bordered="false" title="附件">
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label>
                  <j-upload :text="UPA.text" v-decorator="['businessLicense']" />
                </a-form-item>
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label>
                  <j-upload :text="UPB.text" v-decorator="['addDocFiles']" />
                </a-form-item>
              </a-card>
            </a-col>
          </a-row>
          <a-card class="daily-article" :bordered="false" title="分类信息">
            <a-row>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="公司性质"
                >
                  <a-select v-decorator="['unitNature']" placeholder>
                    <a-select-option
                      v-for="(item, key) in dict.unitNatureExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="行业类型"
                >
                  <!-- 9999999999999999999999 -->
                  <a-select
                    v-decorator="['industryCategory',{rules: [{ required: true, message: '请选择行业类型', whitespace:true}]}]"
                    placeholder
                  >
                    <a-select-option
                      v-for="(item, key) in dict.industryCategoryExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="公司类型"
                >
                  <a-select v-decorator="['organizational']" placeholder>
                    <a-select-option
                      v-for="(item, key) in dict.organizationalExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="技术领域"
                >
                  <a-select v-decorator="['technicalField']" placeholder>
                    <a-select-option
                      v-for="(item, key) in dict.technicalFieldExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="企业评级"
                >
                  <a-select v-decorator="['enterpriseRating']" placeholder>
                    <a-select-option
                      v-for="(item, key) in dict.enterpriseRatingExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册类型"
                >
                  <a-select v-decorator="['registrationType']" placeholder>
                    <a-select-option
                      v-for="(item, key) in dict.registrationTypeExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card class="daily-article" :bordered="false" title="工商/税务信息">
            <a-row>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册日期"
                >
                  <a-date-picker placeholder style="width:100%" v-decorator="[ 'registDate']" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册资本"
                >
                  <a-input v-decorator="[ 'registeredCapital']">
                    <a-select
                      slot="addonAfter"
                      style="width: 100px;"
                      v-decorator="['registeredCapitalUnit', {initialValue:dict.registeredCapitalUnitExt[0].value}]"
                    >
                      <a-select-option
                        v-for="(item, key) in dict.registeredCapitalUnitExt"
                        :value="item.value"
                        :key="key"
                      >{{ item.text }}</a-select-option>
                    </a-select>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="转化为人民币"
                >
                  <a-input addonAfter="万元" v-decorator="[ 'rCToRMB']" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="工商状态"
                >
                  <a-select style="width: 100%;" v-decorator="['bussinessStatus']">
                    <a-select-option
                      v-for="(item, key) in dict.bussinessStatus"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="税务状态"
                >
                  <a-select style="width: 100%;" v-decorator="['taxStatus']">
                    <a-select-option
                      v-for="(item, key) in dict.taxStatus"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="统一社会信用号码"
                >
                  <!-- 99999999999999 -->
                  <a-input
                    v-decorator="[ 'creditCode',{rules: [{ required: true, message: '请输入统一社会信用号码', whitespace:true}]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col span="16">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册地址"
                >
                  <a-input v-decorator="[ 'registerAddress']" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册地邮编"
                >
                  <a-input v-decorator="[ 'registerAddressZipCode']" />
                </a-form-item>
              </a-col>
              <a-col span="16">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="经营地址"
                >
                  <a-input v-decorator="[ 'businessAddress']" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="经营地邮编"
                >
                  <a-input v-decorator="[ 'businessAddressZipCode']" />
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item :labelCol="labelCol.whole" :wrapperCol="wrapperCol.whole" label="经营范围">
                  <a-textarea :rows="4" v-decorator="['businessScope', {}]"></a-textarea>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item
                  :labelCol="labelCol.whole"
                  :wrapperCol="wrapperCol.whole"
                  label="特许经营范围"
                >
                  <a-textarea :rows="4" v-decorator="['businessScopePermit', {}]"></a-textarea>
                </a-form-item>
              </a-col>
              <a-col span="24"></a-col>
            </a-row>
          </a-card>
        </a-spin>
      </a-form>
    </div>
    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="handleOk">保存</a-button>
    </div>
  </a-drawer>
</template>

<script>
import qs from 'qs'
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { AddbaseCustomerForm } from '@/config/pick-fields'
import JUpload from '@/components/jeecg/JUpload'
import { getAction } from '../../../api/manage'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: { JUpload },
  //1111111111111111111111
  props: {
    show: {
      type: Boolean,
      default: false
    }
    // headers:
  },
  model: {
    prop: 'show',
    event: 'close'
  },
  visible: false,
  //11111111111111111111112
  data() {
    return {
      visible: false,
      model: {},
      checkedList: [],
      //jupload组件
      UPA: {
        text: '营业执照'
        // fileType: 'image'
      },
      UPB: {
        text: '其他附件'
      },
      labelCol: {
        long: {
          span: 4
        },
        default: {
          span: 6
        },
        whole: {
          span: 6
        }
      },
      wrapperCol: {
        long: {
          span: 20
        },
        default: {
          span: 18
        },
        whole: {
          span: 18
        }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        recordId: { rules: [{ required: true, message: '请输入记录ID!' }] },
        parkId: { rules: [{ required: true, message: '请输入园区ID!' }] }
      },
      url: {
        add: '/park.customer/baseCustomer/add',
        edit: '/park.customer/baseCustomer/edit'
      },
      editBool: false,
      merchantManager: '',
      //企业标识 大对象
      BS: {},
      info: {},
      CUSTOMERNAMEARRAY: [],
      dict: {
        merchantManagerExt: [{ value: '' }],
        servicerExt: [{ value: '' }],
        unitNatureExt: [{ value: '' }],
        industryCategoryExt: [{ value: '' }],
        organizationalExt: [{ value: '' }],
        technicalFieldExt: [{ value: '' }],
        enterpriseRatingExt: [{ value: '' }],
        registrationTypeExt: [{ value: '' }],
        registeredCapitalUnitExt: [{ value: '' }]
      }
    }
  },
  computed: {
    title() {
      return '企业信息' + (this.editBool ? '修改' : '登记')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {
    //需要一个地方来自主加载区块（项目）选项和楼宇选项，以至于下拉框能够根据id匹配出具体名称
    //这个地方该在哪呢，获得园区id的地方:detail()
    getAction('/park.park/basePark/list').then(res => {
      if (res.success) {
        // console.log(res)
        this.info.parkList = res.result.records
      } else {
        console.log('获取园区列表失败')
      }
    })
    getAction('/sys/user/list').then(res => {
      if (res.success) {
        // console.log(res)
        this.info.CustList = res.result.records
      } else {
        console.log('获取关联客户范围列表失败')
      }
    })
    //字典初始化
    initDictOptions('attract_staff').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.merchantManagerExt = res.result
      }
    })
    initDictOptions('service_staff').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.servicerExt = res.result
      }
    })
    initDictOptions('unit_nature').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.unitNatureExt = res.result
      }
    })
    initDictOptions('industry_gategory').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industryCategoryExt = res.result
      }
    })
    initDictOptions('organizational').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.organizationalExt = res.result
      }
    })
    initDictOptions('technical_field').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.technicalFieldExt = res.result
      }
    })
    initDictOptions('enterprise_rating').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.enterpriseRatingExt = res.result
      }
    })
    initDictOptions('registration_type').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.registrationTypeExt = res.result
      }
    })
    initDictOptions('registered_capital_unit').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.registeredCapitalUnitExt = res.result
      }
    })
    initDictOptions('bussiness_status').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.bussinessStatus = res.result
      }
    })
    initDictOptions('tax_status').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.taxStatus = res.result
      }
    })
  },
  methods: {
    getBlockList(e) {
      this.confirmLoading = true
      getAction('/park.architecture/baseArchitectureProject/queryByParkId', { parkId: e }).then(res => {
        if (res.success) {
          this.info.BlockList = res.result
          //此处重新往表单填入一下值  确实空值即可刷新
          this.$nextTick(() => {
            this.form.setFieldsValue()
            this.confirmLoading = false
          })
        } else {
          console.log('获取区块列表失败')
        }
      })
    },
    getBuildingList(e) {
      this.confirmLoading = true
      getAction('/park.architecture/baseArchitectureBuilding/queryBuildingList', { buildingProjectId: e }).then(res => {
        if (res.success) {
          this.info.BuildingList = res.result
          // console.log(this.info.BuildingList)
          //此处重新往表单填入一下值  确实空值即可刷新
          this.$nextTick(() => {
            this.form.setFieldsValue()
            this.confirmLoading = false
          })
        } else {
          console.log('获取楼宇列表失败')
        }
      })
    },
    plainOptions() {},
    showDrawer() {
      this.visible = true
    },
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
    },
    add() {
      this.editBool = false
      this.visible = true
    },
    //新页面 详情 打开的，咋传，考虑一哈
    detail() {
      this.editBool = true
      let record = {}
      getAction('/park.customer/baseCustomer/queryById', { id: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          record = res.result
          this.form.resetFields()
          if (record.baseCustomerType) {
            record.unitNature = record.baseCustomerType.unitNature
            record.industryCategory = record.baseCustomerType.industryCategory
            record.organizational = record.baseCustomerType.organizational
            record.technicalField = record.baseCustomerType.technicalField
            record.enterpriseRating = record.baseCustomerType.enterpriseRating
            record.registrationType = record.baseCustomerType.registrationType
          }
          if (record.baseCustomerBusiness) {
            record.registDate = record.baseCustomerBusiness.registDate
            record.registeredCapital = record.baseCustomerBusiness.registeredCapital
            record.registeredCapitalUnit = record.baseCustomerBusiness.registeredCapitalUnit
            record.bussinessStatus = record.baseCustomerBusiness.bussinessStatus
            record.taxStatus = record.baseCustomerBusiness.taxStatus
            record.creditCode = record.baseCustomerBusiness.creditCode
            record.registerAddress = record.baseCustomerBusiness.registerAddress
            record.registerAddressZipCode = record.baseCustomerBusiness.registerAddressZipCode
            record.businessAddress = record.baseCustomerBusiness.businessAddress
            record.businessAddressZipCode = record.baseCustomerBusiness.businessAddressZipCode
            record.businessScope = record.baseCustomerBusiness.businessScope
            record.businessScopePermit = record.baseCustomerBusiness.businessScopePermit
            record.rCToRMB = record.baseCustomerBusiness.rCToRMB
          }
          //浏览器编辑请求里多余的东西来自record，把record里的对象遍历出来删掉
          delete record.baseCustomerBusiness
          delete record.baseCustomerType
          delete record.longLat
          // let Rrecord = {}
          // for (const item in record) {
          //   if (item != baseCustomerType && item != baseCustomerBusiness) {
          //     Rrecord.push(item)
          //   }
          // }
          this.model = Object.assign({}, record)

          this.BS = this.model.customerLabel
          this.BS = JSON.parse(this.BS)

          //这里本来是不是可以用promise作回调处理，只是我还不会用
          //目的是 根据获取到的id，让三级联动不需要从上到下联动
          this.getBlockList(this.model.parkId)
          this.getBuildingList(this.model.caseId)

          //此处要跟根据单个id去查出 ids ，那个ids才是能填入表单的玩意
          //此处要获取对应name，且能够有效再次编辑提交，不应使用现成字段name，此处容易被误导
          //其实直接返回labeldic更好用，后端画蛇添足了
          //区别不大，上面的问题其实上周五已解决，现在的问题应该是在获得数据之前，选择项初始化未完成，所以是本质上是时序问题吗
          //不是，应当是关键字段没对应上，后端把问题复杂化了
          //尝试在复杂化的背景下还原正确字段
          //字段也没错，就是不该用recordId
          getAction('/park.middletables/pubLabelGroup/queryById', { id: this.model.relCustListId }).then(res => {
            if (res.success) {
              console.log(res.result)
              for (const item of res.result) {
                this.CUSTOMERNAMEARRAY.push(item.labelNo)
              }
              console.log(this.CUSTOMERNAMEARRAY)
              this.$nextTick(() => {
                this.form.setFieldsValue()
              })
            }
          })
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, AddbaseCustomerForm))
            this.form.setFieldsValue({ merchantDate: this.model.merchantDate ? moment(this.model.merchantDate) : null })
            this.form.setFieldsValue({ settledDate: this.model.settledDate ? moment(this.model.settledDate) : null })
            this.form.setFieldsValue({ registDate: this.model.registDate ? moment(this.model.registDate) : null })
          })
        }
      })
      // this.record = record
      // console.log(record)
    },
    // handleImportExcel() {},
    // importExcelUrl() {},
    // tokenHeader() {},
    close() {
      this.$emit('close')
      this.visible = false
      this.CUSTOMERNAMEARRAY = []
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.customerName) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          if (formData.merchantDate)
            formData.merchantDate = formData.merchantDate ? formData.merchantDate.format('YYYY-MM-DD') : null
          if (formData.registDate)
            formData.registDate = formData.registDate ? formData.registDate.format('YYYY-MM-DD') : null
          if (formData.settledDate)
            formData.settledDate = formData.settledDate ? formData.settledDate.format('YYYY-MM-DD') : null

          //转化企业标识的BS对象为Json字符串
          // for(const item in this.BS){
          //   if(typeof item == Array){
          //     item = item.toString()
          //   }
          // }

          //考虑一种更优美健壮的写法，在无此项值的情况下返回默认值null ？
          if (this.BS) {
            this.BS = JSON.stringify(this.BS)
            formData.customerLabel = this.BS
          }
          console.log(this.BS)
          //考虑一种更优美健壮的写法，在无此项值的情况下返回默认值null ？  我也是-，-
          //关联客户的实际id
          if (this.CUSTOMERNAMEARRAY) {
            formData.labelDic = this.CUSTOMERNAMEARRAY.toString()
            // formData.labelDic = formData.labelDic.toString()
          }
          formData.parkId = this.industrialParkId
          formData = qs.stringify(formData)
          // console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('reload')
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

<style lang="less">
.daily-article {
  margin-bottom: 10px;
  margin-right: 10px;
}
.cust-manage-showzero-d {
  /** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 0px;
    // float: right;
  }

  .project-drawer-form {
    @width: 180px;
    .ant-form-item-label {
      width: @width;
    }

    .ant-form-item-control-wrapper {
      width: calc(~'100% - @{width}');
    }
    .ant-col-12 {
      z-index: 10;
    }
  }
}
</style>