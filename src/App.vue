<template>
  <div id="app">
    <nav>
      <router-link class="nav-item" to="/">Budget</router-link>
      <router-link class="nav-item" to="/converter">Currency converter</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
  @import "assets/main.scss";
</style>
