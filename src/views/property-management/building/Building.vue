<template>
  <a-row :gutter="8">
    <a-col span="4">
      <a-card>
        <a-tree show-line :tree-data="tree" :load-data="loadTree" @select="onTreeSelect"></a-tree>
      </a-card>
    </a-col>
    <a-col span="20">
      <a-card class="yq-building-card" :loading="loading">
        <template slot="title">
          <span>楼宇房源</span>
          <a-button style="margin-left: 8px;" v-if="history.length > 0" @click="onBack">
            <a-icon type="rollback"/>
            返回
          </a-button>
        </template>
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
        type: '',
        history: [],
        loading: true,
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
          info: {
            block: {
              url: '/park.architecture/baseArchitectureProject/queryByParkId',
              id: 'parkId'
            },
            tower: {
              url: '/park.architecture/baseArchitectureProject/queryById',
              id: 'id'
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
      this.type = 'block'

      this.$nextTick(() => {
        this.loadData('block', '1193719771573518336').then(list => {
          this.model = {
            status: 'block',
            list
          }

          this.tree = _.map(list, obj => {
            return {
              title: obj.projectAbbr,
              key: obj.buildingProjectId
            }
          })
        }).catch(err => {
          console.log('载入区块数据：' + err)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    methods: {
      loadData(type, id) {
        return new Promise((resolve, reject) => {
          const config = this.url.list[type]
          getAction(config.url, { [config.id]: id }).then(res => {
            if (res.code === 200 && res.success) {
              resolve(listJsonFields(res.result, ['addDocFiles']))
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            reject(err)
          })
        })
      },
      getInfo(type, id) {
        return new Promise((resolve, reject) => {
          const config = this.url.info[this.type]
          getAction(config.url, { [config.id]: id }).then(res => {
            resolve(res)
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
      onOk(type) {
        switch (type) {
          case 'block':
            this.type = 'block'
            this.loadData('block', '1193719771573518336').then(list => {
              this.model = {
                status: 'block',
                list
              }

              this.tree = _.map(list, obj => {
                return {
                  title: obj.projectAbbr,
                  key: obj.buildingProjectId
                }
              })
            }).catch(err => {
              console.log('载入区块数据：' + err)
            })
            break
        }
      },
      onChange(type, id) {
        this.loading = true
        this.history.push({
          type,
          id
        })
        this.type = type

        this.$nextTick(() => {
          const p1 = this.getInfo(type, id)
          const p2 = this.loadData(type, id)

          Promise.all([p1, p2]).then(([info, list]) => {
            this.model = {
              status: type,
              info,
              list
            }
          }).finally(() => {
            this.loading = false
          })
        })
      },
      onBack() {
        const history = _.initial(this.history)
        const last = _.last(history)

        this.history = []
        this.$nextTick(() => {
          this.history = history
        })

        if (last) {
          this.onChange(last.type, last.id)
        } else {
          this.onChange('block', '1193719771573518336')
        }
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