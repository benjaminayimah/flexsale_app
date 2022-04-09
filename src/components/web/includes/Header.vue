<template>
    <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link v-if="auth" to="/dashboard">Dashboard</router-link>
    <router-link v-else :to="{ name: 'SignIn' }">Login</router-link> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Header',
    computed: mapGetters(['auth']),
}
</script>

<style scoped lang="scss">
#nav {
    padding: 30px;
    text-align: center;

    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>