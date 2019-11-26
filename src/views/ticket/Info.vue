<template>
  <a-card :bordered="false" :loading="loading" :title="info.parkName" :bodyStyle="{padding: loading ? '12px' : 0}">
    <div class="ticket-view">

    </div>
  </a-card>
</template>

<script>

  export default {
    mixins: [],
    data() {
      return {
        loading: true,
        info: {},
      }
    },
    async created() {
      if (typeof this.$route.params.id !== 'string') {
        this.$router.back()
        this.$message.warning('ID不正确')
        return false
      }

    }
  }
</script>

<style lang="less">

</style>