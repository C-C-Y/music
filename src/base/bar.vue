<template>
  <div class="barBox"
       ref="outerBar"
       @click="progressJump">
    <div class="innerBar"
         ref="innerBar"></div>
    <img class="dot"
         ref="dot"
         src="../assets/img/dot.png"
         @touchstart.prevent="progressTouchStart"
         @touchmove.prevent="progressTouchMove"
         @touchend="progressTouchEnd">
  </div>
</template>
<script>
import { prefixStyle } from "asset/js/dom.js";
const transform = prefixStyle("transform");
export default {
  name: "bar",
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    progressJump(e) {
      this.setOffset(e.offsetX);
      this.changeTime();
    },
    setOffset(offset) {
      let dotOffset = offset - 8.85 + "px";
      this.$refs.innerBar.style.width = offset + "px";
      this.$refs.dot.style[transform] = `translate(${dotOffset},-50%)`;
    },
    progressTouchStart(e) {
      this.touch.initialed = true;
      this.touch.startX = e.touches[0].clientX;
      this.touch.startOffset = this.$refs.innerBar.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.initialed) {
        return;
      }
      let moveWidth = e.touches[0].clientX - this.touch.startX;
      let newOffset = Math.min(
        Math.max(0, this.touch.startOffset + moveWidth),
        this.$refs.outerBar.clientWidth
      );
      this.setOffset(newOffset);
    },
    progressTouchEnd() {
      this.touch.initialed = false;
      this.changeTime();
    },
    changeTime() {
      let barWidth = this.$refs.outerBar.clientWidth;
      let innerBarWidth = this.$refs.innerBar.clientWidth;
      let newPercent = innerBarWidth / barWidth;
      this.$emit("changePercent", newPercent);
    }
  },
  watch: {
    percent(val) {
      if (val >= 0 && !this.touch.initialed) {
        const outerWidth = this.$refs.outerBar.clientWidth;
        let offsetWidth = val * outerWidth;
        this.setOffset(offsetWidth);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.barBox
  width 63% vw
  height 0.07rem
  border-radius 0.02rem
  margin 0 0.25rem
  background-color #aaa
  opacity 0.8
  position relative
  .innerBar
    height 100%
    background-color red
    width 0
    border-radius 0.02rem
  .dot
    position absolute
    top 50%
    left 0
    transform translate(-50%, -50%)
    width 0.35rem
    height 0.35rem
    border-radius 0.175rem
    z-index 20
</style>
