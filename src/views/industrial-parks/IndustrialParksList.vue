<template>
  <a-card :bordered="false">
    <div class="industrial-parks-list">
      <a-row>
        <a-col class="button-col">
          <a-button type="primary">登记</a-button>
          <a-button>删除</a-button>
        </a-col>
        <a-col class="alert-col">
          <a-alert type="info">
            <span slot="message">
              已选择 0 项
              <a class="clean-btn">清空</a>
            </span>
          </a-alert>
        </a-col>
        <a-col class="table-col">
          <a-table :data-source="tableData" bordered>
            <a-table-column title="园区代码" data-index="id" key="id"></a-table-column>
            <a-table-column title="园区名称" data-index="name" key="name"></a-table-column>
            <a-table-column title="联系电话" data-index="phone" key="phone"></a-table-column>
            <a-table-column title="地址" data-index="address" key="address"></a-table-column>
          </a-table>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
  export default {
    name: 'IndustrialParksList',
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: '南湖科技城区',
            phone: '13800001111',
            address: '嘉兴市南湖区亚美路与由拳路交叉口'
          },
          {
            id: 2,
            name: '秀洲智慧产业园',
            phone: '13800001111',
            address: '嘉兴市秀洲区三环路西南角'
          }
        ]
      }
    }
  }
</script>

<style lang="less">
  .industrial-parks-list {
    .button-col {
      .ant-btn + .ant-btn {
        margin-left: 10px;
      }
    }

    .alert-col {
      margin-top: 20px;
    }

    .table-col {
      margin-top: 15px;
    }
  }
</style>