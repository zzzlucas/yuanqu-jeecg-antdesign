<template>
  <div class="yq-building-view">
    <!-- 区块显示 -->
    <a-row class="block-row">
      <a-col span="12" class="block-item">
        <header class="block">
          <div class="title">
            <span>A区域</span>
          </div>
          <div class="header-right">
            <a-button size="small">编辑</a-button>
            <a-button class="delete-btn" size="small" type="danger">删除</a-button>
          </div>
        </header>
        <main class="block">
          <div class="image-box">
            <yq-image class="block-image" size="30"></yq-image>
          </div>
          <div class="info-box">
            <p>楼宇总数：31 栋</p>
            <p>建筑总面积：2333 ㎡</p>
            <p>楼层：共 20 层</p>
            <p>房间：共 147 间，剩余 144 间</p>
          </div>
        </main>
      </a-col>
      <a-col span="12" class="block-item">
        <header class="block">
          <div class="title">
            <span>B区域</span>
          </div>
          <div class="header-right">
            <a-button size="small">编辑</a-button>
            <a-button class="delete-btn" size="small" type="danger">删除</a-button>
          </div>
        </header>
        <main class="block">
          <div class="image-box">
            <yq-image class="block-image" size="30"></yq-image>
          </div>
          <div class="info-box">
            <p>楼宇总数：31 栋</p>
            <p>建筑总面积：2333 ㎡</p>
            <p>楼层：共 20 层</p>
            <p>房间：共 147 间，剩余 144 间</p>
          </div>
        </main>
      </a-col>
      <a-col span="12" class="block-item">
        <header class="block">
          <div class="title">
            <span>C区域</span>
          </div>
          <div class="header-right">
            <a-button size="small">编辑</a-button>
            <a-button class="delete-btn" size="small" type="danger">删除</a-button>
          </div>
        </header>
        <main class="block">
          <div class="image-box">
            <yq-image class="block-image" size="30"></yq-image>
          </div>
          <div class="info-box">
            <p>楼宇总数：31 栋</p>
            <p>建筑总面积：2333 ㎡</p>
            <p>楼层：共 20 层</p>
            <p>房间：共 147 间，剩余 144 间</p>
          </div>
        </main>
      </a-col>
      <a-col span="12" class="block-item">
        <header class="block">
          <div class="title">
            <span>D区域</span>
          </div>
          <div class="header-right">
            <a-button size="small">编辑</a-button>
            <a-button class="delete-btn" size="small" type="danger">删除</a-button>
          </div>
        </header>
        <main class="block">
          <div class="image-box">
            <yq-image class="block-image" size="30"></yq-image>
          </div>
          <div class="info-box">
            <p>楼宇总数：31 栋</p>
            <p>建筑总面积：2333 ㎡</p>
            <p>楼层：共 20 层</p>
            <p>房间：共 147 间，剩余 144 间</p>
          </div>
        </main>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  export default {
    name: 'BuildingView',
    components: { YqImage }
  }
</script>

<style lang="less">
  @import "../less/function";
  @import "~@/assets/less/clearFloat";

  .yq-building-view {
    .block-row {
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
  }
</style>