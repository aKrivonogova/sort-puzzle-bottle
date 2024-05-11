<script>
import bottle from './components/bottles.vue';
export default {
  components: {
    bottle
  }
}
</script>

<template>
  <div class="app">
    <bottle></bottle>
  </div>

</template>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

.app {
  width: 100%;
  height: 100%;
}
</style>
