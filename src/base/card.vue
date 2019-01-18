<template>
  <div >
    <div class="tabBox" ref="tab" >
      <span v-for="(tab,index) in tabArr"
            :key="index"
            @click="showCard(index+1)"
            :class="{'active':actualShow==index+1}"
            >{{tab}}</span>
    </div>
    <div class="content">
      <div v-for="index in tabArr.length"
           :key="index"
           v-show="ifShow(index)">
        <slot :name="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    tabArr: {
      type: Array,
      default() {
        return [];
      }
    },
    initIndex: {
      type: [Number, String],
      default: 0
    },
    secondMove: {
      type: [Number, String],
      default: 0
    },
    topHeight: {
      type: Number,
      default: 50
    },
    topPercent: {
      type: Number,
      default: 0.75
    }
  },
  data() {
    return {
      items: [],
      actualShow: this.initIndex,
      x: false
    };
  },
  methods: {
    showCard(index) {
      if (this.actualShow == index) {
        return;
      } else {
        this.actualShow = index;
      }
      this.$emit("seclect", index - 1);
    },
    ifShow(index) {
      return this.actualShow === index;
    }
  },
  watch: {
    secondMove(val) {
      const clientWidth = window.innerWidth;
      if (val == 0) {
        this.$refs.tab.style["transform"] = "translateY(0)";
        this.$refs.tab.style["webkitTransform"] = "translateY(0)";
      } else {
        let offsetY =
          -val - (this.topPercent * clientWidth - this.topHeight) - 3;
        this.$refs.tab.style["transform"] = `translateY(${offsetY}px)`;
        this.$refs.tab.style["webkitTransform"] = `translateY(${offsetY}px)`;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.tabBox
  position relative
  display flex
  justify-content space-around
  height .9rem
  align-items center
  background-color #333
  font-size 0.32rem
  color #ccc
  border-radius .3rem .3rem 0 0 
  margin-bottom -.02rem
  z-index 10
  .active
    color red
</style>
