<template>
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
</template>

<script>
  export default {
    name: 'BuildingTree',
    methods: {
      onTreeSelect(keys, info) {
        console.log(keys, info)
      }
    }
  }
</script>