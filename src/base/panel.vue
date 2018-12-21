<template>
  <div v-show="ifShow()">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "panel"
};
</script>

<style lang="stylus" scoped>

</style>
