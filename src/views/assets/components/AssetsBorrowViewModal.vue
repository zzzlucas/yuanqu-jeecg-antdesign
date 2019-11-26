<template>
  <a-modal
    class="assets-view-modal"
    :title="title"
    v-model="modal"
    @on-ok="close"
    @on-cancel="close">
      <a-row :gutter="24">
        <a-col :xl="12">
          借用单号：{{ data.usedNumber }}
        </a-col>
        <a-col :xl="12">
          借用日期：{{ data.usedDate }}
        </a-col>
        <a-col :xl="12">
          借用部门：{{ data.usedDepartment }}
        </a-col>
        <a-col :xl="12">
          借用人：{{ data.usedPerson }}
        </a-col>
        <a-col :xl="24">
          备注：
        </a-col>
        <a-col :xl="24">
          <a-table
            :columns="columns"
            :dataSource="data"
            bordered />
        </a-col>
        <a-col :xl="24">
          附件：
        </a-col>
        <a-col :xl="24">
          <!-- TODO -->
        </a-col>
      </a-row>
  </a-modal>
</template>

<script>
  import { view } from '@views/assets/mixins'

  export default {
    mixins: [view],
    data() {
      return {
        title: '借用详情',
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
            title: '资产名称',
            align: 'center',
            dataIndex: 'fixedAssetName'
          },
          {
            title: '资产编号',
            align: 'center',
            dataIndex: 'assetsNumber'
          },
          {
            title: '规格型号',
            align: 'center',
            dataIndex: 'assetModel'
          },
          {
            title: '使用状态',
            align: 'center',
            dataIndex: 'useStatus'
          },
        ],
      }
    },
    methods: {

    },
  }
</script>
