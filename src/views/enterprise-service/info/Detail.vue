<template>
  <page-layout :title="title">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="内容" key="1">
          <a-spin :spinning="confirmLoading">
            <p v-html="info.context"></p>
          </a-spin>
        </a-tab-pane>

        <a-tab-pane tab="资讯图片" key="2"></a-tab-pane>
      </a-tabs>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/page/PageLayout'
import ABadge from 'ant-design-vue/es/badge/Badge'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import qs from 'querystring'
import Dom7 from 'dom7'
import moment from 'moment'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      confirmLoading: false,
      info: {},
      dict: {},
      dataSourceA: [],
      url: {
        list: '/park.service/mgrNewsInfo/queryById'
      }
    }
  },
  created() {
    getAction('/park.service/mgrNewsInfo/queryById', { id: this.$route.params.id }).then(res => {
      if (res.code === 200) {
        this.info = res.result
        // console.log(info.context)
        this.confirmLoading = false
      } else {
        // this.$router.back()
        this.$message.error(res.message)
      }
    })
  },
  mounted() {},
  methods: {
    moment,
    filterDictText
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
.flex1 {
  margin-top: 15px;
  display: flex;
  height: 420px;

  .flex11 {
    width: 55%;
    height: 100%;
    margin-right: 10px;
  }
  .flex12 {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .ant-card {
      margin-bottom: 10px;
    }
  }
}
</style>