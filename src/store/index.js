import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import userlist from './modules/userlist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    userlist
  }
})
