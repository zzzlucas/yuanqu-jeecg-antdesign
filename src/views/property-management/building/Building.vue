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
        <building-view :model="model" @delete="onDelete" @edit="onEdit" @change="onChange"></building-view>
      </a-card>
    </a-col>

    <!-- 表单 -->
    <building-block-form ref="block" @ok="onOk"></building-block-form>
  </a-row>
</template>

<script>
  import BuildingView from './components/BuildingView'
  import BuildingBlockForm from './components/form/BuildingBlockForm'
  import { deleteAction, getAction } from '@/api/manage'
  import { listJsonFields, listReplace } from '@utils/util'
  import pick from 'lodash.pick'
  import _ from 'lodash'

  export default {
    name: 'Building',
    components: { BuildingBlockForm, BuildingView },
    data() {
      return {
        type: 'block',
        history: [],
        the: {
          type: '',
          id: '',
          name: ''
        },
        model: {
          status: 'empty'
        },
        tree: [],
        url: {
          list: {
            block: {
              url: '/park.architecture/baseArchitectureProject/queryByParkId',
              id: 'parkId'
            },
            tower: {
              url: '/park.architecture/baseArchitectureBuilding/queryByProjectId',
              id: 'projectId'
            }
          },
          delete: {
            block: {
              url: '/park.architecture/baseArchitectureProject/delete',
              id: 'id'
            }
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
      this.loadData({[_.get(this.url, 'list.block.id')]: '1193719771573518336'}).then(list => {
        this.model = {
          status: 'block',
          list
        }

        this.tree = _.map(list, obj => {
          return {
            title: obj.projectAbbr,
            key: obj.buildingProjectId,
          }
        })
      }).catch(err => {
        console.log('载入区块数据：' + err)
      })
    },
    methods: {
      loadData(query) {
        return new Promise((resolve, reject) => {
          getAction(this.url.list[this.type].url, query).then(res => {
            resolve(listJsonFields(res.result, ['addDocFiles']))
          }).catch(err => {
            reject(err)
          })
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
            const config = this.url.delete[type]

            deleteAction(config.url, { [config.id]: id }).then(res => {
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
      onEdit(type, id, key, obj) {
        const data = _.clone(obj)
        switch (type) {
          case 'block':
            this.$refs.block.edit(data)
            break
          default:
            this.$message.error('没有对应的修改方式')
            break
        }
      },
      onOk(type){
        switch (type) {
          case 'block':
            this.loadData({[_.get(this.url, 'list.block.id')]: '1193719771573518336'}).then(list => {
              this.model = {
                status: 'block',
                list
              }

              this.tree = _.map(list, obj => {
                return {
                  title: obj.projectAbbr,
                  key: obj.buildingProjectId,
                }
              })
            }).catch(err => {
              console.log('载入区块数据：' + err)
            })
            break
        }
      },
      onChange(type, id, name){
        this.history.push({
          type,
          id,
          name
        })
        this.type = type
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