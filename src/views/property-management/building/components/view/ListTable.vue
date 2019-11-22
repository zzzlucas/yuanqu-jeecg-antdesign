<template>
  <div class="yq-building-list-table">
    <a-table :columns="column" :data-source="list" :pagination="false" size="middle">
      <span slot="action" slot-scope="text, record, i">
        <a @click.stop="onchange(record[idKey])">进入</a>
        <a-divider type="vertical"/>
        <a @click.stop="onEdit(record[idKey], record)">编辑</a>
        <a-divider type="vertical"/>
        <a @click.stop="onDelete(record[idKey], i, record[nameKey])">删除</a>
      </span>
    </a-table>
  </div>
</template>

<script>
  export default {
    name: 'ListTable',
    props: {
      type: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      onchange(id) {
        this.$emit('change', this.type, id)
      },
      onEdit() {
        this.$emit('edit', this.type, ...arguments)
      },
      onDelete() {
        this.$emit('delete', this.type, ...arguments)
      }
    },
    computed: {
      column() {
        switch (this.type) {
          case 'tower':
            return [
              { title: '楼宇名称', dataIndex: 'buildingName' },
              { title: '总建筑面积（㎡）', dataIndex: 'estimateArea' },
              { title: '总层数', dataIndex: 'allFloor' },
              {
                title: '是否虚拟',
                dataIndex: 'isVirtual',
                customRender: (text) => {
                  return text === 'true' ? '是' : '否'
                }
              },
              {
                title: '操作',
                align: 'center',
                key: 'action',
                scopedSlots: { customRender: 'action' }
              }
            ]
          default:
            return []
        }
      },
      idKey() {
        switch (this.type) {
          case 'tower':
            return 'buildingId'
          default:
            return ''
        }
      },
      nameKey() {
        switch (this.type) {
          case 'tower':
            return 'buildingName'
          default:
            return ''
        }
      }
    }
  }
</script>

<style lang="less">
  .yq-building-list-table {
    margin-top: 24px;
  }
</style>