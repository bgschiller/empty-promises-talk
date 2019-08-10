<template>
  <div class="profile">
    <h1>Welcome, {{ user && user.fullName }}!</h1>
    <p>
      Your login information
      <em>should</em>
      be saved in a cookie. But if you refresh this page it takes you back to /login. What gives?
    </p>
    <p>
      Fix this bug to make it so that when I refresh the page, I stay logged in and at this same route.
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Profile',
  computed: mapState(['user']),
}
</script>

<style>
.profile {
  max-width: 600px;
  margin: 0 auto;
}
</style>
