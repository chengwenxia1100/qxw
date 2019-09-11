<template>
  <div class="paperRegister_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="tit">
      <span>{{paperdata.paper_name}}</span>
      <span>{{paperdata.paper_name}} </span>
      <span>总分：{{paperdata.paper_total_score}}   我的得分：{{paperdata.paper_student_score}}</span>
    </div>
    <div class="register" v-for="(list, i) in paperList" :key="i">
      <div class="register_tit" @click="slideTab(i)">
        <div class="left">第一部分 {{list.chapter_name}}（共{{list.score_total}}分）</div>
        <div class="right">我的得分：{{list.student_score_total}}</div>
        <div class="img">
          <img src="../../../assets/icon/icon_up.png" v-if="list.conFlag">
          <img src="../../../assets/icon/icon_down.png" v-else>
        </div>
      </div>
      <div class="register_con" v-if="list.conFlag">
        <div class="box">
          <div class="row tit"> 
            <div class="cell">题号</div> 
            <div class="cell">题目及答案</div> 
            <div class="cell">作答情况</div>
            <div class="cell">分值</div>
            <div class="cell">得分</div>
          </div>
          <div class="row" v-for="(item, j) in paperList[i].topic_info" :key="j">
            <div class="cell">{{item.topic_number}}</div> 
            <div class="cell blue" @click="checkDetail(item.topic_id, item.id)">查看</div> 
            <div class="cell">
              <img src="/assets/icon/icon_answer1.png" v-if="item.status == 0 || item.status == 2" @click="item.status = 1">
              <img src="/assets/icon/icon_answer_quest.png" v-if="item.status == 1"  @click="item.status = 0">
              <img src="/assets/icon/icon_answer2.png" v-if="item.status == 0 || item.status == 1"  @click="item.status = 2">
              <img src="/assets/icon/icon_answer_error.png" v-if="item.status == 2 "  @click="item.status = 0">
            </div>
            <div class="cell">{{item.topic_score}}</div>
            <div class="cell">
              <input type="text" v-model="item.student_score" 
              @blur="blur(item.status, item.topic_id, item.student_score, list.chapter_id, list.chapter_name, item.topic_number, list.topic_type, item.topic_score)">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <div class="btn_con" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { getPaperChapterList, paperTopicRegister } from '@/api/analy';

export default {
  data () {
    return {
      paperList: {},
      message: {},
      paperdata: {},
      studentScore: '1', // 孩子分数
      loading: false, // 进入页面的弹窗
    }
  },
  onLoad (option) {
    this.loading = true
    this.message = option
    this.getPaperChapterList()
  },
  computed: {
    paper_id () {
      return this.message.paper_id
    }
  },
  watch: {
    questStatus: {
      handler (val) {
        if (val) { this.status = 1} else { this.status = 0 }
      }
    },
    errorStatus: {
      handler (val) {
        if (val) { this.status = 2} else { this.status = 0 }
      }
    },
  },
  methods: {
    async getPaperChapterList () {
      const data = await getPaperChapterList({
        paper_id: this.paper_id
      })
      this.paperdata = data
      this.paperList = data.list
      this.loading = false

      this.paperList.map((item, index)=>{
        item.conFlag = false
      })
    },
    // 题目打分提交
    async paperTopicRegister (status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type) {
      const data = await paperTopicRegister({
        topic_id: topic_id,
        paper_id: this.paper_id,
        chapter_id: chapter_id,
        status: status, // 作答情况
        score: student_score,
        topic_number: topic_number,
        topic_type: chapter_name
      })
    },
    // input失去焦点
    blur (status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type, topic_score) {
      if (student_score > topic_score) {
        wx.showToast({ title: '打的分数不能高于题目分值～', icon: 'none' })
      } else if (status == 0) {
        wx.showToast({ title: '请选择做答情况～', icon: 'none' })
      } else if (student_score != topic_score && status == 1) {
        wx.showToast({ title: '没有满分都算做错哦～', icon: 'none' })
      } else if (student_score == topic_score && status == 2) {
        wx.showToast({ title: '满分应该选择答对哦～', icon: 'none' })
      } else {
        this.paperTopicRegister(status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type)
      }
    },
    // 查看详情
    checkDetail (topic_id, id) {
      const url = '/pages/paperAnaly/paperDetail/main?topic_id=' + topic_id + '&id=' + id
      wx.navigateTo({ url })
    },
    // 提交
    submit () {
      wx.showModal({
        title: '提交登记内容',
        content: '确认提交登记内容',
        cancelColor: '#666',
        confirmText: '确认',
        confirmColor: '#EA5A49',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ 
              url: '/pages/paperAnaly/analy/main?paper_id=' + this.paper_id
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    slideTab (i) {
      this.paperList.map((item, index)=>{
        if (index === i) {
          item.conFlag = !item.conFlag
        }
      })
      this.$forceUpdate();
    }
  }
}
</script>

<style lang='less'>
page {
  background:#F8FBFF;
}
.bule {
  color: #25A7F7;
}
.paperRegister_container {
  margin-bottom:1.2rem;
  font-size:0.24rem;
  .tit {
    background:#fff;
    display: flex;
    padding:0.2rem;
    color:#fff;
    margin:0 0 0 0.4rem;
    span {
      flex:1;
    }
    span:first-child {
      color:#333;
    }
    span:nth-child(2) {
      color:#666;
    }
    span:nth-child(3) {
      color:#666
    }
  }
  .register {
    &_tit {
      color:#fff;
      // background:rgba(37,167,247);
      background: #25A7F7;
      padding:0.2rem;
      border-bottom:0.02rem #fff solid;
      display:flex;
      .left {
        flex:3;
      }
      .right {
        flex:2;
      }
      .img {
        flex:1;
        text-align:right;
        img {
          width:0.32rem;
          height:0.32rem;
        }
      }
    }
    &_con {
      background:#fff;
      .tit{
        color:#25A7F7;
      }
      .box { 
        display: table;
        font-size:0.24rem;
        text-align:center;
        width:100%;
        background:#fff;
      } 
      .row { 
        display: table-row; 
      } 
      .cell { 
        display: table-cell;
        width: 20%;
        border: 1px solid #f2f2f2;
        padding:0.1rem 0;
        img {
          width: 0.36rem;
          height: 0.36rem;
        }
        img:first-child {
          margin-right:0.2rem;
        }
      }
      .blue {
        color:#1296db;
      }
    }
  }
  .btn {
    box-sizing:border-box;
    margin:0.3rem 0;
    padding:0.2rem 0;
    width:100%;
    background:#fff;
    box-shadow: 0 2px 5px #a6dcfd;
    position:fixed;
    bottom:-0.2rem;
    left:0;
    .btn_con {
      width:1.8rem;
      height: 0.6rem;
      text-align:center;
      background:#fff;
      border:0.02rem #25A7F7 solid;
      border-radius:0.08rem;
      line-height:0.6rem;
      color:#25A7F7;
      margin:0 auto;
    }
  }
}
</style>