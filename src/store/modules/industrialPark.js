import Vue from 'vue'
import { getAction } from '@api/manage'
import {
  INDUSTRIAL_PARK_ID,
  INDUSTRIAL_PARK_NAME,
  INDUSTRIAL_PARK_LIST,
} from "@/store/mutation-types"

const park = {
  namespaced: 'industrialPark',
  state: {
    ready: false,
    id: '',
    name: '',
    list: [],
  },
  mutations: {
    SET_PARK_ID: (state, id) => {
      state.id = id
      Vue.ls.set(INDUSTRIAL_PARK_ID, id)
    },
    SET_PARK_READY: (state) => {
      state.ready = true
    },
    SET_PARK_NAME: (state, name) => {
      state.name = name
      Vue.ls.set(INDUSTRIAL_PARK_NAME, name)
    },
    SET_PARK_LIST: (state, list) => {
      state.list = list
      Vue.ls.set(INDUSTRIAL_PARK_LIST, list)
    },
  },
  actions: {
    setPark: ({ commit }, { parkId, parkName, }) => {
      console.log(`Switch to park: id: ${parkId} name: ${parkName}`)
      commit('SET_PARK_ID', parkId)
      commit('SET_PARK_NAME', parkName)
    },
    setParkIfEmpty: ({ dispatch, state }) => {
      const map = {}
      state.list.forEach((item, index) => {
        map[item.parkId] = index
      })
      const storageParkId = Vue.ls.get(INDUSTRIAL_PARK_ID)
      let row = null
      // Try restore from storage
      if (storageParkId) {
        row = state.list[map[storageParkId]]
      }
      // If does not exist then just select the first one
      if (!row && state.list && state.list[0]) {
        row = state.list[0]
      }
      // The row and row.id must be exist, then dispatch setPark
      if (row && row.parkId) {
        dispatch('setPark', { parkId: row.parkId, parkName: row.parkName })
      }
    },
    setParkReady: ({ commit }) => {
      commit('SET_PARK_READY')
    },
    fetchParkList: async ({ commit }) => {
      try {
        const resp = await getAction('/park.park/basePark/list')
        if (!resp.success) {
          throw new Error()
        }
        const records = resp.result.records
        commit('SET_PARK_LIST', records)
      } catch (e) {
        this.$message.error('获取园区列表失败！')
        throw e
      }
    },
  },
}

export default park