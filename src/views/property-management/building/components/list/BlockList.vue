<template>
  <a-row class="yq-building-block-row">
    <a-col span="12" class="block-item" v-for="(item, key) in list" :key="key">
      <header class="block">
        <div class="title" v-text="item.projectName"></div>
        <div class="header-right">
          <a-button size="small">编辑</a-button>
          <a-button
            class="delete-btn"
            size="small"
            type="danger"
            @click="deleteBin('block', item.buildingProjectId, key, item.projectName)">
            删除
          </a-button>
        </div>
      </header>
      <main class="block">
        <div class="image-box">
          <yq-image class="block-image" size="40" :src="getImage(item.addDocFiles)"></yq-image>
        </div>
        <!-- TODO: 接口要大改，这里全都动不了 -->
        <div class="info-box">
          <p>楼宇总数：31 栋</p>
          <p>建筑总面积：{{ item.buildingArea }} ㎡</p>
          <p>楼层：共 20 层</p>
          <p>房间：共 147 间，剩余 144 间</p>
        </div>
      </main>
    </a-col>
  </a-row>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import { getOneImage } from '@utils/util'

  export default {
    name: 'BlockList',
    components: { YqImage },
    props: {
      list: {
        type: Array,
        default(){
          return []
        }
      }
    },
    methods: {
      getImage(list){
        if(list.length > 0){
          return getOneImage(list[0].url)
        }

        return ''
      }
    }
  }
</script>

<style lang="less">
  @import "../../less/function";
  @import "~@/assets/less/clearFloat";

  .yq-building-block-row {
    .block-item {
      header.block {
        width: 100%;
        padding: 10px;
        background-color: #d9d9d9;
        font-size: 16px;

        .title {
          float: left;
          height: 25px;
          line-height: 25px;
        }

        .header-right {
          float: right;

          .delete-btn {
            margin-left: 8px;
          }
        }

        .clearFloat();
      }

      main.block {
        border: 1px solid #d9d9d9;
        padding: 8px;

        .image-box {
          width: 38%;
          float: left;

          .block-image {
            height: 130px;
          }
        }

        .info-box {
          width: 62%;
          float: left;
          padding-left: 8px;

          p:last-of-type {
            margin-bottom: 0;
          }
        }

        .clearFloat();
      }

      .buildBlock();
    }
  }
</style>