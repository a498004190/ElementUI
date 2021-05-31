import axios from 'axios'
export default {
  namespaced: true,
  state: {
    userList: []
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.userList = payload
    }
  },
  actions: {
    async GetuserList({ commit }, payload) {
        const { data, status } = await axios.get('/getuserlist', {
          params: payload
        })
        if (status === 200) {
            commit('UPDATE_USER', data.data)
        }
    }
  },
  getters: {}
}
