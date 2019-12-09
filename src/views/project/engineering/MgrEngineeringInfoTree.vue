<template>
  <a-row :gutter="8" class="mgr-engineering-info-tree">
    <a-col span="4">
      <a-card>
        <a-tree :expandedKeys.sync="expandedKeys" :selectedKeys.sync="selectedKeys">
          <a-tree-node :title="parkName" :selectable="false" key="main">
            <a-tree-node title="A项目" key="1"></a-tree-node>
            <a-tree-node title="B项目" key="2"></a-tree-node>
          </a-tree-node>
        </a-tree>
      </a-card>
    </a-col>
    <a-col span="20">
      <tree-table-charts></tree-table-charts>
    </a-col>
  </a-row>
</template>

<script>
  import TreeTableCharts from './view/TreeTableCharts'
  import {mapState} from 'vuex'

  export default {
    name: 'MgrEngineeringInfoTree',
    components: { TreeTableCharts },
    data() {
      return {
        expandedKeys: ['main'],
        selectedKeys: ['1']
      }
    },
    computed: mapState('industrialPark', {
      parkName: state => state.name
    })
  }
</script>

<style lang="less">
  .mgr-engineering-info-tree {

  }
</style>