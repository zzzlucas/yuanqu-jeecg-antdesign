<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator annual">
      <a-form :form="form" :layout="formLayout">
        <a-row :gutter="24">
          <a-col :span="3">
            <a-form-item label="区分" :label-col="formItem.label" :wrapper-col="formItem.value">
              <a-select style="width: 150px" @change="handleChange" v-model="queryParam.type">
                <a-select-option value>不限</a-select-option>
                <a-select-option value="YS">预算</a-select-option>
                <a-select-option value="SJ">实际</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col>
            <span
              style="float: left;overflow: hidden;"
              class="table-page-search-submitButtons local"
            >
              <a-button
                style="margin-left:15px"
                @click="goAnnualAchieveAddForm()"
                type="primary"
                icon="plus"
              >新增完成情况</a-button>
              <a-button
                style="margin-left: 8px"
                type="danger"
                icon="delete"
                @click="batchDel"
                v-if="selectedRowKeys.length > 0"
              >批量删除</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div class="annual-achieve-list">
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a
            v-if="record.year!='总和'"
            @click.stop="showAnnualAchieveAddForm(record, ...arguments)"
          >编辑</a>
          <a-divider v-if="record.year!='总和'" type="vertical" />
          <a-popconfirm
            v-if="record.year!='总和'"
            title="确定删除吗?"
            @confirm="() => handleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <annual-achieve-add-form ref="AnnualAchieveAddForm" @loaddata="loadData"></annual-achieve-add-form>
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AnnualAchieveAddForm from './modules/AnnualAchieveAddForm'
import { postAction, putAction, getAction } from '@/api/manage'
import qs from 'querystring'
import Dom7 from 'dom7'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: { AnnualAchieveAddForm },
  mixins: [JeecgListMixin],
  data() {
    return {
      description: '',
      form: this.$form.createForm(this),
      formLayout: 'horizontal',
      queryParam: {
        type: ''
      },
      formItem: {
        label: { span: 1 },
        value: { span: 5 }
      },
      yearOrMonth: '年度',
      columns: [
        {
          title: () => this.yearOrMonth,
          align: 'center',
          dataIndex: 'year',
          width: 100
        },
        {
          title: '区分',
          align: 'center',
          dataIndex: 'type',
          customRender: function(t, r, index) {
            // console.log(t);
            if (t == 'YS') return '预算'
            if (t == 'SJ') return '实际'
            // return parseInt(index) + 1
          }
        },
        {
          title: '地区生产总值',
          align: 'center',
          dataIndex: 'originalLeader'
        },
        {
          title: '规模以上工业总产值',
          align: 'center',
          dataIndex: 'industrialOutput'
        },
        {
          title: '全社会固定资产投资额',
          align: 'center',
          dataIndex: 'allFixedInvest'
        },
        {
          title: '工业固定资产投资额',
          align: 'center',
          dataIndex: 'industrialFiexedInvest'
        },
        {
          title: '智能制造产业收入',
          align: 'center',
          dataIndex: 'intelligentIndustrialIncome'
        },
        {
          title: '一般预算收入',
          align: 'center',
          dataIndex: 'generalBudgetIncome'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'remark',
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        listN: '/park.indicators/baseIndicatorsMsg/list',
        listM: '/park.indicators/baseIndicatorsMsg/listFinish',
        delete: '/park.indicators/baseIndicatorsMsg/delete',
        deleteBatch: '/park.indicators/baseIndicatorsMsg/deleteBatch'
      },
      deleteKey: 'id',
      rightShow: false,
      EE: ''
    }
  },

  created() {},
  computed: { ...mapGetters(['industrialParkId']) },
  methods: {
    handleChange(e) {
      //因为后端给的api不是同一个查询口子
      if (e) {
        //保存这个EE状态，删除完后刷新依旧会走这个
        this.EE = e
      }
      this.loading = true
      // console.log(this.EE);
      if (this.EE == 'YS') {
        this.yearOrMonth = '年度'
        getAction(this.url.listN, { type: 'YS', parkId: this.industrialParkId }).then(res => {
          if (res.success) {
            console.log('预算筛选成功')
            this.dataSource = res.result
            for (const item of res.result) {
              item.year = item.year + '年'
            }
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      } else if (this.EE == 'SJ') {
        this.yearOrMonth = '月度'
        getAction(this.url.listN, { type: 'SJ', parkId: this.industrialParkId }).then(res => {
          if (res.success) {
            console.log('实际筛选成功')
            this.dataSource = res.result
            for (const item of res.result) {
              item.year = item.month + '月'
            }
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      } else {
        this.yearOrMonth = '年度'
        getAction(this.url.listM, { parkId: this.industrialParkId }).then(res => {
          if (res.success) {
            console.log('不限筛选成功')
            this.dataSource = res.result
            for (const item of res.result) {
              item.year = item.year + '年'
            }
          } else {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      }
    },
    //初加载时候就走handleChange的默认路线
    loadData() {
      this.handleChange()
    },

    goAnnualAchieveAddForm() {
      this.$refs.AnnualAchieveAddForm.add()
    },
    showAnnualAchieveAddForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      console.log(row.year)
      this.$refs.AnnualAchieveAddForm.edit(row)
    },
    customRow(row) {
      return {
        on: {
          // click: () => {
          //   this.$router.push({ name: 'industrial-parks-info-@id', params: { id: row.parkId } })
          // }
        }
      }
    }
  }
}
</script>
<style lang="less" scope>
@import '../../assets/less/common.less';
// .annual-achieve-list{}
.annual {
  .ant-form-item-label {
    width: auto;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
  .local {
    margin-top: 4px;
  }
}
</style>