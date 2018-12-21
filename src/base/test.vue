<template>
  <div>
    <card :initIndex = "1" :tabArr = "tabs">
      <div slot="1">one</div>
      <div slot="2">two</div>
      <div slot="3">three</div>
    </card>
  </div>
</template>

<script>
import card from "base/card.vue";
export default {
  name: "test",
  components: {
    card
  },
  data() {
    return {
      tabs: ["标签一", "标签二", "标签三"]
    };
  }
};
</script>

<style lang="stylus" scoped>

</style>
