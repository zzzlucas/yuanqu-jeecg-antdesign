<template>
  <div class="yq-building-view">
    <!-- 区块列表 -->
    <block-list v-if="model.status === 'block'" :list="model.list" @delete="deleteBtn" @edit="editBtn"></block-list>
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
      deleteBtn() {
        this.$emit('delete', ...arguments)
      },
      editBtn() {
        this.$emit('edit', ...arguments)
      }
    }
  }
</script>