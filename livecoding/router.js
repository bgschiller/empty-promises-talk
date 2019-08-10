import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);
import store from './store';
const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Profile, meta: { requiresAuth: true },
  },
];

const router = new Router({
  routes,
  mode: 'history',
});

router.beforeEach((to, _from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  console.log('in router auth guard. isLoggedIn?', isLoggedIn);
  if (!isLoggedIn && to.matched.some(record => record.meta.requiresAuth)) {
    console.log('user is not logged in and route requires auth. redirecting to login');
    next({ path: '/login' });
    return;
  }
  next();
});
export default router;