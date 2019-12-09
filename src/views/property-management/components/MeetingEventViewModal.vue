<template>
  <a-modal
    class="meeting-event-view-modal"
    title="会议详情"
    v-model="modal"
    @ok="close"
    @cancel="close">
    <detail-list :col="1">
      <!-- todo -->
      <detail-list-item term="地址">{{ data.address }}</detail-list-item>
      <detail-list-item term="时间">{{ data.begDate }} - {{ data.endDate }}</detail-list-item>
      <detail-list-item term="发起人">{{ data.requestPerson }}</detail-list-item>
      <!-- todo -->
      <detail-list-item term="参与人">{{ data.r3 }}</detail-list-item>
      <detail-list-item term="备注">{{ data.remark }}</detail-list-item>
    </detail-list>
    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleEdit">修改</a-button>
      <a-popconfirm title="确定删除吗?" @confirm="handleDelete">
        <a-button key="back">删除</a-button>
      </a-popconfirm>
    </template>
  </a-modal>
</template>

<script>
  import ViewAsideMixin from '@/mixins/ViewAside'
  import DetailList from '@/components/tools/DetailList'
  const DetailListItem = DetailList.Item

  export default {
    mixins: [
      ViewAsideMixin,
    ],
    components: {
      DetailList,
      DetailListItem
    },
    methods: {
      handleEdit() {
        this.$emit('edit', this.data)
        this.close()
      },
      handleDelete() {
        this.$emit('delete', this.data)
        this.close()
      },
    }
  }
</script>

<style lang="less">

</style>