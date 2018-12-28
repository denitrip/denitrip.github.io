<template>
  <div id="app">
    <div>
      <router-view></router-view>
    </div>
    <notifications group="foo" position="bottom right" :duration="7000"/>
  </div>
</template>

<script>

  import Vue from 'vue';

export default {
}
</script>

<style scoped>

  #app {
    height: 100vh;
    background: url('./assets/background/animated_snow_2.gif');
    background-size: cover;
  }

</style>
