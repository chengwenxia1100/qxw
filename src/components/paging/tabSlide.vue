<template>
  <div class="nav">
    <div
      :class="{'selected':tab === 1,'title':true}" class="default"
      @click="changTab(1)"
    >初中数学
    </div>
    <div
      :class="{'selected':tab === 2,'title':true}" class="default"
      @click="changTab(2)"
    >初中科学
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 1,
    }
  },
  methods: {
    changTab(index) {
      this.tab = index;
      this.$emit('tab',this.tab )
    },
  }
}
</script>
<style lang="less">
.nav {
  padding: 0 20rpx;
  height: 80rpx;
  color: #999;
  display: flex;
  .title {
    flex: 1;
    text-align: center;
  }
  .selected {
    color: #333;
    border-bottom:0.02rem #515151 solid;
  }
  // .default:first-child {
  //   border-right: 1px solid #cdcdcd;
  // }
  .default{
    margin: 0.2rem 0 0 0; 
  }
}
</style>