<template>
  <div class="analy_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <!-- 试卷信息 -->
    <div class="paper_list">
      <div class="list">
        <!-- <img :src="paperMess.url"> -->
        <div class="middle">
          <p>{{paperMess.name}}</p>
          <p>总分:{{paperMess.score}}</p>
          <p>{{paperMess.category}}</p>
        </div>
        <div class="status">
          <p class="mark">{{paperMess.student_score}}</p>
        </div>
      </div>
    </div>
    <!--扇形图-->
    <!-- <div class="chart_con">
      <div class="tab">
        <div class="btn" @click="seleceTab(1)" :style="'background:' + bgcolor1 + ';color:' + fontColor1">得分情况</div>
        <div class="btn" @click="seleceTab(2)" :style="'background:' + bgcolor2 + ';color:' + fontColor2">失分情况</div>
        <div class="btn" @click="seleceTab(3)" :style="'background:' + bgcolor3 + ';color:' + fontColor3">得分率</div>
      </div>
      <div class="con" v-if="getStatus">
        <progress-ring-bar :progress="progress"></progress-ring-bar>
      </div>
      <div class="con" v-if="lostStatus">
        <progress-ring-bar :progress="progress"></progress-ring-bar>
      </div>
      <div class="con" v-if="progressStatus">
        <progress-ring-bar :progress="progress"></progress-ring-bar>
      </div>
    </div> -->
    <!--学生错题列表-->
    <div class="potic">
      <h2>学生错题</h2>
      <div class="topic_list" v-for="(list, j) in paperAnalyData.wrong_topic" :key="j">
        <div class="type">{{list.label}}</div>
        <div class="box">
          <div class="row"> 
            <div class="cell">题号</div> 
            <div class="cell">班级得分率</div> 
            <div class="cell">知识点</div>
            <div class="cell"></div>
          </div>
          <div class="row" v-for="(item, i) in paperAnalyData.wrong_topic[j].list" :key="i"> 
            <div class="cell blue">{{item.topic_number}}</div> 
            <div class="cell">{{item.true_rate}}</div> 
            <div class="cell">{{item.point_name}}</div>
            <div class="cell blue" @click="checkDetail(item.topic_id, item.id)">查看详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import progressRingBar from '@/components/progress/progressRingBar'
import { paperAnalysis } from '@/api/analy';

export default {
  components: {
    progressRingBar
  },
  data () {
    return {
      macklayer: false, // 弹窗的显示与隐藏
      tip:false, // 弹窗中未输入考试成绩中的提示
      value: '', // 考试成绩的值
      on: true,
      loading: false,
      getStatus: true,
      lostStatus: true,
      progressStatus: true,
      paperAnalyData: {},
      paperMess: {},
      getInfo: {},
      loseInfo: {},
      getRate: {},
      message: {},
      bgcolor1: '#1296db',
      fontColor1: '#fff',
      bgcolor2: '',
      fontColor2: '',
      bgcolor3: '',
      fontColor3: '',
      isShare: false,
      progress: 20 // 进度条
    }
  },
  onLoad (option) {
    this.loading = true
    this.message = option
    this.paper_id = option.paper_id
    // this.message.paper_id = 16
    this.paperAnalysis()
  },
  computed: {
    // paper_id () {
    //   return this.message.paper_id
    // }
  },
  methods: {
    async paperAnalysis () {
      const data = await paperAnalysis({
        paper_id: this.paper_id
      })
      setTimeout(() => {
        this.loading = false
      }, 500);
      this.paperAnalyData = data
      this.paperMess = data.paper_info
      this.getInfo = data.paper_type.get_info
      this.loseInfo = data.paper_type.lose_info
      this.getRate = data.paper_type.get_rate
    },
    // 查看详情
    checkDetail (topic_id, id) {
      const url = '../paperDetail/main?topic_id=' + topic_id + '&id=' + id
      wx.navigateTo({ url })
    },
    // 去登记
    goRegister () {
      this.macklayer = true;
    },
    close () {
      this.macklayer = false;
    },
    confirm () {
      if (this.value) {
        this.macklayer = false;
      } else {
        this.tip = true;
      }
    },
    getMask () {
      this.bgcolor = '#1296db'
      this.fontColor = '#fff'
    },
    seleceTab (e) {
      if (e == 1) {
        this.getStatus = true
        this.lostStatus = false
        this.progressStatus = false
        this.progress = 20
        this.bgcolor1 = '#1296db'
        this.fontColor1 = '#fff'
        this.bgcolor2 = '#fff'
        this.fontColor2 = '#1296db'
        this.bgcolor3 = '#fff'
        this.fontColor3 = '#1296db'
      }
      if (e == 2) {
        this.lostStatus = true
        this.getStatus = false
        this.progressStatus = false
        this.progress = 30
        this.bgcolor2 = '#1296db'
        this.fontColor2 = '#fff'
        this.bgcolor1 = '#fff'
        this.fontColor1 = '#1296db'
        this.bgcolor3 = '#fff'
        this.fontColor3 = '#1296db'
        
      }
      if (e == 3) {
        this.progressStatus = true
        this.lostStatus = false
        this.getStatus = false
        this.progress = 40
        this.bgcolor3 = '#1296db'
        this.fontColor3 = '#fff'
        this.bgcolor1 = '#fff'
        this.fontColor1 = '#1296db'
        this.bgcolor2 = '#fff'
        this.fontColor2 = '#1296db'
      }
    }
  },
  onUnload () {
    if (this.message.isShare == '1') {
      wx.navigateBack({ delta: 3 })
    }
  }
}
</script>

<style lang="less">
.analy_container {
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
    .status {
      width:2rem;
      padding:0.1rem 0;
      display: flex;
      align-items: center;
      position:relative;
      p {
        font-size:0.42rem;
        color:#707070;
        font-weight:bold;
      }
      .mark {
        font-size:0.64rem;
        color:#e12a22;
      }
    }
  }
  .chart_con {
    margin:0.2rem 0;
    background:#fff;
    height:5.4rem;
    .tab {
        clear:both;
        overflow: hidden;
        .btn {
            width:1.6rem;
            height:0.6rem;
            float:left;
            color:#1296db;
            line-height:0.6rem;
            text-align:center;
            border-radius:0.12rem;
            margin:0.2rem;
            border:0.02rem #1296db solid;
        }
        .on {
            background: #1296db;
            color:#fff;
        }
    }
  }
  .potic {
    margin-bottom:0.4rem;
    h2 {
      padding:0.1rem 0.2rem;
    }
    .type {
      font-size:0.24rem;
      padding:0.2rem;
      background:#25A7F7;
      color:#fff;
    }
    .box { 
      display: table; 
      font-size:0.24rem;
      text-align:center;
      width:100%;
      background:#fff;
      padding-bottom:0.1rem;
    } 
    .row { 
      display: table-row; 
    } 
    .cell { 
      display: table-cell; 
      width: 20%;
      border: 1px solid #f2f2f2;
      padding:0.1rem 0;
    }
    .blue {
      color:#1296db;
    }
  }
}
</style>
