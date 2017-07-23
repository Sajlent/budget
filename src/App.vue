<template>
  <div id="app">
    <p>
      <router-link to="/">Budget</router-link>
      <router-link to="/converter">Currency converter</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style>
#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
