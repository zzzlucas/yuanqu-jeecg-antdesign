import AssetsCategory from './components/AssetsCategory'

export const list = {
  data() {
    return {
      // Category
      selectCategoryKey: null,
      showCategory: true,
      // View modal/aside
      viewData: {},
      view: false,
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

export const view = {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'show',
    event: 'change'
  },
  data() {
    return {
      title: '',
      modal: false,
    }
  },
  methods: {
    close() {
      this.$emit('change', false)
    }
  },
  watch: {
    show(val) {
      this.modal = val
    }
  }
}