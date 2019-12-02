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
    // Category
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
    // Add/Edit
    async handleEditSubmit() {
      this.loadData(1)
      this.reloadCategory()
    },
    // View
    handleCustomRow(row) {
      return {
        on: {
          click: () => {
            this.viewData = row
            this.view = true
          }
        }
      }
    }
  },
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
      urlDownload: window._CONFIG['domianURL'] + "/sys/common/download/",
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

export const viewAssetsTable = {
  columns: [
    {
      title: '#',
      dataIndex: '',
      key: 'rowIndex',
      width: 60,
      align: 'center',
      customRender: (t, r, index) => Number(index) + 1
    },
    {
      title: '资产名称',
      align: 'center',
      dataIndex: 'assetName'
    },
    {
      title: '资产编号',
      align: 'center',
      dataIndex: 'assetNumber'
    },
    {
      title: '规格型号',
      align: 'center',
      dataIndex: 'assetModel'
    },
    {
      title: '使用状态',
      align: 'center',
      dataIndex: 'useStatus'
    },
  ]
}