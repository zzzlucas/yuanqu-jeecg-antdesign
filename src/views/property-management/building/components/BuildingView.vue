<template>
  <div class="yq-building-view">
    <!-- 区块显示 -->
    <block-list v-if="model.status === 'block'" :list="model.list" @delete="deleteBin"></block-list>
  </div>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import BlockList from './list/BlockList'

  export default {
    name: 'BuildingView',
    components: { BlockList, YqImage },
    props: {
      model: {
        type: Object,
        default() {
          return {
            status: 'empty'
          }
        }
      }
    },
    methods: {
      deleteBin() {
        this.$emit('delete', ...arguments)
      }
    }
  }
</script>