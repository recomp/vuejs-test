import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import localData from '@/mocks/getPayments';

const isLocal = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    count: 0,
    data: [],
    isLoading: false,
    isCached: false,
    page: 1,
    pageSize: 4,
  }),
  getters: {
    count: (state) => localStorage?.getItem('count') ?? state.count,
  },
  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
    set_cache(state, data) {
      localStorage.rows = JSON.stringify(data);
      localStorage.count = state.count;
      localStorage.page = state.page;
      state.isCached = true;
    },
    clear_cache(state) {
      localStorage.removeItem('rows');
      localStorage.removeItem('page');
      localStorage.removeItem('count');
      state.data = [];
      state.count = 0;
      state.page = 1;
      state.isCached = false;
    },
  },
  actions: {
    async load({ commit, state, getters }, params = {}) {
      commit('setState', { isLoading: true });
      try {
        if (!params?.page && localStorage?.getItem('rows')?.length) {
          commit('setState', { data: JSON.parse(localStorage?.getItem('rows')) });
          commit('setState', { isLoading: false });
          return;
        }
        const { data } = isLocal ? await localData(params) : await api.getPayments(params);
        if (Array.isArray(data)) {
          state.count = data.length;
          const skipValue = (Number(params?.page ?? localStorage?.getItem('page') ?? state.page) - 1) * Number(state.pageSize);
          const filteredData = isLocal ? [...data].splice(skipValue, state.pageSize) : data;
          commit('set_cache', filteredData);
          commit('setState', { data: filteredData });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
    async set_page({ commit, state, dispatch }, page = 1) {
      state.page = page;
      dispatch('load', { page });
    },
    async clear_cache({ commit, dispatch }) {
      commit('clear_cache');
      dispatch('load');
    },
  },
});
