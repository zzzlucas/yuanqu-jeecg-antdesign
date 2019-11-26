import store from './store'

async function setup(init = false) {
  try {
    await store.dispatch('fetchParkList')
    await store.dispatch('setParkIfEmpty')
    await store.dispatch('setParkReady')
  } catch (e) {
    if (!init) {
      throw e
    }
  }
}

export default setup