<template>
   <div ref="wrapper">
     <slot></slot>
   </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: null
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    bounce: {
      type: [Object, Boolean],
      default() {
        return true;
      }
    }
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      } else {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          bounce: this.bounce
        });
        if (this.listenScroll) {
          let me = this;
          this.scroll.on("scroll", pos => {
            me.$emit("scroll", pos);
          });
        }
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>
