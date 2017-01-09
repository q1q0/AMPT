<template>
  <div class="layou-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style lang="stylus" scoped>
@media screen and (max-width: 900px) {
  .layou-content {
    max-width: 100%;
  }
}
.layou-content
  max-width: 1024px;
  margin: 0 auto;
</style>
