<template>
  <a-modal title="选择资产" v-model="show" @ok="close" @cancel="close">
    <!-- Filter -->
    <a-form layout="inline" @keyup.enter.native="searchQuery">
      <a-row :gutter="24">
        <a-col :xl="24">
          <a-form-item label="关键字" style="width: 100%;">
            <a-input placeholder="资产名称、资产编号、规格型号" v-model="queryParam.keyword" style="width: 100%;"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- Table -->
    <a-table
      size="middle"
      bordered
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
    </a-table>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <!-- Footer -->
    <template slot="footer">
      <a-button
        key="submit"
        type="primary"
        @click="done">
        完成
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    model: {
      prop: 'value',
      event: 'close',
    },
    data() {
      return {
        // Filter
        queryParam: {
          keyword: '',
        },
        // Table
        columns: [

        ],
        data: [

        ],
        pagination: {

        }
      }
    },
    methods: {
      searchQuery() {

      },
      done() {

      },
      close() {
        this.$emit('value', false)
      },
    }
  }
</script>
