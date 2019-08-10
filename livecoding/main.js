import Vue from 'vue';
import router from './router.js';
import store from './store';
import App from './App.vue';

window.app = new Vue({
  el: 'body',
  render(h) { return h(App); },
  router,
  store,
});
