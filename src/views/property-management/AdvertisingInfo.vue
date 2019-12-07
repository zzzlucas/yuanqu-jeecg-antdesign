<template>
  <page-layout :title="data.advertName">
    <template slot="action">
      <a-button type="primary" @click="handleEdit">编辑</a-button>
    </template>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <template v-if="activeTabKey === 'basic'">
        <detail-list>
          <detail-list-item term="广告位名称">{{ data.advertName }}</detail-list-item>
          <!-- TODO -->
          <detail-list-item term="所属建筑项目">{{ data.projectId }}</detail-list-item>
          <!-- TODO -->
          <detail-list-item term="详细地址">{{ data.projectId }} {{ data.address }}</detail-list-item>
        </detail-list>
        <detail-list v-if="data.price">
          <detail-list-item term="收费单价">{{ data.price }}</detail-list-item>
          <detail-list-item term="收费单位">{{ data.unit }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="联系人">{{ data.contactPerson }}</detail-list-item>
          <detail-list-item term="联系电话">{{ data.contactTel }}</detail-list-item>
        </detail-list>
        <!-- TODO -->
        <detail-list>
          <detail-list-item term="开放时间起">{{ data.begDate }}</detail-list-item>
          <detail-list-item term="开放时间止">{{ data.endDate }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="预定须知">{{ data.remarks }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="广告位详情">{{ data.summary }}</detail-list-item>
        </detail-list>
      </template>
      <template v-if="activeTabKey === 'image'">
        <j-upload ref="uploader" />
      </template>
    </a-card>
    <!-- Add/Edit form -->
    <advertising-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </page-layout>
</template>

<script>
  import PageLayout from '@/components/page/PageLayout'
  import DetailList from '@/components/tools/DetailList'
  import JUpload from '@/components/jeecg/JUpload'
  import AdvertisingEditForm from './components/AdvertisingEditForm'
  import ViewMixin from '@/mixins/View'
  import { url, viewAdPlace } from './api'
  const DetailListItem = DetailList.Item

  export default {
    mixins: [
      ViewMixin,
    ],
    components: {
      PageLayout,
      DetailList,
      DetailListItem,
      JUpload,
      AdvertisingEditForm,
    },
    data() {
      return {
        // Url
        url: url.meetingRoom,
        // Tab
        tabList: [
          {
            key: 'basic',
            tab: '基本信息'
          },
          {
            key: 'image',
            tab: '图片'
          },
        ],
        activeTabKey: 'basic',
      }
    },
    methods: {
      // Route
      getRouteParams() {
        return { id: this.$route.params.id }
      },
      // Request data
      async loadData() {
        this.loadDetail()/*.then(() => {
          this.$refs.uploader.initFileList(this.data.addDocFiles)
        })*/
      },
      async loadDetail() {
        this.loading = true
        try {
          const resp = await viewAdPlace(this.getRouteParams())
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.data = resp.result
        } catch (e) {
          this.$message.error(e.message)
        }
        this.loading = false
      },
      // Edit submit
      async handleEditSubmit() {
        this.loadData()
      },
    },
    async created() {
      if (!this.checkRouteConfig()) {
        return
      }
      await this.initDictConfig()
      this.loadData()
    }
  }
</script>