<template>
  <div class="registerDetail_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="top">
      <div class="tip"><span class="weight">章节：</span>{{book_list_name}}>{{book_name}}</div>
      <div class="tab">
        <span class="round" v-for="(list, i) in numlist" :key="i" 
          :style=" 'color:' + list.fontColor + '; background:' + list.bgColor "
          @click="cahpter(i,list.topic_num)"
        >
          {{list.topic_num}}
        </span>
      </div>
    </div>
    
    <div class="title" v-for="(list, i) in chapterListData" :key="i">
      <div class="tit">
        <div class="left">第{{list.topic_number}}题</div>
        <div class="right">
          <span @click="ststus1(list.topic_number)" :style="'background:' + list.bgColor1">答对了</span>
          <span @click="ststus2(list.topic_number)" :style="'background:' + list.bgColor2">答错了</span>
          <span @click="ststus3(list.topic_number)" :style="'background:' + list.bgColor3">暂未做</span>
        </div>
      </div>
      <div class="title_con">
        <div class="con" v-html="list.topic_content"></div>
        <div class="answer">
          <p>答案</p>
          <p v-html="list.answer.topic_answer_content"></p>
        </div>
      </div>
    </div>
    <div class="btn">
      <div class="btn_con" @click="allRegister">批量登记</div>
      <div class="btn_con" @click="save">保存</div>
    </div>
    <div class="layer_registr" v-if="showLayer">
      <div class="layer">
        <div class="tit">批量登记<img src="../../../assets/svg/close.png" @click="close"></div>
        <div class="con">
          <div class="layer_title">{{book_list_name}}>{{book_name}}</div>
          <div class="layer_list">
            <ul>
              <li v-for="(list, i) in numlist" :key="i">
                <img src="../../../assets/icon/icon_right.png" v-if="list.status == 1 || list.status == 0" @click="list.status = 2">
                <img src="../../../assets/icon/icon_error.png" v-if="list.status == 2" @click="list.status = 3">
                <img src="../../../assets/icon/icon_stop.png"  v-if="list.status == 3" @click="list.status = 1">
                <p>{{list.topic_num}}</p>
              </li>
            </ul>
          </div>
          <div class="finish_btn" @click="registerFinish">
            完成
          </div>
          <div class="tip">*红色表示错误&nbsp;&nbsp; 绿色表示正确 &nbsp;&nbsp;蓝色表示未做</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bookTopicList, bookTopicRegister } from '@/api/errorRegister'

export default {
  data () {
    return {
      loading: false,
      showLayer: false,
      chapterListData: {},
      numlist: []
,     message: {},
      statusStr: '',
      topicStr: '',
      page: 1,
      total: 0
    }
  },
  onLoad (option) {
    this.message = option
    this.bookTopicList()
  },
  computed: {
    book_list_id () {
       // return 609
     return this.message.book_list_id
    },
    book_list_name () {
      //return '第1章     三角形的初步知识'
       return this.message.book_list_name
    },
    book_name () {
      // return '1.1   认识三角形（1）'
      return this.message.book_name
    },
    book_id () {
      // return 21
      return this.message.book_id
    },
    grade () {
     //  return 8
      return this.message.grade
    },
    subject_id () {
      //return 3
       return this.message.subject_id
    }
  }, 
  methods: {
    async bookTopicList () {
      this.loading = true
      const data = await bookTopicList({
        chapter_id: this.book_list_id,
        page: this.page
      })
      this.total = data.total
      this.loading = false
      this.numlist = data.num
      this.chapterListData = data.list
      this.numlist.map((i, index) => {
        if (i.status === 1) {
          i.fontColor = '#17f972'
        } else if (i.status === 2) {
          i.fontColor = '#FE0000'
        } else if(i.status === 3) {
          i.fontColor = '#095889'
        } else {
          i.bgColor = '#25A7F7'
          if (i.is_now === 1) {
            i.fontColor = '#25A7F7'
          } else {
            i.fontColor = '#fff'
          }
        }
        if (i.is_now === 1) {
          i.bgColor = '#fff'
        }
      })
      this.chapterListData.map((i,index) => {
        if (i.status === 1) {
          i.bgColor1 = '#3BA707'
          i.bgColor2 = '#a6dcfd'
          i.bgColor3 = '#a6dcfd'
        } else if (i.status === 2) {
          i.bgColor2 = '#FE0000'
          i.bgColor1 = '#a6dcfd'
          i.bgColor3 = '#a6dcfd'
        } else if(i.status === 3) {
          i.bgColor3 = '#25A7F7'
          i.bgColor2 = '#a6dcfd'
          i.bgColor1 = '#a6dcfd'
        } else {
          i.bgColor1 = '#a6dcfd'
          i.bgColor2 = '#a6dcfd'
          i.bgColor3 = '#a6dcfd'
        }
      })
    },
    async bookTopicRegister (topic_id, status) {
      const data = await bookTopicRegister({
        book_id: this.book_id,
        chapter_id: this.book_list_id,
        topic_id: topic_id,
        status: status,
        grade: this.grade,
        subject_id: this.subject_id
      })
      this.paperList = data
      this.loading = false
      // this.bookTopicList()
      if (this.page < this.total) {
        this.page = this.page + 1
        this.bookTopicList()
      } else {
        wx.showToast({ title: '题目已经是最后一题啦～', icon: 'none' })
      }
    },
    ststus1 (e) {
      this.loading = true
      this.numlist.forEach((item,index,arr)=>{
        if (index === (e-1)) {
          item.status = 1
          item.fontColor = '#21C788'
        }
      })
      this.chapterListData[0].status = 1
      this.chapterListData[0].bgColor1 = '#21C788'
      this.chapterListData[0].bgColor2 = '#a6dcfd'
      this.chapterListData[0].bgColor3 = '#a6dcfd'
      this.$forceUpdate();
      this.bookTopicRegister(this.chapterListData[0].topic_id, 1)
    },
    ststus2 (e) {
      this.loading = true
      this.numlist.forEach((item,index,arr)=>{
        if (index === (e-1)) {
          item.status = 2
          item.fontColor = '#FE0000'
        }
      })
      this.chapterListData[0].status = 1
      this.chapterListData[0].bgColor1 = '#a6dcfd'
      this.chapterListData[0].bgColor2 = '#FE0000'
      this.chapterListData[0].bgColor3 = '#a6dcfd'
      this.$forceUpdate();
      this.bookTopicRegister(this.chapterListData[0].topic_id, 2)
    },
    ststus3 (e) {
      this.loading = true
      this.numlist.forEach((item,index,arr)=>{
        if (index === (e-1)) {
          item.status = 3
          item.fontColor = '#25A7F7'
          item.bgColor = '#fff'
        }
      })
      this.chapterListData[0].status = 3
      this.chapterListData[0].bgColor1 = '#a6dcfd'
      this.chapterListData[0].bgColor2 = '#a6dcfd'
      this.chapterListData[0].bgColor3 = '#25A7F7'
      this.$forceUpdate();
      this.bookTopicRegister(this.chapterListData[0].topic_id, 3)
    },
    cahpter (e, page) {
      this.page = page
      this.numlist.forEach((item,index,arr)=>{
        if (index === e) {
          item.fontColor = '#25A7F7'
          item.bgColor = '#fff'
        }
			})
      this.bookTopicList()
    },
    allRegister () {
      this.chapterListData.forEach((item,index,arr)=>{
        if(item.status == 0) {
          item.status= 1
        }
      })
      this.showLayer = true
    },
    save  () {
      wx.showToast({ title: '保存成功～', icon: 'none' })
      setTimeout(() => {
        wx.navigateBack({
          delta:1
        })
      }, 1000);
    },
    close () {
      this.showLayer = false
    },
    registerFinish () {
      this.numlist.forEach((item,index,arr)=>{
        if(item.status === 0) { item.status = 1 }
        this.statusStr += item.status + ","
        this.topicStr += item.topic_id + ","
      })
      this.bookTopicRegister(this.topicStr, this.statusStr)
      this.showLayer = false
      setTimeout(() => {
        wx.navigateBack({
          delta:1
        })
      }, 500);
    }
  },
  onUnload () {
    this.chapterListData = {}
    this.numlist = {}
    this.statusStr = ''
    this.topicStr = ''
    this.page = 1
  }
}
</script>

<style lang='less' scoped>
.registerDetail_container {
  font-size:0.28rem;
  margin-bottom:1rem;
  margin-top:1.5rem;
  .top {
    width:100%;
    box-sizing:border-box;
    background:#25A7F7;
    position:fixed;
    top:0;
    left:0;
  }
  .tip {
    min-height:0.4rem;
    padding:0.2rem;
    color:#92D3FB;
    .weight{
      color:#92D3FB;
    }
  }
  .tab {
    box-sizing:border-box;
    width:100%;
    height:0.8rem;
    padding:0 0.5rem;
    white-space: nowrap;
    overflow-x: scroll;
    .round {
      text-align:center;
      line-height:0.5rem;
      border-radius:50%;
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      margin-right:0.2rem;
      border-radius:50%;
    }
  }
  .title {
    background:#fff;
    margin:2.4rem 0.3rem 0.3rem 0.3rem;
    border-radius:0.08rem;
    padding:0.2rem;
    box-shadow: 5px 5px 10px #a6dcfd;
    .tit {
      display: flex;
      padding:0.2rem;
      .left {
        width:1rem;
        font-size:0.32rem;
        color:#333;
      }
      .right {
        flex:1;
        text-align:right;
        span {
          padding:0.1rem 0.2rem;
          color:#fff;
          font-size:0.22rem;
          border-radius:0.08rem;
          margin:0 0.1rem;
        }
      }
    }
    .title_con {
      padding: 0 0.3rem;
      .answer {
        padding:0.2rem;
        p:first-child {
          color:#1296db;
          margin-bottom:0.2rem;
        }
      }
    }
  }
  .btn {
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    height:0.6rem;
    padding:0.2rem 0 0.4rem;
    display:flex;
    text-align:center;
    padding-bottom:0.2rem;
    .btn_con {
      margin-right:0.4rem;
      width:1.6rem;
      height:0.6rem;
      border:0.02rem #25A7F7 solid;
      color:#25A7F7;
      border-radius:0.08rem;
      line-height:0.6rem;
      text-align:center;
    }
    .btn_con:first-child {
      margin-left:2rem;
    }
  }
  .layer_registr {
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
        background: #25A7F7;
        color:#fff;
        img {
          width: 0.36rem;
          height: 0.36rem;
          float:right;
          margin-right:0.3rem;
          margin-top:0.3rem;
        }
      }
      .tip {
        // background:#e0b752;
        color:#FE0000;
        font-size:0.24rem;                                                                                                                                                                                                                                                        
      }
      .con {
        padding:0.2rem;
        .layer_title {
          padding-top:0.2rem;
        }
        .layer_list {
          height:3rem;
          overflow-y: scroll;
          ul {
            clear:both;
            overflow:hidden;
            li {
              float:left;
              width:0.7rem;
              margin: 0.2rem;
              img {
                width: 0.64rem;
                height: 0.64rem;
              }
              p {
                text-align:center
              }
            }
          }
        }
      }
      .finish_btn {
        width:1.8rem;
        height: 0.6rem;
        border:0.02rem #ddd solid;
        border-radius:0.08rem;
        margin:0.2rem auto;
        line-height:0.6rem;
        text-align:center;
      }
    }
  }
}
</style>
