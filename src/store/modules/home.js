import axios from 'axios'
export default {
  namespaced: true,
  state: {
    menuList: []
  },
  mutations: {
    UPDATE_MENU(state, payload) {
      state.menuList = payload
    }
  },
  actions: {
    async GetMenuList({ commit }) {
        const { data, status } = await axios.get('/getmenu')
        if (status === 200) {
            commit('UPDATE_MENU', data)
        }
    }
  },
  getters: {}
}