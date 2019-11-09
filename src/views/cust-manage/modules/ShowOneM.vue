<template>
<!-- 一个没有用到的modal框而已 -->
  <a-modal
    :title="title"
    :width="1300"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    destroyOnClose
    :footer="null"
  >
    <a-card :bordered="false">
      <a-form :form="form">
        <a-row>
          <a-col :span="7">
            <a-form-item label="跟踪日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-range-picker></a-range-picker>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="跟踪人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select style="width:100%" defaultValue="1">
                <a-select-option value="1">小张</a-select-option>
                <a-select-option value="2">小李</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </a-modal>
</template>
<script>
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
export default {
  mixins: [JeecgListMixin],
  name: 'SysAnnouncementModal',
  components: {},
  data() {
    return {
      record: {},

      visible: false,
      loading: false,
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      url: {
        list: '/park.project/mgrProjectTrace/list'
      }
    }
  },
  created() {},
  methods: {
    showCard(record) {
      this.$refs.ShowCard.detail(record)
    },
    twoShowOne(record) {
      // console.log('showone')
      this.$emit('showOneToZero', record)
    },
    handleOk() {},
    detail(record) {
      this.visible = true
      this.record = record
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>

<style lang="less">
</style>
