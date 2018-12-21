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
  }
};
</script>

<style lang="stylus" scoped>
.tabBox
  display flex
  justify-content space-around
  height .8rem
  line-height .8rem
  background-color #333
  font-size 0.35rem
  color #ccc
  border-radius .3rem .3rem 0 0 
</style>
