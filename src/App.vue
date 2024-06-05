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

:root {
  .green {
    background-color: #00AF64;
  }

  .red {
    background-color: #DC143C;
  }

  .yellow {
    background-color: gold;
  }

  .blue {
    background-color: #534ED9;
  }

  .orange {
    background-color: orange;
  }

  .violet {
    background-color: #6F0AAA;
  }

  .pink {
    background-color: deeppink;
  }
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
