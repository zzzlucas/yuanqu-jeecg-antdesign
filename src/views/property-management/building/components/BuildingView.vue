<template>
  <div class="yq-building-view">
    <!-- 区块列表 -->
    <block-list
      v-if="model.status === 'block'"
      :list="model.list"
      @delete="deleteBtn"
      @edit="editBtn"
      @change="onChange"></block-list>

    <!-- 区块详细内容，楼宇列表 -->
    <tower-list v-if="model.status === 'tower'"></tower-list>
  </div>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import BlockList from './view/BlockList'
  import TowerList from './view/TowerList'

  export default {
    name: 'BuildingView',
    components: { TowerList, BlockList, YqImage },
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
      },
      onChange(){
        this.$emit('change', ...arguments)
      }
    }
  }
</script>