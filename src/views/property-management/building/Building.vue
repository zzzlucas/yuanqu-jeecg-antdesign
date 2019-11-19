<template>
  <a-row :gutter="8">
    <a-col span="4">
      <a-card>
        <building-tree></building-tree>
      </a-card>
    </a-col>
    <a-col span="20">
      <a-card class="yq-building-card" title="楼宇房源">
        <template slot="extra">
          <a-button type="primary">新建区块</a-button>
          <a-button class="margin-left">新建楼宇</a-button>
          <a-button class="margin-left">新建楼层</a-button>
          <a-button class="margin-left">新建房间</a-button>
        </template>
        <building-view></building-view>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
  import BuildingTree from './components/BuildingTree'
  import BuildingView from './components/BuildingView'

  export default {
    name: 'Building',
    components: { BuildingView, BuildingTree },
    methods: {}
  }
</script>

<style lang="less">
  .yq-building-card {
    .margin-left {
      margin-left: 8px;
    }
  }
</style>