<template>
  <a-modal
    class="assets-list"
    title="选择资产"
    width="80%"
    v-model="modal"
    @ok="close"
    @cancel="close">
    <!-- Filter -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="24">
            <a-form-item label="关键字" style="width: 100%;">
              <a-input placeholder="资产名称、资产编号、规格型号" v-model="queryParam.keyword" style="width: 100%;"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- Table -->
    <a-table
      ref="table"
      size="middle"
      bordered
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      style="margin-top: 20px">
    </a-table>
    <!-- Footer -->
    <template slot="footer">
      <a-button
        key="submit"
        type="primary"
        @click="done">
        完成
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { mixinList } from '@/utils/mixin'
  import { list } from '../mixins'
  import { url } from '../api'
  import '../style/list.less'

  export default {
    mixins: [
      JeecgListMixin,
      mixinList,
      list
    ],
    props: {
      show: {
        type: Boolean,
        default: false,
      }
    },
    model: {
      prop: 'show',
      event: 'change'
    },
    data() {
      return {
        // Url
        url: url.info,
        // Status
        modal: false,
        // Filter
        queryParam: {
          keyword: '',
        },
        // Table
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => Number(index) + 1
          },
          {
            title: '借用单号',
            align: 'center',
            dataIndex: 'operation_id'
          },
          {
            title: '借用日期',
            align: 'center',
            dataIndex: 'use_date'
          },
          {
            title: '借用部门',
            align: 'center',
            dataIndex: 'use_person_department'
          },
          {
            title: '借用人',
            align: 'center',
            dataIndex: 'use_person'
          },
          {
            title: '借用资产名称',
            align: 'center',
            dataIndex: 'use_assets_name'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'remark'
          },
        ],
      }
    },
    methods: {
      done() {
        this.$emit('select', this.selectedKeys)
      },
      close() {
        this.$emit('change', false)
      },
    },
    watch: {
      show(val) {
        this.modal = val
      },
    }
  }
</script>
