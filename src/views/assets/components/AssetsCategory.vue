<template>
  <a-tree
    showLine
    defaultExpandAll
    :tree-data="nodes"
    :defaultSelectedKeys="defaultSelectedKeys"
    @select="onSelect" />
</template>

<script>
  import { mapGetters } from 'vuex'
  import { buildTreeData } from '@utils/util'
  import { treeListCategory } from '../api'

  export default {
    data() {
      return {
        nodes: [],
        list: [],
      }
    },
    computed: {
      defaultSelectedKeys() {
        if (!this.nodes[0]) {
          return []
        }
        const keys = [this.nodes[0].key]
        this.$emit('select', keys)
        return keys
      },
      ...mapGetters([
        'industrialParkId'
      ]),
    },
    methods: {
      onSelect(...ev) {
        this.$emit('select', ...ev)
      },
      async fetchList() {
        const res = await treeListCategory({ parkId: this.industrialParkId })
        this.list = res.result
      },
      async buildNodes() {
        this.nodes = buildTreeData(this.list, 'categoryId', 'categoryName')
      },
      async getList() {
        await this.fetchList()
        this.buildNodes()
      },
    },
    created() {
      this.getList()
    },
  }
</script>
