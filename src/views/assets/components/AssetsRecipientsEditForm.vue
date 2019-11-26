<template>
  <a-drawer
    wrapClassName="assets-recipients-edit-form form-edit-drawer"
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
        <a-col :xl="12">
          <a-form-item label="领用日期">
            <j-date :trigger-change="true" v-decorator="['useDate',{rules: rules.useDate}]" style="width: 100%;" />
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="领用人">
            <a-input v-decorator="['usePerson', {rules: rules.usePerson}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="备注" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remark']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="领用资产" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-button @click="openAssetModal">添加</a-button>
            <br>
            <div class="assets-list">
              <div class="assets-item" :key="row.assetId" v-for="row in assetSelectRows">
                <a-tag>{{ row.fixedAssetName }}</a-tag>
                <a-input-number
                  size="small"
                  placeholder="数量"
                  v-decorator="['assets.' + row.assetId, { rules: rules.assets, initialValue: 1 }]" />
              </div>
            </div>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="附件" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">

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
    <!-- Asset modal -->
    <assets-search-modal
      use-status="1"
      :type="type"
      v-model="assetModal"
      @select="handleSelectAssets" />
  </a-drawer>
</template>

<script>
  import JDate from '@/components/jeecg/JDate'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import AssetsSearchModal from './AssetsSearchModal'
  import { filterObj, promiseForm } from '@utils/util'
  import { assetsRegisterEditForm } from '@/config/pick-fields'
  import { addOpertion } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('assets-recipients'),
    ],
    components: {
      JDate,
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
            { required: true, message: '请选择领用日期' },
          ],
          usePerson: [
            { required: true, message: '请输入领用人' },
          ],
          assets: [
            { required: true, message: '请输入数量，至少需要1个', type: 'integer', min: 1 },
          ],
        },
        // Asset modal
        assetModal: false,
        assetSelectKeys: [],
        assetSelectRows: [],
      }
    },
    methods: {
      openAssetModal() {
        this.assetModal = true
      },
      async submit(ev) {
        ev.preventDefault();
        const data = await promiseForm(this.form)
        const total = this.assetSelectKeys.length // Total assets
        let counter = 0
        let errMsg = []
        if (!total) {
          this.$message.error('请选择至少一个资产')
          return
        }
        // Setup request body
        filterObj(data)
        data.parkId = this.industrialParkId
        data.useType = '1' // Consuming
        const assets = data.assets
        delete data.assets
        // Batch request
        let i = 0
        for (let [assetId, qty] of Object.entries(assets)) {
          try {
            data.assetId = assetId
            data.qty = qty
            const resp = await addOpertion(data)
            if (!resp.success) {
              throw new Error(resp.message)
            }
            counter++
          } catch (e) {
            errMsg.push({ number: this.assetSelectRows[i].assetNumber, name: this.assetSelectRows[i].fixedAssetName, message: e.message })
          }
          i++
        }
        // Stats report
        if (total !== counter) {
          this.$message.warning(`已成功领用 ${counter} 个资产，失败领用 ${total - counter} 个`, 5)
          errMsg.forEach(item => {
            this.$message.error(`资产: ${item.name}，失败原因：${item.message}`, 5)
          })
        } else {
          this.$message.success('领用成功')
          this.closeDrawer()
          this.$emit('submit')
        }
      },
      handleSelectAssets(rowKeys, rowSelection) {
        this.assetSelectKeys = rowKeys
        this.assetSelectRows = rowSelection
      },
      cleanup() {
        this.assetSelectKeys = []
        this.assetSelectRows = []
      },
      changeTitle() {
        this.title = this.type === 'consumables' ? '易耗品资产领用' : '固定资产领用'
      },
    },
    watch: {
      'show'(val) {
        if (!val) {
          return
        }
        this.cleanup()
        this.changeTitle()
      }
    }
  }
</script>

<style lang="less">
  .assets-recipients-edit-form {
    .assets-list {
      display: flex;
      margin-top: 10px;
      .assets-item {
        .ant-input {
          text-align: right;
          width: 60px;
        }
      }
    }
  }
</style>