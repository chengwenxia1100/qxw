<template>
  <div class="layer_export">
    <div class="close">
        <img src="../../assets/icon/delete.png" alt="">
    </div>
    <div class="num"><span v-for="(list, i) in total" :key="i" :class="list.style">{{list + 1}}</span></div>
    <div class="select">
        <span>全选</span>
        <img src="../../assets/icon/icon_select.png"  @click="select(i,false)" v-if="selectStatus" >
        <img src="../../assets/icon/icon_no_select.png"  @click="select(i,true)" v-else>
    </div>
    <div class="btn">
        确认导出
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
        default: 0
    }
  },
  data () {
    return {
        selectStatus: false
    }
  },
  methods: {
    select (i,type) {
        this.selectStatus = type
    }
  }
}
</script>

<style lang='less' scoped>
.layer_export {
    width:100%;
    background:#fff;
    position:fixed;
    bottom:0;
    left:0;
    border-radius: 0.32rem;
    .close {
        height:0.4rem;
        padding:0.4rem;
        img {
            width: 0.48rem;
            height: 0.48rem;
            float:right;
        }
    }
    .num {
        color:#333;
        font-size:0.32rem;
        line-height:0.38rem;
        padding: 0 0.2rem;
        span {
            // padding:0.2rem;
            float:left;
            margin-right:0.2rem;
            width:0.48rem;
            height:0.48rem;
            text-align: center;
            line-height: 0.48rem;
        }
        .selectnow {
            border-radius: 50%;
            background:#25A7F7;
        }
    }
    .select {
        clear:both;
        overflow: hidden;
        span {
            float:left;
            line-height: 0.63rem;
            padding-left:0.4rem;
        }
        img {
            width:0.64rem;
            height:0.64rem;
        }
    }
    .btn {
        height:0.8rem;
        width:100%;
        background:#25A7F7;
        color:#fff;
        text-align:center;
        line-height:0.8rem;
    }
}
</style>
