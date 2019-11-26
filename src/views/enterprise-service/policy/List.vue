<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label>
              <a-input placeholder="政策标题" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="8">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
          <a-col :md="4" :sm="8">
            <a-dropdown v-if="selectedRowKeys.length > 0">
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="batchDel">
                  <a-icon type="delete" />删除
                </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                批量操作
                <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-col>
          <a-col :md="8" :sm="8" style="float:right;">
            <a-button style="float:right;margin-left: 8px" type="primary" @click="AddAInfoForm">发布政策</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="16" :sm="8">
            <a-form-item label="政策类别">
              <a-button-group>
                <a-button
                  v-for="(item, key) in dict.talentPolicy"
                  :key="key"
                  :type="btn.indexOf(item.value) !== -1 ? 'primary' : 'default'"
                  value="item.value"
                  @click="btnClick(key, item.value)"
                >{{ item.text || item.label }}</a-button>
              </a-button-group>
              <!-- <a-checkbox-group v-decorator="['typeGroups']"> -->
              <a-checkbox-group @change="searchQuery" v-model="queryParam.typeGroups">
                <!-- <a-checkbox value>不限</a-checkbox> -->
                <a-checkbox
                  v-for="(item, key) in dict.talentPolicy"
                  :key="key"
                  value="item.value"
                >{{ item.text || item.label }}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="16" :sm="8">
            <a-form-item label="发布部门">
              <a-checkbox-group @change="searchQuery" v-model="queryParam.deptGroups">
                <!-- <a-checkbox value>不限</a-checkbox> -->
                <a-checkbox
                  v-for="(item, key) in dict.publishingDepartment"
                  :key="key"
                  :value="item.value"
                >{{ item.text || item.label }}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="16" :sm="8">
            <a-form-item label="发布状态">
              <a-radio-group @change="searchQuery" v-model="queryParam.isPublic">
                <a-radio-button value>不限</a-radio-button>
                <a-radio-button value="1">已发布</a-radio-button>
                <a-radio-button value="0">未发布</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div class="industrial-parks-list">
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
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
      >
        <span slot="action" slot-scope="text, record" @click.stop>
          <a-popconfirm
            v-if="record.isPublic == 0"
            title="确定发布吗?"
            @confirm="() => changeInfoForm(record, ...arguments)"
          >
            <a>发布</a>
          </a-popconfirm>
          <a-divider v-if="record.isPublic == 0" type="vertical" />

          <a v-if="true" @click.stop="EditInfoForm(record, ...arguments)">编辑</a>
          <a-divider type="vertical" />
          <a v-if="true" @click.stop="EditInfoForm(record, ...arguments)">删除</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <add-a-info-form ref="AddAInfoForm" @reload="loadData"></add-a-info-form>
  </a-card>
</template>

<script>
import { mixinList } from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import AddAInfoForm from './AddAInfoForm'
import { getAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'
import moment from 'moment'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import _ from 'lodash'

export default {
  name: 'IndustrialParksList',
  components: { AddAInfoForm },
  mixins: [JeecgListMixin, mixinList],
  data() {
    return {
      description: '',
      dict: {},
      btn:[],
      columns: [
        {
          title: '标题',
          align: 'center',
          dataIndex: 'titile'
        },
        {
          title: '发布时间',
          align: 'center',
          dataIndex: 'publishTime',
          width: 180,
          customRender: text => {
          return moment(text).format('YYYY-MM-DD HH:mm')
          }
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'isPublic',
          width: 150,
          customRender: text => {
            if (text == '0') {
              return '未发布'
            } else if (text == '1') {
              return '已发布'
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 200
        }
      ],
      url: {
        list: '/park.service/mgrPolicyInfo/list'
      },
      queryParam: {
        // typeGroups: '',
        // deptGroups: ''
      },
      temprow: '',
      rightShow: false
    }
  },
  computed: { ...mapGetters(['industrialParkId']) },
  created() {},
  methods: {
    moment,
    btnClick(key, value){
      const btn = _.clone(this.btn)
      if(_.get(btn, `[${key}]`)){
        _.unset(btn)
        this.btn = btn
      } else {
        _.set(btn, `[${key}]`, value)
      }
    },
    initConfig() {
      initDictOptions('policy_type').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.talentPolicy = res.result
        }
      })
      initDictOptions('publishing_department').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.publishingDepartment = res.result
        }
      })
    },
    loadData() {
      // if (arg === 1) {
      //   this.ipagination.current = 1
      // }
      var params = this.getQueryParams()
      console.log('params')
      console.log(params)
      this.loading = true
      this.initConfig()
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            //拿到id
            this.$router.push({
              name: 'enterprise-service-policy-detail-@id',
              params: { id: row.policyId }
            })
          }
        }
      }
    },
    //发布
    changeInfoForm(record) {
      //解决俩类别需要提交的问题
      //先从后端给的数组中获取组合成自己的数组
      //1
      let typeGroups = []
      for (const item of record.types) {
        typeGroups.push(item.labelNo)
      }
      typeGroups = typeGroups.toString()
      //2
      let deptGroups = []
      for (const item of record.depts) {
        deptGroups.push(item.labelNo)
      }
      deptGroups = deptGroups.toString()
      let params = { isPublic: '1', policyId: record.policyId, typeGroups, deptGroups }
      params = qs.stringify(params)
      putAction('/park.service/mgrPolicyInfo/edit', params).then(res => {
        if (res.code === 200) {
          this.$message.success('发布成功')
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    searchReset() {
      this.queryParam = { parkId: this.industrialParkId }
      this.loadData(1)
    },
    searchQuery() {
      this.loadData(1)
    },
    AddAInfoForm() {
      this.$refs.AddAInfoForm.Add()
    },
    EditInfoForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AddAInfoForm.detail(row)
    }
  }
}
</script>
<style lang="less">
@import '../../../assets/less/common.less';
</style>