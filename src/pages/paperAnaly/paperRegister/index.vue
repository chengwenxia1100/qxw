<template>
  <div class="paperRegister_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="tit">
      <span> {{paperdata.paper_name}} </span>
      <span>总分：{{paperdata.paper_total_score}}  </span>
      <span style="line-height:1.5rem;">我的得分：{{paperdata.paper_student_score}}<br/>目前得分：{{paperdata.paper_student_register_score}}</span>
    </div>
    <div class="register" v-for="(list, i) in paperList" :key="i">
      <div class="register_tit" @click="slideTab(i)">
        <div class="left"> {{list.chapter_name}}（共{{list.score_total}}分）</div>
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
            <div class="cell icon">
              <img src="../../../assets/icon/icon_answer1.png" v-if="item.status == 0 || item.status == 2" @click="selectIcon(i,j,1)">
              <img src="../../../assets/icon/icon_right.png" v-if="item.status == 1"  @click="item.status = 0">
              <img src="../../../assets/icon/icon_answer2.png" v-if="item.status == 0 || item.status == 1"  @click="selectIcon(i,j,2)">
              <img src="../../../assets/icon/icon_error.png" v-if="item.status == 2 "  @click="item.status = 0">
            </div>
            <div class="cell">{{item.topic_score}}</div>
            <div class="cell input">
              <img src="../../../assets/icon/icon_less.png" @click="selectIcon(i, j, 'less')" v-if="item.status == 2">
              <input type="number" :style="{'width': (item.status == 2 ? '1.7rem':'100%')}"  v-model="item.student_score" 
              @blur="blur(i, item.status, item.topic_id, item.student_score, list.chapter_id, list.chapter_name, item.topic_number, list.topic_type, item.topic_score)">
              <img src="../../../assets/icon/icon_add.png" @click="selectIcon(i, j, 'add')" v-if="item.status == 2">
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
import { getPaperChapterList, paperTopicRegister, checkRegister } from '@/api/analy';

export default {
  data () {
    return {
      paperList: {},
      message: {},
      paperdata: {},
      status: 0,
      studentScore: '1', // 孩子分数
      loading: false, // 进入页面的弹窗
    }
  },
  onLoad (option) {
    this.loading = true
    this.message = option
    // this.message.paper_id = 16
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
    async getPaperChapterList (i) {
      const data = await getPaperChapterList({
        paper_id: this.paper_id
      })
      this.paperdata = data
      this.paperList = data.list
      this.loading = false
      this.paperList.map((item, index)=>{
        if (item.status == 2) {
          this.width = '65rem'
        }
        if (index == i) {
          item.conFlag = true
        } else {
          item.conFlag = false
        }
      })
    },
    // 题目打分提交
    async paperTopicRegister (i, status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type) {
      const data = await paperTopicRegister({
        topic_id: topic_id,
        paper_id: this.paper_id,
        chapter_id: chapter_id,
        status: status, // 作答情况
        score: student_score,
        topic_number: topic_number,
        topic_type: chapter_name
      })
      this.getPaperChapterList(i)
    },
    // input失去焦点
    blur (i, status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type, topic_score) {
      if (student_score > topic_score) {
        wx.showToast({ title: '不能高于总分', icon: 'none' })
        return
      } 
      this.paperTopicRegister(i, status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type)
    },
    // 查看详情
    checkDetail (topic_id) {
      const url = '/pages/paperAnaly/paperDetail/main?topic_id=' + topic_id
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
            checkRegister({
              paper_id: this.paper_id
            }).then(res => {
              console.log(res);
              wx.navigateTo({ 
                url: '/pages/paperAnaly/analy/main?isShare=1&paper_id=' + this.paper_id
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 模块切换
    slideTab (i) {
      this.paperList.map((item, index)=>{
        if (index === i) {
          item.conFlag = !item.conFlag
        } else {
          item.conFlag = false
        }
      })
      this.$forceUpdate();
    },
    // 计算分数
    selectIcon (i,j,status) {
      this.loading = false
      let score = this.paperList[i].topic_info[j].topic_score
      let student_score = this.paperList[i].topic_info[j].student_score
      let topic_id = this.paperList[i].topic_info[j].topic_id
      let topic_number = this.paperList[i].topic_info[j].topic_number
      let chapter_id = this.paperList[i].chapter_id
      let chapter_name = this.paperList[i].chapter_name
      let topic_type = this.paperList[i].topic_type
      
      if (status == 1) { // 做对
        this.status = 1
        this.paperList[i].topic_info[j].status = 1
        this.paperList[i].topic_info[j].student_score = this.paperList[i].topic_info[j].topic_score
      }
      if (status == 2) { // 做错
        this.status = 2
        this.paperList[i].topic_info[j].status = 2
        this.paperList[i].topic_info[j].student_score = 0
      }
      if (status == 'less') { // 点击减
        this.status = 2
        this.paperList[i].topic_info[j].status = 2
        if (student_score > 0) {
           this.paperList[i].topic_info[j].student_score = Number(this.paperList[i].topic_info[j].student_score) - 0.5
        } else {
          wx.showToast({ title: '不能低于0分!', icon: 'none' })
          return
        }
      }
      if (status == 'add') { // 点击加
        this.status = 2
        this.paperList[i].topic_info[j].status = 2
        this.paperList[i].topic_info[j].student_score
        if (student_score < score - 0.5) {
           this.paperList[i].topic_info[j].student_score = Number(this.paperList[i].topic_info[j].student_score) + 0.5
        } else {
          wx.showToast({ title: '答错的题目等于总分或高于总分', icon: 'none' })
          return
        }
      }
      this.paperTopicRegister(i, this.status, topic_id, this.paperList[i].topic_info[j].student_score, chapter_id, chapter_name, topic_number, topic_type)
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
  padding-bottom:2rem;
  font-size:0.24rem;
  .tit {
    background:#fff;
    display: flex;
    padding:0.2rem;
    color:#fff;
    // margin:0 0 0 0.4rem;
    span {
      flex:1;
      text-align:center;
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
        border: 1px solid #f2f2f2;
        padding:0.1rem 0;
        vertical-align:middle;
      }
      .cell:first-child {
        width: 15%;
      }
      .cell:nth-child(2) {
        width: 20%;
      }
      .cell:nth-child(3) {
        width: 25%;
      }
      .cell:nth-child(4) {
        width: 15%;
      }
      .cell:nth-child(5) {
        width: 25%;
      }
      .icon {
        img {
          width: 0.48rem;
          height: 0.48rem;
        }
        img:first-child {
          margin-right:0.2rem;
        }
      }
      .input {
        img {
          width:0.56rem;
          height:0.56rem;
          float:left;
        }
        input {
          float:left;
          padding-top:0.05rem;
        }
      }
      .blue {
        color:#1296db;
      }
    }
  }
  .register:last-child {
    margin-bottom:1.6rem;
  }
  .btn {
    box-sizing:border-box;
    margin:0.3rem 0;
    padding:0.2rem 0 0.5rem;
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