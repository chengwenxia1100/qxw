<template>
  <div>
    <div class="macklayer">
      <div class="layer">
        <div class="tit">试卷登记<img src="../../assets/svg/close.png" @click="close"></div>
        <div class="con">
          <div class="list">
            <!-- <img :src="img"> -->
            <div class="middle">
              <p>{{name}}</p>
              <p>总分:{{mask}}</p>
              <p>{{category}}</p>
            </div>
          </div>
          <div class="inout">
            <span>试卷分值</span>
            <input type="text" placeholder="请输入考试成绩" v-model="studentMark">
          </div>
          <div class="btn_con">
            <div class="btn" @click="confirm">
              确定
            </div>
          </div>
        </div>
        <!-- <fan-chart></fan-chart> -->
      </div>
    </div>
  </div>
</template>

<script>
import { sureMark } from '@/api/analy'

export default {
  data () {
    return {
      mark: '',
      studentMark: '',
      student_id: ''
    }
  },
  props: {
    macklayerStatus: {
      default: false
    },
    img: {
      default: ''
    },
    name: {
      default: '' 
    },
    mask: {
      default: ''
    },
    category: {
      default: ''
    },
    paper_id: {
      default: ''
    }
  },
  watch: {
    studentMark: {
      immediate: true,
      handler (val) {
        this.studentMark = val
        this.$emit('studentMark', val)
      }
    }
  },
  methods: {
    async sureMark () {
      const data = await sureMark({
          paper_id: this.paper_id,
          score: this.studentMark
      })
      wx.showToast({ title: '保存成功', icon: 'none' })
      this.$emit('inputMask', true)
      setTimeout(() => {
        const url = "../../pages/paperAnaly/paperRegister/main?paper_id=" + this.paper_id
        wx.navigateTo({ url })
      }, 200)
    },
    close () {
      this.$emit('macklayerStatus', false)
    },
    confirm () {
      if (this.studentMark) {
        if (this.studentMark > this.mask){
          wx.showToast({ title: '输入分数不能高于总分', icon: 'none' })
        } else {
          this.$emit('macklayerStatus', false)
          this.sureMark()
        }
      } else {
        wx.showToast({ title: '请输入考试成绩', icon: 'none' })
      }
    }
  }
}
</script>

<style lang='less'>
.macklayer {
  width:100%;
  height:100%;
  background:rgba(100,100,100, 0.3);
  position: fixed;
  top:0;
  left:0;
  .layer {
    margin:20% 0 5% 10%;
    width:80%;
    background:#fff;
    border-radius:0.04rem;
    .tit {
      font-size:0.32rem;
      width:100%;
      height:0.8rem;
      text-align:center;
      line-height:0.8rem;
      background:#25A7F7;
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
      .list {
        padding:0.2rem 0.3rem;
        display: flex;
        background:#fff;
        img {
          width:1.5rem;
          height:2rem;
        }
        .middle {
          flex:1;
          padding:0.1rem 0.2rem;
          p {
            padding:0.1rem 0;
          }
          p:nth-child(2) {
            color:#666;
          }
          p:nth-child(3) {
            color:#666;
          }
        }
      }
      .inout {
        font-size:0.34rem;
        display: flex;
        padding:0.1rem 0.3rem;
        span {
          margin-right:0.2rem;
          margin-top:0.1rem;
        }
        input {
          border:0.02rem #666 solid;
          width:2.6rem;
          height:0.6rem;
          padding:0 0.2rem;
          border-radius: 0.08rem;
        }
      }
    }
    .red {
      padding: 0 0.3rem;
      font-size:0.28rem;
      color:#e12a22;
    }
    .btn_con {
      height:1rem;
      .btn {
        width:2rem;
        height:0.6rem;
        border:0.02rem #666 solid;
        text-align:center;
        line-height:0.6rem;
        margin: 0.4rem auto 0.4rem;
        border-radius:0.08rem;
      }
    }
  }
}
</style>
