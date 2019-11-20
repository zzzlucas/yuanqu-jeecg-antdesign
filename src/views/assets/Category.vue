<template>
  <a-card :bordered="false">
    <a-layout>
      <a-layout-sider theme="light">
        <assets-category @select="selectCategory" />
      </a-layout-sider>
      <a-layout-content>
        <a-table
          ref="table"
          size="middle"
          bordered>
        </a-table>
      </a-layout-content>
    </a-layout>
  </a-card>
</template>

<script>
  import Mixin from './mixins'

  export default {
    mixins: [Mixin],
    data() {
      return {
        // Table
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
          },
          {
            title: '园区ID',
            align: 'center',
            dataIndex: 'parkId'
          },
          {
            title: '园区名称',
            align: 'center',
            dataIndex: 'parkName'
          },
          {
            title: '总建筑面积',
            align: 'center',
            dataIndex: 'totalBulidingArea'
          },
          {
            title: '地址',
            align: 'center',
            dataIndex: 'address'
          },
          {
            title: '联系电话',
            align: 'center',
            dataIndex: 'telephone'
          },
        ]
      }
    },
    components: {
    },
    methods: {
    }
  }
</script>

<style lang="less">

</style>