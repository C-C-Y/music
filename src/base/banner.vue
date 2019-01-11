<template>
  <div class="swiper">
    <swiper :options="swiperOption"
            ref="mySwiper" v-if="bannerData.length" >
      <swiper-slide v-for="item in bannerData"
                    :key="item.imageUrl"><img :src="item.imageUrl"
             alt=""
             class="img" ></swiper-slide>
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "banner",
  props: {
    bannerData: {
      type: Array,
      default: null
    },
    heightPercent: {
      type: Number,
      default: 0.25
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination", // 轮播点
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: 6000, // 整个轮播滑动总时间
        autoplayDisableOnInteraction: false, // 手动滑动后是否继续自动轮播 false为开启
        speed: 1000 //一个轮播页面滑动的时间
      }
    };
  },
  computed: {
    imgHeight() {
      let windowWidth = window.innerWidth;
      return windowWidth * this.heightPercent + "px";
    }
  }
};
</script>

<style lang="stylus" scoped>
.swiper >>>.swiper-pagination-bullet-active
  background-color red
.img
  width 100%
</style>
