<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目ID">
          <a-input placeholder="请输入项目ID" v-decorator="['projectId', validatorRules.projectId ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="建设项目名称">
          <a-input placeholder="请输入建设项目名称" v-decorator="['projectName', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目类型">
          <a-input placeholder="请输入项目类型" v-decorator="['projectType', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经办人">
          <a-input placeholder="请输入经办人" v-decorator="['agentPerson', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经办人联系电话">
          <a-input placeholder="请输入经办人联系电话" v-decorator="['agentTel', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属主体">
          <a-input placeholder="请输入所属主体" v-decorator="['belongSubject', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="投资主体">
          <a-input placeholder="请输入投资主体" v-decorator="['investorValue', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业ID">
          <a-input placeholder="请输入企业ID" v-decorator="['custId', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="拟建设地址">
          <a-input placeholder="请输入拟建设地址" v-decorator="['getLandBuildingAddress', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主要建设内容及规模">
          <a-input placeholder="请输入主要建设内容及规模" v-decorator="['mainBuildingContent', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="亩均效绩介">
          <a-input placeholder="请输入亩均效绩介" v-decorator="['areaPerformance', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主要原料">
          <a-input placeholder="请输入主要原料" v-decorator="['mainMaterial', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="消耗量">
          <a-input-number v-decorator="[ 'materialCost', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主要产品">
          <a-input placeholder="请输入主要产品" v-decorator="['mainProduct', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="产出量">
          <a-input-number v-decorator="[ 'productOutput', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="水、电等配套情况">
          <a-input placeholder="请输入水、电等配套情况" v-decorator="['waterElec', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="环保、消防等措施">
          <a-input placeholder="请输入环保、消防等措施" v-decorator="['greenFire', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总用地面积">
          <a-input-number v-decorator="[ 'allUseArea', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="新征用地面积">
          <a-input-number v-decorator="[ 'newUseArea', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="租赁建设面积">
          <a-input-number v-decorator="[ 'rentBuildArea', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属行业">
          <a-input placeholder="请输入所属行业" v-decorator="['industrySectorValue', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="建设年限起">
          <a-date-picker v-decorator="[ 'buildingBeginDate', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="建设年限止">
          <a-date-picker v-decorator="[ 'buildingEndDate', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否人才项目">
          <a-input placeholder="请输入是否人才项目" v-decorator="['isTalentProject', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="拿地面积">
          <a-input-number v-decorator="[ 'gainArea', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年产值">
          <a-input-number v-decorator="[ 'annualProductionValue', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年税金">
          <a-input-number v-decorator="[ 'annualTaxes', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目状态">
          <a-input placeholder="请输入项目状态" v-decorator="['status', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目申请理由简述">
          <a-input placeholder="请输入项目申请理由简述" v-decorator="['applyReason', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目工艺流程及说明">
          <a-input placeholder="请输入项目工艺流程及说明" v-decorator="['projectTechnologyFlow', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="重要程度">
          <a-input placeholder="请输入重要程度" v-decorator="['importance', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="跟踪人员">
          <a-input placeholder="请输入跟踪人员" v-decorator="['projectManager', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="审核状态">
          <a-input placeholder="请输入审核状态" v-decorator="['auditStatus', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="园区ID">
          <a-input placeholder="请输入园区ID" v-decorator="['parkId', validatorRules.parkId ]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="版本号">
          <a-input-number v-decorator="[ 'version', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="创建者名称">
          <a-input placeholder="请输入创建者名称" v-decorator="['createUserName', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="更新者名称">
          <a-input placeholder="请输入更新者名称" v-decorator="['updateUserName', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'

export default {
  name: 'mgrProjectInfoModal',
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        projectId: { rules: [{ required: true, message: '请输入项目ID!' }] },
        parkId: { rules: [{ required: true, message: '请输入园区ID!' }] }
      },
      url: {
        add: '/park.project/mgrProjectInfo/addProject',
        edit: '/park.mgr/mgrProjectInfo/edit'
      }
    }
  },
  created() {},
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
            'projectName',
            'projectType',
            'agentPerson',
            'agentTel',
            'belongSubject',
            'investorValue',
            'custId',
            'getLandBuildingAddress',
            'mainBuildingContent',
            'areaPerformance',
            'mainMaterial',
            'materialCost',
            'mainProduct',
            'productOutput',
            'waterElec',
            'greenFire',
            'allUseArea',
            'newUseArea',
            'rentBuildArea',
            'industrySectorValue',
            'isTalentProject',
            'gainArea',
            'annualProductionValue',
            'annualTaxes',
            'status',
            'applyReason',
            'projectTechnologyFlow',
            'importance',
            'projectManager',
            'auditStatus',
            'parkId',
            'version',
            'createUserName',
            'updateUserName'
          )
        )
        //时间格式化
        this.form.setFieldsValue({
          buildingBeginDate: this.model.buildingBeginDate ? moment(this.model.buildingBeginDate) : null
        })
        this.form.setFieldsValue({
          buildingEndDate: this.model.buildingEndDate ? moment(this.model.buildingEndDate) : null
        })
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
          formData.buildingBeginDate = formData.buildingBeginDate ? formData.buildingBeginDate.format() : null
          formData.buildingEndDate = formData.buildingEndDate ? formData.buildingEndDate.format() : null

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

<style lang="less" scoped>
</style>