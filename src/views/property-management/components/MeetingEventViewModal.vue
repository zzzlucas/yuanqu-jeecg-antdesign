<template>
  <a-modal
    class="meeting-event-view-modal"
    width="60%"
    title="会议详情"
    :footer="null"
    v-model="show"
    @ok="close"
    @cancel="close">
    <a-row class="meeting-event-view-row" :gutter="24">
      <a-col :xl="12">
      </a-col>
      <a-col :xl="12">

      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
  import ViewAsideMixin from '@/mixins/ViewAside'

  export default {
    mixins: [
      ViewAsideMixin
    ],
  }
</script>

<style lang="less">

</style>