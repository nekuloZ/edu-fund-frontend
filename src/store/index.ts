import { createStore } from "vuex";

export default createStore({
  state: {
    permissions: null,
  },
  mutations: {
    setPermissions(state, permissions) {
      state.permissions = permissions;
    },
  },
  actions: {
    async fetchPermissions({ commit }) {
      // TODO: 实现权限获取逻辑
      commit("setPermissions", []);
    },
  },
});
