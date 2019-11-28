<template>
  <a-drawer
    wrapClassName="meeting-room-edit"
    width="65%"
    closable
    :title="getTitle"
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
          <a-form-item label="会议室名称" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-input v-decorator="['roomName', {rules: rules.roomName}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="占地面积">
            <a-input v-decorator="['chargingArea', {rules: rules.chargingArea}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="容纳人数">
            <a-input v-decorator="['maxCapacity', {rules: rules.maxCapacity}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="所属厂房">
            <a-select style="width: 100%;" v-decorator="['projectId', {rules: rules.projectId}]" @change="getBuildings(form.getFieldValue('projectId'))">
              <a-select-option
                :value="item.buildingProjectId"
                v-for="item in types.project"
                :key="item.buildingProjectId">
                {{ item.projectName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="所属楼宇">
            <a-select style="width: 100%;" v-decorator="['buildingId', {rules: rules.buildingId}]" @change="getFloors(form.getFieldValue('buildingId'))">
              <a-select-option
                :value="item.buildingProjectId"
                v-for="item in types.building"
                :key="item.buildingProjectId">
                {{ item.projectName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="所属楼层">
            <a-select style="width: 100%;" v-decorator="['floorId', {rules: rules.floorId}]">
              <a-select-option
                :value="item.buildingProjectId"
                v-for="item in types.floor"
                :key="item.buildingProjectId">
                {{ item.projectName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="地理位置">
            <a-input v-decorator="['address']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="联系人">
            <a-input v-decorator="['contactPerson']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="联系电话">
            <a-input v-decorator="['contactTel']"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="是否收费" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-switch v-model="isCharge"></a-switch>
          </a-form-item>
        </a-col>
        <a-col :xl="24" v-if="isCharge">
          <a-row>
            <a-col :xl="12">
              <a-form-item label="标准单价">
                <j-date :trigger-change="true" v-decorator="['price']" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :xl="12" >
              <a-form-item class="form-item-label-align" label="—" :colon="false">
                <j-date :trigger-change="true" v-decorator="['price2']" style="width: 100%;" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xl="24">
          <a-row>
            <a-col :xl="12">
              <a-form-item label="开放时间">
                <j-date :trigger-change="true" v-decorator="['begTime']" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :xl="12" >
              <a-form-item class="form-item-label-align" label="—" :colon="false">
                <j-date :trigger-change="true" v-decorator="['endTime']" style="width: 100%;" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="提供设备" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <j-multi-select-tag
              v-decorator="['deviceGroupId']"
              dict-code="order_status">
            </j-multi-select-tag>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="预定须知" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remarks']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24" >
          <a-form-item label="会议室详情" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
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
  import JUpload from '@/components/jeecg/JUpload'
  import JMultiSelectTag from '@comp/dict/JMultiSelectTag'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import Mixin from '../mixin'
  import { filterObj, promiseForm } from '@utils/util'
  import { assetsRegisterEditForm } from '@/config/pick-fields'
  import { addMeetingRoom, editMeetingRoom, listBuilding, listFloor, listProject } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('meeting-room-edit'),
      Mixin,
    ],
    components: {
      JDate,
      JUpload,
      JMultiSelectTag,
    },
    data() {
      return {
        // Form
        fields: assetsRegisterEditForm,
        isCharge: false,
        // Rules
        rules: {
          roomName: [
            { required: true, message: '请填写会议室名称' },
          ],
          chargingArea: [
            { required: true, message: '请填写占地面积' },
          ],
          maxCapacity: [
            { required: true, message: '请填写容纳人数' },
          ],
          projectId: [
            { required: true, message: '请填写选择厂房' },
          ],
          buildingId: [
            { required: true, message: '请填写选择楼宇' },
          ],
          floorId: [
            { required: true, message: '请选择所属楼层' },
          ],
          address: [
            { required: true, message: '请填写地理位置' },
          ],
          contactPerson: [
            { required: true, message: '请填写联系人' },
          ],
          contactTel: [
            { required: true, message: '请填写联系电话' },
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
            resp = await editMeetingRoom(data)
          } else {
            resp = await addMeetingRoom(data)
          }
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('添加成功')
          this.closeDrawer()
          this.$emit('submit')
        } catch (e) {
          this.$message.error(e.message)
        }
      }
    },
    watch: {
      'show'(val) {
        if (!val) {
          return
        }
        this.getProjects(this.industrialParkId)
      }
    }
  }
</script>

<style lang="less">
  .meeting-room-edit {
    .form-item-label-align label {
      text-align: center;
      display: block;
    }
  }
</style>