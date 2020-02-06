import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stores: []
  },
  mutations: {
    setStores (state, payload) {
      state.stores = payload
    }
  },
  actions: {
    async fetchPharmacies () {
      const json = await fetch('https://kiang.github.io/pharmacies/json/points.json')
        .then(res => res.json())
      this.commit('setStores', json)
    }
  },
  modules: {
  }
})
