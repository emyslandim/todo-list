<template>
  <div id="app">
    <List />
  </div>
</template>

<script>
import List from "./components/List.vue";

export default {
  name: "App",
  components: {
    List
  }
};
</script>

<style lang="scss">
body {
  background-color: $primary-color;
  font-family: $font-stack;
  color: $initial-color;
}
</style>
