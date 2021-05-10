import Vue from 'vue'
import Vuex from './kstore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter(state) {
      console.log(state)
      return state.counter * 2
    }
  },
  mutations: {
    addCounter(state) {
      state.counter++
    }
  },
  actions: {
    addCounter({commit}) {
      commit('addCounter')
    }
  },
  modules: {
  }
})
