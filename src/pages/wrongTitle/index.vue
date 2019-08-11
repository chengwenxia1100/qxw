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
            <div class="change" @click="mpvuePicker">
              <img src="/static/svg/icon_change.png" alt="">
              初一
            </div>
            <mpvue-picker
              ref="mpvuePicker"
              :mode="mode"
              :pickerValueDefault="pickerValueDefault"
              @onChange="onChange"
              @onConfirm="onConfirm"
              @onCancel="onCancel"
              :pickerValueArray="pickerValueArray" />
            <div class="select">
              选择章节
              <img src="/static/svg/icon_down.png" alt="">
            </div>
          </div>
          <div class="title_box">
            <div class="list">
              <p>1/20</p>
              <div class="tit" v-html="title"></div>
              <div class="title_analyse" @click="analyseBtn">试题分析</div>
            </div>
            <div class="list">
              <div class="tit" v-html="title"></div>
              <div class="title_analyse" @click="analyseBtn">试题分析</div>
            </div>
          </div>
        </div>
        <div v-else>dd
        </div>
      </div>
      <!-- 分页 -->
      <page-slide></page-slide>
    </div>
    <!-- 点击试题分析 出现弹窗 -->
    <div class="layer_box" v-if="analyLayer">
      <div class="layer">
        <div class="tit">题目详情<img src="/static/svg/close.png" @click="close"></div>
        <div class="con">
          <ul>
            <li><span>【答案】</span><span>A</span></li>
            <li><span>【来源】</span><span>受精卵发育开始，到胎儿从母体内产出为止，</span></li>
            <li><span>【难度】</span><span>1</span></li>
            <li><span>【知识点】</span><span>受精卵发育开始，到胎儿从母体内产出为止，</span></li>
          </ul>
        </div>
        <fan-chart></fan-chart>
      </div>
    </div>
  </div>
</template>

<script>
// import { getOrderList } from './wrongtit.api'
import mpvuePicker from "mpvue-picker";
import pageSlide from '@/components/paging/pageSlide'
import fanChart from '@/components/echart/fanChart'

export default {
  components: {
    mpvuePicker,
    pageSlide,
    fanChart
  },
  data () {
    return {
      tab: 1,
      pickerValueDefault: [2],
      pickerValueArray: [
        {
          label: '用户二',
          value: 1
        },
        {
          label: '用户三',
          value: 2
        }
      ],
      pickerValueArray2: [
        {
          label: '用户二',
          value: 1
        },
        {
          label: '用户三',
          value: 2
        }
      ],
      // 返回的试题题目
      title: '<p><span style=";font-family:宋体;font-size:14px">1.<span style="font-family:宋体">从受精卵发育开始，到胎儿从母体内产出为止，所需的时间约为（</span></span><span style=";font-family:宋体;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">）</span></span></p><p><span style=";font-family:宋体;font-size:14px">A.2<span style="font-family:宋体">个多月</span></span><span style=";font-family:宋体;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=";font-family:宋体;font-size:14px">B.3<span style="font-family:宋体">个多月</span></span><span style=";font-family:宋体;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=";font-family:宋体;font-size:14px">C.9<span style="font-family:宋体">个多月</span></span><span style=";font-family:宋体;font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=";font-family:宋体;font-size:14px">D.1<span style="font-family:宋体">年左右</span></span></p>',
      analyLayer: false, // 点击试题分析弹窗
    }
  },
  mounted () {
    // this.getOrderListData()
  },
  methods: {
    changTab(index) {
      this.tab = index;
    },
    mpvuePicker () {
        this.$refs.mpvuePicker.show()
    },
    onConfirm (e) {
        console.log(e)
    },
    onChange (e) {
        console.log(e)
    },
    onCancel (e) {
        console.log(e)
    },
    init () {
    },
    // 点击试题分析
    analyseBtn () {
      this.analyLayer = true;
    },
    close () {
      this.analyLayer = false;
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
  .layer_box {
    width:100%;
    height:100%;
    background:rgba(100,100,100, 0.3);
    position: fixed;
    top:0;
    left:0;
    .layer {
      margin:20% 0 0 10%;
      width:80%;
      background:#fff;
      border-radius:0.04rem;
      .tit {
        font-size:0.32rem;
        width:100%;
        height:0.8rem;
        text-align:center;
        line-height:0.8rem;
        background:rgb(180, 178, 178);
        color:#fff;
        img {
          width: 0.36rem;
          height: 0.36rem;
          float:right;
          margin-right:0.3rem;
          margin-top:0.3rem;
        }
      }
      .con {
        padding:0.2rem;
        ul {
          li {
            span:first-child {
              font-weight:bold;
              font-size:0.26rem;
            }
            span:last-child {
              color:#333;
              font-size:0.26rem;
            }
          }
        }
      }
    }
  }
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
    .title_box {
      padding:0.2rem;
      .title_analyse {
        font-size:0.28rem;
        width:1.8rem;
        height:0.6rem;
        line-height:0.6rem;
        background:#f7536a;
        color:#fff;
        margin:0.4rem;
        border-radius: 0.08rem;
        text-align:center;
      }
    }
  }
}
</style>
