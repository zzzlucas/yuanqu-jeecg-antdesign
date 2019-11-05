<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
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
          label="单位名称">
          <a-input placeholder="请输入单位名称" v-decorator="['fillUnit', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织机构代码">
          <a-input placeholder="请输入组织机构代码" v-decorator="['creditCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位地址">
          <a-input placeholder="请输入单位地址" v-decorator="['unitAddress', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成立年份">
          <a-input placeholder="请输入成立年份" v-decorator="['setUpYear', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业登记注册类型">
          <a-input placeholder="请输入企业登记注册类型" v-decorator="['companyRegisterType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="注册资金">
          <a-input-number v-decorator="[ 'registerMoney', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业总资产">
          <a-input-number v-decorator="[ 'totalAsset', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="固定资产净值">
          <a-input-number v-decorator="[ 'fixedAsset', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法定代表人">
          <a-input placeholder="请输入法定代表人" v-decorator="['legalPerson', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人联系电话">
          <a-input placeholder="请输入法人联系电话" v-decorator="['legalTel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电子信箱">
          <a-input placeholder="请输入电子信箱" v-decorator="['email', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司概况">
          <a-input placeholder="请输入公司概况" v-decorator="['companyDescription', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="团队成员情况">
          <a-input placeholder="请输入团队成员情况" v-decorator="['teamMemberDescription', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="园区ID">
          <a-input placeholder="请输入园区ID" v-decorator="['parkId', validatorRules.parkId ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="版本号">
          <a-input-number v-decorator="[ 'version', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建者名称">
          <a-input placeholder="请输入创建者名称" v-decorator="['createUserName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="更新者名称">
          <a-input placeholder="请输入更新者名称" v-decorator="['updateUserName', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "mgrProjectCustModal",
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
          add: "/park.project/mgrProjectInfo/addProject",
          // add: "/park.mgr/mgrProjectCust/add",
          edit: "/park.mgr/mgrProjectCust/edit",
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
          this.form.setFieldsValue(pick(this.model,'projectId','fillUnit','creditCode','unitAddress','setUpYear','companyRegisterType','registerMoney','totalAsset','fixedAsset','legalPerson','legalTel','email','companyDescription','teamMemberDescription','parkId','version','createUserName','updateUserName'))
		  //时间格式化
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

</style>