<template>
  <div class="login">
    <form @submit.prevent="tryLogin">
      <label for="username">
        username
        <input
          v-model="username"
          name="username"
          placeholder="hint: try 'jrrtolkien'"
          :disabled="loading"
        />
      </label>
      <label for="password">
        password
        <input
          v-model="password"
          type="password"
          placeholder="hint: try 'fellowship'"
          :disabled="loading"
        />
      </label>
      <input
        type="submit"
        :disabled="loading"
      />
      <p v-if="loading">loading...</p>
      <p v-if="success" class="success">Success! Redirecting to your profile...</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { sleep } from '../utils';
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapState(['error', 'loading']),
    ...mapGetters({ success: 'isLoggedIn' }),
  },
  methods: {
    tryLogin() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          if (this.error) return;
          return sleep(2000).then(() => this.$router.push('/'));
        });
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    width: 200px;
    label {
      margin-bottom: 10px;
    }
  }
  max-width: 600px;
  margin: 0 auto;
}
</style>
