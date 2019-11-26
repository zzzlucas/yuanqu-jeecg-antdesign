import { filterObj } from '@/utils/util';
import store from '@/store'
import AppBase from './AppBase'
import { getAction } from '@api/manage'

/**
 * View(查看/详情) mixin
 *
 * To use:
 *
 * ```
 * import ViewMixin from '@mixins/View';
 *
 * export default {
 *   mixins: [ViewMixin],
 *   // other logic...
 * }
 * ```
 */
export default {
  mixins: [
    AppBase
  ],
  data() {
    const parkId = store.state.industrialPark.id
    return {
      // 接口Url
      url: {
        info: '',
      },
      // 查询条件
      queryParam: {},
      // 园区id
      parkId,
      // 加载flag
      loading: true,
      // 主内容
      info: {},
    }
  },
  methods: {
    /**
     * 检查路由配置
     * @return Boolean
     */
    checkRouteConfig() {
      if (typeof this.$route.params.id !== 'string') {
        this.$router.back()
        this.$message.warning('ID不正确')
        return false
      }
      return true
    },
    /**
     * 加载数据
     */
    async loadData() {
      if (!this.url.info) {
        this.$message.error("请设置url.info属性!")
        return
      }
      const params = this.getQueryParams()
      this.loading = true
      try {
        const data = getAction(this.url.info, params)
        if (!data.success) {
          throw new Error(data.message)
        }
        if (data.code === 510) { // What is code 510?
          this.$message.warning(data.message)
        }
      } catch (e) {
        this.$message.error(e.message)
      }
      this.loading = false
    },
    /**
     * Get查询条件
     * @return Object
     */
    getQueryParams() {
      const params = Object.assign({}, this.queryParam)
      return filterObj(params)
    }
  },
}

/**
 * 额外可混入项
 *
 * + created()
 */
export const created = {
  created() {
    this.checkRouteConfig()
  }
}