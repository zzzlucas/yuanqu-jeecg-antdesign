<template>
  <div class="yq-building-view">
    <!-- 区块显示 -->
    <a-row class="block-row">
      <a-col span="8" class="block-item">1</a-col>
      <a-col span="8" class="block-item">2</a-col>
      <a-col span="8" class="block-item">3</a-col>
      <a-col span="8" class="block-item">4</a-col>
      <a-col span="8" class="block-item">5</a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'BuildingView'
  }
</script>

<style lang="less">
  .yq-building-view {
    .block-row {
      .block-item {
        background-color: #00A0E9;

        &:nth-of-type(3n + 1) {
          margin-right: 4px;
          width: calc((100% / 24) * 8 - 4px);
        }

        &:nth-of-type(3n + 2) {
          margin: 0 4px;
          width: calc((100% / 24) * 8 - 8px);
        }

        &:nth-of-type(3n) {
          margin-left: 4px;
          width: calc((100% / 24) * 8 - 4px);
        }

        &:nth-of-type(n + 4) {
          margin-top: 8px;
        }
      }
    }
  }
</style>