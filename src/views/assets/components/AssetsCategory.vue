<template>
  <a-tree
    showLine
    defaultExpandAll
    :tree-data="nodes"
    :defaultSelectedKeys="defaultSelectedKeys"
    @select="onSelect" />
</template>

<script>
  import { treeListCategory } from '../api'

  export default {
    data() {
      return {
        nodes: [
          {
            key: '0-0',
            title: '易耗品类',
            children: [
              {
                key: '0-0-0',
                title: '日常生活办公',
              },
              {
                key: '0-0-1',
                title: '生活类',
              },
              {
                key: '0-0-2',
                title: '办公类',
              },
            ],
          },
          {
            key: '0-1',
            title: '固定资产',
            children: [
              {
                key: '0-1-0',
                title: '运输车辆',
              },
              {
                key: '0-1-1',
                title: 'IT设备类',
                children: [
                  {
                    key: '0-1-1-0',
                    title: '笔记本',
                  },
                ]
              },
            ],
          }
        ],
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
    },
    methods: {
      onSelect(...ev) {
        this.$emit('select', ...ev)
      },
      async fetchList() {
        const res = await treeListCategory()
        this.list = res.result
      },
      async buildNodes() {
        const catMap = {}
        this.list.forEach(item => {
          const catId = item.categoryId
          catMap[catId] = item
        })
        // todo
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
