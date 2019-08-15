import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import * as api from './api';
Vue.use(Vuex);

const state = {
  user: null,
  error: null,
  loading: false,
};

const actions = {
  login({ commit }, { username, password }) {
    if (!username || !password) {
      console.log('login info was incomplete. setting error.');
      commit('LOGIN_ERROR', 'please fill in both username and password');
      return;
    }
    commit('LOADING');

    api.login(username, password)
      .then(resp => {
        commit('SET_USER_INFO', resp.user);
        document.cookie = `user=${resp.token}`;
      })
      .catch((err) => {
        console.log('login info was incorrect. setting error.');
        commit('LOGIN_ERROR', err.message)
      });
  },
  logOut({ commit }) {
    // delete the cookie by setting its expiration to the past
    document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    commit('SET_USER_INFO', null);
  },
  checkLogin({ commit }) {
    console.log("checking cookie to see if we're already logged in");

    const tokenCookie = document.cookie
      .split(/;\s*/)
      .find((item) => item.startsWith('user='));

      if (!tokenCookie) {
        return;
      }

    const token = tokenCookie.split('=')[1];
    console.log('found a token in cookies, querying api');

    commit('LOADING');
    api.userInfo(token)
      .then((resp) => {
        console.log('success! setting user info');
        commit('SET_USER_INFO', resp.user);
      })
      .catch(() => {
        commit('DONE_LOADING');
        console.log('invalid token.')
      });
  },
};

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.user = userInfo;
    state.loading = false;
  },
  LOGIN_ERROR(state, error) {
    state.error = error;
    state.loading = false;
  },
  LOADING(state) {
    state.error = null;
    state.loading = true;
  },
  DONE_LOADING(state) {
    state.loading = false;
  },
};

const getters = {
  isLoggedIn(state) {
    return state.user !== null;
  },
}

export default new Store({
  state,
  mutations,
  actions,
  getters,
});