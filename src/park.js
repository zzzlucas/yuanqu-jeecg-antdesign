import store from './store'

async function setup() {
  await store.dispatch('fetchParkList')
  await store.dispatch('setParkIfEmpty')
  await store.dispatch('setParkReady')
}

export default setup