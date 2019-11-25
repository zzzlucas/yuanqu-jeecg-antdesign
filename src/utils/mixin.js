// import Vue from 'vue'
import { mapState } from "vuex";
import store from '@/store'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      multipage: state => state.app.multipage,//多页签设置
      fixedHeader: state => state.app.fixedHeader,
      fixSiderbar: state => state.app.fixSiderbar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,
      sidebarOpened: state => state.app.sidebar.opened
    })
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device,
    })
  },
  methods: {
    isMobile () {
      return this.device === 'mobile'
    },
    isDesktop () {
      return this.device === 'desktop'
    }
  }
}

const mixinList = {
  data() {
    const parkId = store.state.industrialPark.id
    return {
      dictesCreateFields: [
        // Dictes generate rules, one elem for one dict name
      ],
      types: {
        // Dictes, hard-code types defined here.
      },
      // Common query params
      queryParam: {
        parkId,
      },
    }
  },
  methods: {
    async initDictConfig() {
      const fields = this.dictesCreateFields
      // Break on empty dictesCreateFields
      if (!fields.length) {
        return
      }
      const types = Object.assign({}, this.types)
      let promises = []
      fields.forEach(item => promises.push(initDictOptions(item)))
      try {
        for (const [index, promise] of promises.entries()) {
          const response = await promise
          const field = fields[index]
          if (!response.success) {
            throw new Error(`获取${field}字典时发生错误`)
          }
          types[field] = response.result
        }
        this.types = types
      } catch (e) {
        this.$message.error(e.message)
        throw e
      }
    },
  },
}

export {
  mixin,
  mixinDevice,
  mixinList,
}