<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "app",
  mounted() {
    this.handleOnresize();
    window.onresize = () => {
      this.handleOnresize();
    };
  },
  methods: {
    ...mapMutations({
      setViewWidth: "SET_VIEW_WIDTH",
    }),
    handleOnresize() {
      const viewWidth = document.body.clientWidth;
      this.setViewWidth(viewWidth);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
