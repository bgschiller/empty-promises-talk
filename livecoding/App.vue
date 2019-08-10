<template>
  <div id="app">
    <nav>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <a v-if="isLoggedIn" @click="logOut" href="javascript: void 0">Log Out</a>
      <router-link v-if="isLoggedIn" to="/">Profile</router-link>
    </nav>
    <main>
      <!-- The <router-view> element is where the
        router will place the component associated
        with the matched route -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
        .then(() => this.$router.push('/login'));
    },
  },
  computed: mapGetters(['isLoggedIn']),
  mounted() {
    this.$store.dispatch('checkLogin');
  },
}
</script>

<style lang="scss">
#app {
  .router-link-exact-active {
    text-decoration: none;
    color: black;
    font-weight: bold;
    cursor: default;
  }
  padding: 40px;
}
</style>
