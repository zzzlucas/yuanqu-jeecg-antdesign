<template>
  <a-drawer
      :title="title"
      :width="800"
      placement="right"
      :closable="false"
      @close="close"
      :visible="visible"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目ID">
          <a-input placeholder="请输入项目ID" v-decorator="['projectId', validatorRules.projectId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目名称">
          <a-input placeholder="请输入项目名称" v-decorator="['projectName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属单位">
          <a-input placeholder="请输入所属单位" v-decorator="['customerName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目类别">
          <a-input placeholder="请输入项目类别" v-decorator="['types', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目总投资">
          <a-input-number v-decorator="[ 'invest', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目进展">
          <a-input placeholder="请输入项目进展" v-decorator="['engineeringProcess', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="立项金额">
          <a-input-number v-decorator="[ 'setUpInvest', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="立项文号">
          <a-input placeholder="请输入立项文号" v-decorator="['setUpSerialNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初步设计批复文号">
          <a-input placeholder="请输入初步设计批复文号" v-decorator="['approveSerialNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="重点项目类别">
          <a-input placeholder="请输入重点项目类别" v-decorator="['projectTypes', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="土地编号">
          <a-input placeholder="请输入土地编号" v-decorator="['serialNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划开工日期">
          <a-date-picker v-decorator="[ 'planStartDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划完工日期">
          <a-date-picker v-decorator="[ 'planEndDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目联系人">
          <a-input placeholder="请输入项目联系人" v-decorator="['manager', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建日期">
          <a-date-picker v-decorator="[ 'createrDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目性质">
          <a-input placeholder="请输入项目性质" v-decorator="['nature', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目状态">
          <a-input placeholder="请输入项目状态" v-decorator="['status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总建筑面积">
          <a-input-number v-decorator="[ 'overGroundArea', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总建筑面积">
          <a-input-number v-decorator="[ 'underGroundArea', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="每层面积">
          <a-input-number v-decorator="[ 'defenceArea', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总用地面积">
          <a-input-number v-decorator="[ 'area', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="层数、层高、承重">
          <a-input-number v-decorator="[ 'floorNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="绿地面积">
          <a-input-number v-decorator="[ 'greenbeltArea', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="容积率">
          <a-input-number v-decorator="[ 'plotRatio', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="绿地率">
          <a-input-number v-decorator="[ 'greeningRate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="总户数">
          <a-input-number v-decorator="[ 'familyNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结构形式">
          <a-input placeholder="请输入结构形式" v-decorator="['structuralStyle', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经纬度">
          <a-input placeholder="请输入经纬度" v-decorator="['longLat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经度">
          <a-input placeholder="请输入经度" v-decorator="['lng', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="纬度">
          <a-input placeholder="请输入纬度" v-decorator="['lat', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="园区ID">
          <a-input placeholder="请输入园区ID" v-decorator="['parkId', validatorRules.parkId ]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "MgrEngineeringInfoDrawer",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        projectId:{rules: [{ required: true, message: '请输入项目ID!' }]},
        parkId:{rules: [{ required: true, message: '请输入园区ID!' }]},
        },
        url: {
          add: "/park.engineering/mgrEngineeringInfo/add",
          edit: "/park.engineering/mgrEngineeringInfo/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'projectId','projectName','customerName','types','invest','engineeringProcess','setUpInvest','setUpSerialNum','approveSerialNum','projectTypes','serialNum','manager','nature','status','overGroundArea','underGroundArea','defenceArea','area','floorNumber','greenbeltArea','plotRatio','greeningRate','familyNum','structuralStyle','longLat','lng','lat','parkId'))
		  //时间格式化
          this.form.setFieldsValue({planStartDate:this.model.planStartDate?moment(this.model.planStartDate):null})
          this.form.setFieldsValue({planEndDate:this.model.planEndDate?moment(this.model.planEndDate):null})
          this.form.setFieldsValue({createrDate:this.model.createrDate?moment(this.model.createrDate):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.planStartDate = formData.planStartDate?formData.planStartDate.format():null;
            formData.planEndDate = formData.planEndDate?formData.planEndDate.format():null;
            formData.createrDate = formData.createrDate?formData.createrDate.format():null;
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>