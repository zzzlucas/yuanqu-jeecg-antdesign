<template>
  <a-card :bordered="false">
    <div class="industrial-parks-list">
      <a-row>
        <!--头部块-->
        <a-col class="header-col">
          <a-button type="primary" @click="rightShow = true">登记</a-button>
          <a-button>批量删除</a-button>
          <a-input-search class="search-input" placeholder="园区名称" enterButton @search="search"></a-input-search>
        </a-col>
        <!--Alert 块-->
        <a-col class="alert-col">
          <a-alert type="info">
            <span slot="message">
              已选择 {{ selectCount }} 项
              <a class="clean-btn" @click="cleanTableCheck">清空</a>
            </span>
          </a-alert>
        </a-col>
        <!--数据表格-->
        <a-col class="table-col">
          <a-table bordered :data-source="tableData"
                   :rowSelection="{
                      onSelect: tableSelect.select,
                      onSelectAll: tableSelect.selectAll,
                      onChange: tableSelect.change,
                      selectedRowKeys: tableSelect.keys
                   }">
            <a-table-column title="园区代码" data-index="id" key="id"></a-table-column>
            <a-table-column title="园区名称" data-index="name" key="name"></a-table-column>
            <a-table-column title="联系电话" data-index="phone" key="phone"></a-table-column>
            <a-table-column title="地址" data-index="address" key="address"></a-table-column>
          </a-table>
        </a-col>
      </a-row>
    </div>
    <!--抽屉组件: model/ParksAddForm.vue-->
    <parks-add-form v-model="rightShow"></parks-add-form>
  </a-card>
</template>

<script>
  import ParksAddForm from '@views/industrial-parks/model/ParksAddForm'

  export default {
    name: 'IndustrialParksList',
    components: { ParksAddForm },
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
        ],
        tableSelect: {
          keys: [],
          select: (row, bool, select) => {
            this.selectCount = select.length
          },
          selectAll: (bool, select) => {
            this.selectCount = select.length
          },
          change: (keys) => {
            this.tableSelect.keys = keys
          }
        },
        selectCount: 0,
        rightShow: false
      }
    },
    methods: {
      cleanTableCheck() {
        this.tableSelect.keys > 0 && (this.tableSelect.keys = [])
      },
      search(query) {
        console.log('搜索内容:', query)
      }
    }
  }
</script>

<style lang="less">
  @import "~ant-design-vue/es/style/themes/default";

  .industrial-parks-list {
    .header-col {
      .ant-btn + .ant-btn {
        margin-left: 10px;
      }

      .search-input {
        position: relative;
        top: 1px;
        width: 300px;
        margin-left: 30px;
      }
    }

    .alert-col {
      margin-top: 20px;

      .clean-btn {
        color: @link-color;
        margin-left: 25px;
      }
    }

    .table-col {
      margin-top: 15px;
    }
  }
</style>