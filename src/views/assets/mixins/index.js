import AssetsCategory from '../components/AssetsCategory'

export default {
  data() {
    return {
      selectCategoryKey: null,
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
  }
}