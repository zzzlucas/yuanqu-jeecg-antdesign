<template>
  <a-drawer
    class="assets-view-aside"
    :title="title"
    width="65%"
    closable
    :mask-closable="true"
    :visible="show"
    @close="close">
    <div class="assets-view-content">
      <a-row class="assets-view-row" :gutter="24">
        <a-col :xl="12">
          所属分类：{{ data.categoryId }}
        </a-col>
        <a-col :xl="12">
          资产编号：{{ data.assetNumber }}
        </a-col>
      </a-row>
      <a-row class="assets-view-row" :gutter="24">
        <a-col :xl="12">
          资产名称：{{ data.fixedAssetName }}
        </a-col>
        <a-col :xl="12">
          规格型号：{{ data.assetModel }}
        </a-col>
      </a-row>
      <a-row class="assets-view-row" :gutter="24">
        <a-col :xl="12">
          单价：{{ data.stockPrice }}
        </a-col>
        <a-col :xl="12">
          总价：{{ data.stockAmount }}
        </a-col>
      </a-row>
      <a-row class="assets-view-row" :gutter="24">
        <a-col :xl="12">
            采购日期：{{ data.purchaseDate }}
        </a-col>
        <a-col :xl="12">
          使用部门：{{ data.USEDept }}
        </a-col>
      </a-row>
      <a-row class="assets-view-row" :gutter="24">
        <a-col :xl="12">
          使用人：{{ data.usePerson }}
        </a-col>
        <a-col :xl="12">
          备注：{{ data.remark }}
        </a-col>
      </a-row>
      <a-row class="assets-view-row" :gutter="24">
        <a-col :xl="24">
          附件：
        </a-col>
        <a-col :xl="24">
          <!-- TODO -->
        </a-col>
      </a-row>
    </div>
  </a-drawer>
</template>

<script>
  import '../style/view.less'
  import { view } from '@views/assets/mixins'

  export default {
    mixins: [view],
    data() {
      return {
        title: '详细信息',
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
