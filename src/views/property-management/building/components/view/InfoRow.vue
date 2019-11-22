<template>
  <div class="yq-building-info-row">
    <a-row>
      <a-col span="6">
        <yq-image :src="getImage(image)"></yq-image>
      </a-col>
      <a-col span="18">
        <a-row>
          <a-col span="24">{{ title }}名称：{{ info[nameKey] }}</a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import { getOneImage as getImage } from '@utils/util'
  import _ from 'lodash'

  export default {
    name: 'InfoRow',
    components: { YqImage },
    props: {
      type: {
        type: String,
        default: ''
      },
      info: {
        type: Object,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        image: ''
      }
    },
    created() {
      const data = JSON.parse(this.info.addDocFiles)
      this.image = _.get(data, '[0].url', '')
    },
    methods: {
      getImage
    },
    computed: {
      title() {
        switch (this.type) {
          case 'tower':
            return '区块'
          default:
            return ''
        }
      },
      nameKey() {
        switch (this.type) {
          case 'tower':
            return 'projectName'
          default:
            return ''
        }
      }
    },
    watch: {
      'info'(info){
        const data = JSON.parse(info.addDocFiles)
        this.image = _.get(data, '[0].url', '')
      }
    }
  }
</script>

<style lang="less">
  .yq-building-info-row {

  }
</style>