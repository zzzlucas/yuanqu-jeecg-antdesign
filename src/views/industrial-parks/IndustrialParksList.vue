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
                   :pagination="{ total: count }"
                   :rowSelection="{
                      onSelect: tableSelect.select,
                      onSelectAll: tableSelect.selectAll,
                      onChange: tableSelect.change,
                      selectedRowKeys: tableSelect.keys
                   }"
                   @change="tableChange">
            <a-table-column title="园区代码" data-index="park_id"></a-table-column>
            <a-table-column title="园区名称" data-index="park_name"></a-table-column>
            <a-table-column title="总建筑面积" data-index="total_buliding_area"></a-table-column>
            <a-table-column title="联系电话" data-index="telephone"></a-table-column>
            <a-table-column title="地址" data-index="address"></a-table-column>
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
  import Config from '@/defaultSettings'
  import { deleteAction, getAction } from '@/api/manage'

  export default {
    name: 'IndustrialParksList',
    components: { ParksAddForm },
    data() {
      return {
        count: 0,
        tableData: [],
        tableSelect: {
          keys: [],
          select: (row, bool, select) => {
            this.selectCount = select.length
            this.tableSelect.data = select
          },
          selectAll: (bool, select) => {
            this.selectCount = select.length
            this.tableSelect.data = select
          },
          change: (keys) => {
            this.tableSelect.keys = keys
          },
          data: []
        },
        selectCount: 0,
        rightShow: false
      }
    },
    created() {
      this.getTableData(1, 10)
    },
    methods: {
      getTableData(page, limit) {
        getAction(Config.mock + '/jeecg-boot/park.base/basePark/list', { page, limit }).then(res => {
          if (res.code === 200) {
            this.count = res.result.count
            this.tableData = res.result.list
          }
        })
      },
      cleanTableCheck() {
        if (this.tableSelect.keys.length > 0) {
          this.tableSelect.keys = []
          this.selectCount = 0
        }
      },
      search(query) {
        console.log('搜索内容:', query)
      },
      tableChange(pager) {
        const { current, pageSize } = pager
        this.getTableData(current, pageSize)
      },
      batchDelete() {
        const data = this.tableSelect.data
        const ids = []

        for (const item of data) {
          ids.push(item.park_id)
        }

        deleteAction(Config.mock + '/jeecg-boot/park.base/basePark/deleteBatch', { ids }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.tableSelect.keys = []
            this.getTableData(1, 10)
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "~ant-design-vue/es/style/themes/default";

  .industrial-parks-list {
    .header-col {
      & > .ant-btn + .ant-btn {
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