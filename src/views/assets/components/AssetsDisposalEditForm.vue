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
        <a-col :xl="12">
          <a-form-item label="处置日期">
            <a-input v-decorator="['useDate', {rules: rules.useDate}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="处置类型">
            <a-input v-decorator="['usePerson', {rules: rules.usePerson}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="处置原因" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['reason']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="备注" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remark']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="处置资产" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-button @click="openAssetModal">添加</a-button>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="附件" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">

          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="action-row" type="flex" justify="end">
        <a-col :xl="2">
          <a-form-item>
            <a-button>
              取消
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :xl="2">
          <a-form-item>
            <a-button type="primary" html-type="submit">
              确认
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- Asset modal -->
    <assets-search-modal v-model="assetModal" />
  </a-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import AssetsSearchModal from './AssetsSearchModal'
  import { filterObj, promiseForm } from '@utils/util'
  import { assetsRegisterEditForm } from '@/config/pick-fields'
  import { addInfo } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('assets-disposal'),
    ],
    components: {
      AssetsSearchModal,
    },
    data() {
      return {
        // Form
        type: '',
        fields: assetsRegisterEditForm,
        // Rules
        rules: {
          useDate: [
            { required: true, message: '请选择处置日期' },
          ],
          usePerson: [
            { required: true, message: '请选择处置类型' },
          ],
        },
        category: [],
        // Asset modal
        assetModal: false,
      }
    },
    computed: {
      ...mapGetters([
        'industrialParkId'
      ]),
    },
    methods: {
      openAssetModal() {
        this.assetModal = true
      },
      async submit(ev) {
        ev.preventDefault();
        const data = await promiseForm(this.form)
        try {
          filterObj(data)
          data.parkId = this.industrialParkId
          const resp = await addInfo(data)
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('添加成功')
          this.closeDrawer()
          this.$emit('submit')
        } catch (e) {
          this.$message.error(e.message)
        }
      },
    },

  }
</script>
