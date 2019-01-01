<template>
  <div class="progressBar" @click.stop="play_pause">
    <svg width="32.5"
         height="32.5"
         viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50"
              cy="50"
              r="50"
              class="backgroundCircle"
              fill="transparent" />
      <circle cx="50"
              cy="50"
              r="50"
              class="barCircle"
              fill="transparent"
              :stroke-dasharray="dasharray" />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "circleprogress",
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dasharray() {
      const circleLength = Math.PI * 2 * 50;
      let progressLength = circleLength * this.percent;
      let dasharray = progressLength + ` ${circleLength + 1}`;
      return dasharray;
    }
  },
  methods: {
    play_pause() {
      this.$emit("play_pause");
    }
  }
};
</script>

<style lang="stylus" scoped>
.progressBar
  position relative
  margin-right 0.3rem
  circle
    stroke-width 6px
    transform-origin center
    transform scale(.9)
    &.backgroundCircle
      stroke #eee
    &.barCircle
      stroke red
      stroke-width  8px
      transform scale(.9) rotate(-90deg)
</style>
