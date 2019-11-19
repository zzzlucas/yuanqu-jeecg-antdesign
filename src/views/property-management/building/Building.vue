<template>
  <a-row :gutter="8">
    <a-col span="4">
      <a-card>
        <a-tree show-line :tree-data="tree" :load-data="loadTree" @select="onTreeSelect"></a-tree>
      </a-card>
    </a-col>
    <a-col span="20">
      <a-card class="yq-building-card" title="楼宇房源">
        <template slot="extra">
          <a-button type="primary" @click="addBlock">新建区块</a-button>
          <a-button class="margin-left">新建楼宇</a-button>
          <a-button class="margin-left">新建楼层</a-button>
          <a-button class="margin-left">新建房间</a-button>
        </template>
        <building-view :model="model" @delete="onDelete"></building-view>
      </a-card>
    </a-col>

    <!-- 表单 -->
    <building-block-form ref="block"></building-block-form>
  </a-row>
</template>

<script>
  import BuildingView from './components/BuildingView'
  import BuildingBlockForm from './components/form/BuildingBlockForm'
  import { deleteAction, getAction } from '@/api/manage'
  import { listJsonFields, listReplace } from '@utils/util'
  import pick from 'lodash.pick'

  export default {
    name: 'Building',
    components: { BuildingBlockForm, BuildingView },
    data() {
      return {
        type: 'block',
        model: {
          status: 'empty'
        },
        tree: [],
        url: {
          list: {
            block: '/park.architecture/baseArchitectureProject/queryByParkId'
          },
          delete: {
            block: '/park.architecture/baseArchitectureProject/delete'
          },
          tree: {
            block: {
              url: '/park.architecture/baseArchitectureBuilding/queryByProjectId',
              id: 'projectId'
            }
          }
        }
      }
    },
    created() {
      this.loadData({ parkId: '1193719771573518336' }).then(list => {
        this.model = {
          status: 'block',
          list
        }

        this.tree = listReplace(list, {
          projectAbbr: 'title',
          buildingProjectId: 'key'
        }, obj => {
          obj = pick(obj, ['title', 'key'])
          obj.type = 'block'
          return obj
        })
      }).catch(err => {
        console.log('载入区块数据：' + err)
      })
    },
    methods: {
      loadData(query) {
        return new Promise((resolve, reject) => {
          getAction(this.url.list[this.type], query).then(res => {
            resolve(listJsonFields(res.result, ['addDocFiles']))
          }).catch(err => {
            reject(err)
          })
        })
      },
      addBlock() {
        this.$refs.block.add()
      },
      onDelete(type, id, key, name) {
        const types = {
          block: '区块'
        }

        this.$confirm({
          title: '询问',
          content: `是否删除${types[type]}：${name}`,
          onOk: () => {
            deleteAction(this.url.delete[type], { id }).then(res => {
              if (res.success && res.code === 200) {
                this.$message.success(res.message)
                this.$delete(this.model.list, key)
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
      },
      onTreeSelect(keys, info) {
        console.log(keys, info)
      },
      async loadTree(node) {
        const type = node.dataRef.type
        const config = this.url.tree[type]
        const query = {}

        if (node.dataRef.children) {
          return true
        }

        query[config.id] = node.dataRef.key
        getAction(config.url, query).then(res => {
          if (res.success && res.code === 200) {
            if (res.result) {
              node.dataRef.children = res.result
            } else {
              node.dataRef.isLeaf = true
            }
          } else {
            this.$message.error(res.message)
            throw new Error(res.message)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .yq-building-card {
    .margin-left {
      margin-left: 8px;
    }
  }
</style>