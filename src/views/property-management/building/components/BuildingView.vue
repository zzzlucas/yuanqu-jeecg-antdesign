<template>
  <div class="yq-building-view">
    <!-- 区块列表 -->
    <block-list
      v-if="model.status === 'block'"
      :list="model.list"
      @delete="deleteBtn"
      @edit="editBtn"
      @change="onChange"></block-list>

    <!-- 详细内容 -->
    <info-row v-else :type="model.status" :info="model.info"></info-row>

    <!-- 表格 -->
    <list-table
      v-if="['block'].indexOf(model.status) === -1"
      :type="model.status"
      :list="model.list"
      @change="onChange"
      @delete="deleteBtn"
      @edit="editBtn"></list-table>
  </div>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import BlockList from './view/BlockList'
  import InfoRow from './view/InfoRow'
  import ListTable from './view/ListTable'

  export default {
    name: 'BuildingView',
    components: { ListTable, InfoRow, BlockList, YqImage },
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