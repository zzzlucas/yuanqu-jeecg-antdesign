import AssetsCategory from './components/AssetsCategory'

export default {
  data() {
    return {
      // Category
      selectCategoryKey: null,
      showCategory: true,
    }
  },
  components: {
    AssetsCategory,
  },
  methods: {
    selectCategory(keys) {
      let key = null
      if (keys[0]) {
        key = keys[0]
      }
      this.selectCategoryKey = key
    },
    async reloadCategory() {
      this.showCategory = false
      await this.$nextTick()
      this.showCategory = true
    },
    async handleEditSubmit() {
      this.loadData(1)
      this.reloadCategory()
    },
  }
}