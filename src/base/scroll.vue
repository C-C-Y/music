<template>
   <div ref="wrapper">
     <slot></slot>
   </div>
</template>

<script>
import BScroll from "better-scroll" ;
export default {
  name:"scroll",
  props:{
    probeType:{
      type:Number,
      default:1
    },
    data:{
      type:Array,
      default:null
    },
    click:{
      type:Boolean,
      default:true
    }
  },
  methods:{
    initScroll(){
      if(!this.$refs.wrapper){
        return
      }else{
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          click:this.click
        })
      }
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  },
  mounted(){
    this.nextTick(()=>{
      this.initScroll()
    })
  },
  watch:{
    data(){
      this.$nextTick(()=>{
        this.refresh()
      })
    }
  }
} 
</script>

<style lang="stylus" scoped>

</style>
