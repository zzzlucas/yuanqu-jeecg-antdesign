<template>
  <a-row :gutter="8">
    <a-col span="4">
      <a-card>
        <a-tree show-line @select="onTreeSelect">
          <a-tree-node key="1">
            <span slot="title">A区</span>
            <a-tree-node key="2" title="A楼"></a-tree-node>
          </a-tree-node>
          <a-tree-node key="3">
            <span slot="title">B区</span>
            <a-tree-node key="4" title="B楼">
              <a-tree-node key="5">
                <span slot="title">1层</span>
                <a-tree-node key="6" title="茅房"></a-tree-node>
              </a-tree-node>
            </a-tree-node>
          </a-tree-node>
        </a-tree>
      </a-card>
    </a-col>
    <a-col span="20">
      <a-card class="yq-building-card" title="楼宇房源">
        <template slot="extra">
          <a-button>新建区块</a-button>
          <a-button class="margin-left">新建楼宇</a-button>
          <a-button class="margin-left">新建楼层</a-button>
          <a-button class="margin-left">新建房间</a-button>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
  export default {
    name: 'Building',
    methods: {
      onTreeSelect(keys, info) {
        console.log(keys, info)
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