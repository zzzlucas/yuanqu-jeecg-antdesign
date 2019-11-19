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
          <a-button type="primary" @click="addBlock">新建区块</a-button>
          <a-button class="margin-left">新建楼宇</a-button>
          <a-button class="margin-left">新建楼层</a-button>
          <a-button class="margin-left">新建房间</a-button>
        </template>
        <building-view></building-view>
      </a-card>
    </a-col>

    <!-- 表单 -->
    <building-block-form ref="block"></building-block-form>
  </a-row>
</template>

<script>
  import BuildingTree from './components/BuildingTree'
  import BuildingView from './components/BuildingView'
  import BuildingBlockForm from './components/BuildingBlockForm'

  export default {
    name: 'Building',
    components: { BuildingBlockForm, BuildingView, BuildingTree },
    methods: {
      addBlock() {
        this.$refs.block.add()
      }
    }
  }
</script>

<style lang="less">
  .yq-building-card {
    .margin-left {
      margin-left: 8px;
    }
  }
</style>