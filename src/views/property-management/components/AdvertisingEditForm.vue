<template>
  <a-drawer
    class="form-edit-drawer"
    :title="getTitle"
    width="65%"
    closable
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer">
    <a-form
      class="form-edit-drawer-form"
      layout="horizontal"
      :form="form"
      :label-col="gridOptions.formItem.label"
      :wrapper-col="gridOptions.formItem.value"
      @submit="submit">
      <a-row>
        <a-col :xl="24">
          <a-form-item label="广告位名称" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-input v-decorator="['advertName', {rules: rules.advertName}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <!-- TODO -->
          <a-form-item label="所属建筑项目">
            <a-input v-decorator="['projectId', {rules: rules.projectId}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <!-- TODO -->
          <a-form-item label="所属楼宇">
            <a-input v-decorator="['buildingId']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <!-- TODO -->
          <a-form-item label="所属楼层">
            <a-input v-decorator="['floorId', {rules: rules.floorId}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="地理位置">
            <a-input v-decorator="['address']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="联系人">
            <a-input v-decorator="['contactPerson', {rules: rules.contactPerson}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="联系电话">
            <a-input v-decorator="['contactTel', {rules: rules.contactTel}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="是否收费" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-switch v-model="isCharge"></a-switch>
          </a-form-item>
        </a-col>
        <a-col :xl="12" v-if="isCharge">
          <a-form-item label="标准单价">
            <a-input v-decorator="['price']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12" v-if="isCharge">
          <a-form-item label="收费单位">
            <a-input v-decorator="['unit']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="预定须知" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remarks']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24" >
          <a-form-item label="广告位详情" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['summary']" :rows="6" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="action-row" type="flex" justify="end">
        <a-col :xl="2">
          <a-form-item style="float: right">
            <a-button @click="closeDrawer">
              取消
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :xl="2">
          <a-form-item style="float: right">
            <a-button type="primary" html-type="submit">
              确认
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script>
  import JDate from '@/components/jeecg/JDate'
  import JEditor from '@/components/jeecg/JEditor'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import { filterObj, promiseForm } from '@utils/util'
  import { advertisingEditForm } from '@/config/pick-fields'
  import { addPlace, editPlace } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('advertising-edit'),
    ],
    components: {
      JEditor,
      JDate,
    },
    data() {
      return {
        // Form
        fields: advertisingEditForm,
        isCharge: false,
        // Rules
        rules: {
          advertName: [
            { required: true, message: '请输入广告位名称' }
          ],
          projectId: [
            { required: true, message: '请选择所属建筑项目' }
          ],
          buildingId: [
            { required: true, message: '请选择所属楼宇' }
          ],
          floorId: [
            { required: true, message: '请选择所属楼层' }
          ],
          contactPerson: [
            { required: true, message: '请输入联系人' }
          ],
          contactTel: [
            { required: true, message: '请输入联系电话' }
          ],
        },
      }
    },
    methods: {
      async submit(ev) {
        ev.preventDefault();
        const data = await promiseForm(this.form)
        try {
          filterObj(data)
          data.parkId = this.industrialParkId
          let resp
          if (this.isEdit) {
            data.advertId = this.record.advertId
            resp = await editPlace(data)
          } else {
            resp = await addPlace(data)
          }
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('操作成功')
          this.closeDrawer()
          this.$emit('submit')
        } catch (e) {
          this.$message.error(e.message)
        }
      },
    },
    watch: {
      show(val) {
        if (!val) {
          return
        }
      },
      isCharge(val) {
        if (val === false) {
          this.form.setFieldsValue('price', '')
          this.form.setFieldsValue('unit', '')
        }
      }
    },
  }
</script>
