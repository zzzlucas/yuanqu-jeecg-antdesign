<template>
  <div class="yq-building-view">
    <!-- 区块显示 -->
    <a-row class="block-row">
      <a-col span="8" class="block-item">
        <header class="block">A区域</header>
      </a-col>
      <a-col span="8" class="block-item">
        <header class="block">B区域</header>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'BuildingView'
  }
</script>

<style lang="less">
  @import "../less/function";

  .yq-building-view {
    .block-row {
      .block-item {
        background-color: #00A0E9;

        .buildBlock();
      }
    }
  }
</style>