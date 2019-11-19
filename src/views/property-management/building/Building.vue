<template>
  <a-row :gutter="8">
    <a-col span="4">
      <a-card>
        <building-tree></building-tree>
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
  import BuildingTree from './components/BuildingTree'
  import BuildingView from './components/BuildingView'
  import BuildingBlockForm from './components/form/BuildingBlockForm'
  import { deleteAction, getAction } from '@/api/manage'
  import { listJsonFields } from '@utils/util'

  export default {
    name: 'Building',
    components: { BuildingBlockForm, BuildingView, BuildingTree },
    data() {
      return {
        type: 'block',
        model: {
          status: 'empty'
        },
        url: {
          list: {
            block: '/park.architecture/baseArchitectureProject/queryByParkId'
          },
          delete: {
            block: '/park.architecture/baseArchitectureProject/delete'
          }
        }
      }
    },
    created() {
      this.loadData({parkId: '1193719771573518336'}).then(list => {
        this.model = {
          status: 'block',
          list
        }
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
      onDelete(type, id, key, name){
        const types = {
          block: '区块'
        }

        this.$confirm({
          title: '询问',
          content: `是否删除${types[type]}：${name}`,
          onOk: () => {
            deleteAction(this.url.delete[type], { id }).then(res => {
              if(res.success && res.code === 200){
                this.$message.success(res.message)
                this.$delete(this.model.list, key)
              } else {
                this.$message.error(res.message)
              }
            })
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