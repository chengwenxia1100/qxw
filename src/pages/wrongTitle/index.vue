<template>
  <div class="user_wrongTitle">
    <div class="tab">
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
      <div class="tab_container">
        <div v-if="tab===1">
          <div class="tit_change">
            <div class="change" @click="showPicker">
              <img src="/static/svg/icon_change.png" alt="">
              初一
            </div>
            <div class="select">
              选择章节
              <img src="/static/svg/icon_down.png" alt="">
            </div>
          </div>
        </div>
        <div v-else>初中科学</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getOrderList } from './wrongtit.api'

export default {
  data () {
    return {
      tab: 1
    }
  },
  mounted () {
    // this.getOrderListData()
  },
  methods: {
    changTab(index) {
      this.tab = index;
    }
    // async getOrderListData () {
    //   const data = await getOrderList({
    //     current: 1,
    //     size: 12,
    //     status: 3,
    //     userId: 82
    //   })
    //   console.log(data)
    // }
  }
}
</script>

<style lang="less">
.user_wrongTitle {
  .tab {
    width: 100%;
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
        border-bottom:0.02rem #f7536a solid;
      }
      // .default:first-child {
      //   border-right: 1px solid #cdcdcd;
      // }
      .default{
        margin: 0.2rem 0 0 0; 
      }
    }
  }
  .tab_container {
    .tit_change {
      padding:0.1rem 0.2rem;
      clear:both;
      overflow:hidden;
      .change {
        background:#f2f2f2;
        float:left;
        margin-right:0.2rem;
        padding:0.1rem 0.4rem;
        img {
          width: 0.32rem;
          height: 0.32rem;
          padding-right:0.1rem;
        }
      }
      .select {
        background:#f2f2f2;
        float:left;
        width:4rem;
        display: flex;
        align-items: center;
        padding:0 0.4rem;
        img {
          width: 0.64rem;
          height: 0.64rem;
          padding-right:0.1rem;
        }
      }
    }
  }
}
 
</style>
