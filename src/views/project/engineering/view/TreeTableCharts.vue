<template>
  <a-card class="tree-table-charts">
    <a-row>
      <a-col span="10">
        <a-table bordered :data-source="list" :columns="columns" :pagination="false"></a-table>
      </a-col>
      <a-col span="14">

      </a-col>
    </a-row>
  </a-card>
</template>

<script>
  export default {
    name: 'TreeTableCharts',
    data() {
      return {
        columns: [
          { title: '名称', dataIndex: 'name' },
          { title: '开始时间', dataIndex: 'startTime' },
          { title: '结束时间', dataIndex: 'endTime' }
        ],
        list: [
          { name: 'A进展', startTime: '2019-12-04 22:50:32', endTime: '2019-12-05 22:50:14' },
          { name: 'B进展', startTime: '2019-12-04 22:50:32', endTime: '2019-12-05 22:50:14' }
        ]
      }
    }
  }
</script>

<style lang="less">
  .tree-table-charts {

  }
</style>