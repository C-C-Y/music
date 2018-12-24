<template>
  <div >
    <div class="tabBox" ref="tab" >
      <span v-for="(tab,index) in tabArr"
            :key="index"
            @click="showCard(index+1)"
            class="tab">{{tab}}</span>
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
    },
    ifShow(index) {
      return this.actualShow === index;
    }
  },
  watch: {
    secondMove(val) {
      if (val == 0) {
        this.$refs.tab.style["transform"] = "translateY(0)";
        this.$refs.tab.style["WebkitTransform"] = "translateY(0)";
      } else {
        let clientWidth = window.innerWidth;
        let offsetY = -val - (0.75 * clientWidth - 50) - 3;
        this.$refs.tab.style["transform"] = `translateY(${offsetY}px)`;
        this.$refs.tab.style["WebkitTransform"] = `translateY(${offsetY}px)`;
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
  height .8rem
  line-height .8rem
  background-color #333
  font-size 0.35rem
  color #ccc
  border-radius .3rem .3rem 0 0 
  z-index 10
</style>
