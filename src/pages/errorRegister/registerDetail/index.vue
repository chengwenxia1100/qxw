<template>
  <div class="registerDetail_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="top">
      <div class="tip"><span class="weight">章节：</span>{{book_list_name}}>{{book_name}}</div>
      <div class="tab">
        <span class="round" v-for="(list, i) in chapterListData" :key="i" 
          :style=" 'color:' + list.fontColor + '; background:' + list.bgColor "
        >
          {{list.topic_number}}
        </span>
      </div>
    </div>
    
    <div class="title" v-for="(list, i) in chapterListData" :key="i">
      <div class="tit">
        <div class="left">第{{list.topic_number}}题</div>
        <div class="right">
          <span @click="ststus1(i)" :style="'background:' + list.bgColor1">答对了</span>
          <span @click="ststus2(i)" :style="'background:' + list.bgColor2">答错了</span>
          <span @click="ststus3(i)" :style="'background:' + list.bgColor3">暂未做</span>
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
      <div class="btn_con">保存</div>
    </div>
    <div class="layer_registr" v-if="showLayer">
      <div class="layer">
        <div class="tit">批量登记<img src="../../../assets/svg/close.png" @click="close"></div>
        <div class="tip">批量登记时候，所有题目默认为正确题目，点击一次批改成错，再次点击变为未登记：蓝色 未登记 绿色 正确 红色 错误</div>
        <div class="con">
          <div class="title">{{book_list_name}}>{{book_name}}</div>
          <div class="list">
            <ul>
              <li v-for="(list, i) in chapterListData" :key="i">
                <img src="../../../assets/icon/icon_right.png" v-if="list.status == 1" @click="ststus2(i)">
                <img src="../../../assets/icon/icon_error.png" v-if="list.status == 2" @click="ststus3(i)">
                <img src="../../../assets/icon/icon_stop.png"  v-if="list.status == 3" @click="ststus1(i)">
                <p>{{list.topic_number}}</p>
              </li>
            </ul>
          </div>
          <div class="finish_btn" @click="registerFinish">
            完成
          </div>
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
      message: {},
      statusStr: '',
      topicStr: ''
    }
  },
  onLoad (option) {
    console.log(option)
    this.message = option
    this.bookTopicList()
  },
  computed: {
    book_list_id () {
      return this.message.book_list_id
    },
    book_list_name () {
      return this.message.book_list_name
    },
    book_name () {
      return this.message.book_name
    },
    book_id () {
      return this.message.book_id
    },
    grade () {
      return this.message.grade
    },
    subject_id () {
      return this.message.subject_id
    }
  },
  methods: {
    async bookTopicList () {
      this.loading = true
      const data = await bookTopicList({
        chapter_id: this.book_list_id
      })
      this.loading = false
      this.chapterListData = data.list
      for (let i of data.list) {
        if (i.status === 1) {
          i.fontColor = '#fff'
          i.bgColor = '#7ebd0c'
          i.bgColor1 = '#7ebd0c'
          i.bgColor2 = '#8d8d8d'
          i.bgColor3 = '#8d8d8d'
        } else if (i.status === 2) {
          i.fontColor = '#fff'
          i.bgColor = '#d32e0f'
          i.bgColor2 = '#d32e0f'
          i.bgColor1 = '#8d8d8d'
          i.bgColor3 = '#8d8d8d'
        } else if(i.status === 3) {
          i.fontColor = '#fff'
          i.bgColor = '#1296db'
          i.bgColor3 = '#1296db'
          i.bgColor2 = '#8d8d8d'
          i.bgColor1 = '#8d8d8d'
        } else {
          i.fontColor = '#1296db'
          i.bgColor = '#fff'
          i.bgColor1 = '#8d8d8d'
          i.bgColor2 = '#8d8d8d'
          i.bgColor3 = '#8d8d8d'
        }
      }
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
    },
    ststus1 (e) {
      this.chapterListData.forEach((item,index,arr)=>{
        if (index === e) {
          item.status = 1
          item.fontColor = '#fff'
          item.bgColor = '#7ebd0c'
          item.bgColor1 = '#7ebd0c'
          item.bgColor2 = '#8d8d8d'
          item.bgColor3 = '#8d8d8d'
          this.bookTopicRegister(item.topic_id, 1)
        }
			})
    },
    ststus2 (e) {
      this.chapterListData.forEach((item,index,arr)=>{
        if (index === e) {
          item.status = 2
          item.fontColor = '#fff'
          item.bgColor = '#d32e0f'
          item.bgColor2 = '#d32e0f'
          item.bgColor1 = '#8d8d8d'
          item.bgColor3 = '#8d8d8d'
          this.bookTopicRegister(item.topic_id, 2)
        }
			})
    },
    ststus3 (e) {
      this.chapterListData.forEach((item,index,arr)=>{
        if (index === e) {
          item.status = 3
          item.fontColor = '#fff'
          item.bgColor = '#1296db'
          item.bgColor3 = '#1296db'
          item.bgColor2 = '#8d8d8d'
          item.bgColor1 = '#8d8d8d'
          this.bookTopicRegister(item.topic_id, 3)
        }
			})
    },
    allRegister () {
      this.chapterListData.forEach((item,index,arr)=>{
        if(item.status == 0) {
          item.status= 1
        }
      })
      this.showLayer = true
    },
    close () {
      this.showLayer = false
    },
    registerFinish () {
      this.chapterListData.forEach((item,index,arr)=>{
        this.statusStr += item.status + ","
        this.topicStr += item.topic_id + ","
      })
      this.bookTopicRegister(this.topicStr, this.statusStr)
      this.showLayer = false
      wx.navigateBack({
        delta:1
      })
    }
  },
  onUnload () {
    this.statusStr = ''
    this.topicStr = ''
  }
}
</script>

<style lang='less'>
.registerDetail_container {
  font-size:0.28rem;
  margin-bottom:1rem;
  margin-top:1.5rem;
  .top {
    width:100%;
    box-sizing:border-box;
    background:#fff;
    position:fixed;
    top:0;
    left:0;
  }
  .tip {
    min-height:0.4rem;
    padding:0.2rem;
    color:#999;
    .weight{
      color:#333;
    }
  }
  .tab {
    box-sizing:border-box;
    width:100%;
    height:0.8rem;
    white-space: nowrap;
    overflow-x: scroll;
    padding:0.2rem;
    .round {
      border:0.02rem #1296db solid;
      text-align:center;
      line-height:0.5rem;
      border-radius:50%;
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      margin-right:0.2rem;
    }
  }
  .title {
    margin-bottom:0.4rem;
    .tit {
      display: flex;
      padding:0.2rem;
      border-left:0.1rem #8d8d8d solid;
      .left {
        width:1rem;
      }
      .right {
        flex:1;
        text-align:right;
        span {
          padding:0.1rem 0.2rem;
          color:#fff;
          font-size:0.24rem;
          border-radius:0.08rem;
          margin:0 0.1rem;
        }
      }
    }
    .title_con {
      background:#fff;
      .con {
        padding:0.2rem;
      }
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
    background:#fff;
    padding:0.2rem 0;
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
      .tip {
        background:#e0b752;
        color:#FE0000;
        font-size:0.24rem;                                                                                                                                                                                                                                                        
      }
      .con {
        padding:0.2rem;
        .title {
          padding-top:0.2rem;
        }
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
