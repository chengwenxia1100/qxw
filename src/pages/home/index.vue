<template>
  <div class="home_container"> 
      <page-loading v-model='loading'>
        加载中...
      </page-loading>
      <div class="login_mess">
        <div class="left">
          <div class="slide1">
            <div><span>学生姓名：</span><span v-if="studentData.s_realname">{{studentData.s_realname}}</span></div>
            <div><span>性别：</span><span v-if="studentData.sex === 1">女</span><span v-if="studentData.sex === 0">男</span></div>
          </div>
          <div class="slide2">
            <span>就读学校: </span><span v-if="studentData.school">{{studentData.school}}</span>
          </div>
          <div class="slide3">
            <div><span>就读年级：</span><span v-if="studentData.grade">{{studentData.grade}}</span></div>
            <div><span>班级：</span><span v-if="studentData.class_id">{{studentData.class_id}}</span></div>
          </div>
        </div>
        <div class="right" v-if="studentData.student_status === 0">
          <div class="bind" @click="jump('bind')">
            绑定/登录
          </div>
        </div>
        <div class="right" v-if="studentData.student_status === 1">
          <div class="change" @click="showPicker">
            <img src="/static/svg/icon_change.png" alt="">
            切换学员
          </div>
          <mpvue-picker
            ref="mpvuePicker"
            :mode="mode"
            :pickerValueDefault="pickerValueDefault"
            @onConfirm="onConfirm"
            :pickerValueArray="pickerValueArray" />
        </div>
      </div>
      <div class="bg"></div>
      <div class="home_model">
        <ul>
          <li @click="jump('1')">
            <div>
              <img class="home-icon" src="/static/svg/home_icon3.png" />
            </div>
            <p>错题本</p>
          </li>
          <li @click="jump('2')">
            <div>
              <img class="home-icon" src="/static/svg/home_icon1.png" />
            </div>
            <p>错题登记</p>
          </li>
          <li @click="jump('3')">
            <div>
              <img class="home-icon" src="/static/svg/home_icon2.png" />
            </div>
            <p>试卷分析</p>
          </li>
          
          <li>
            <div>
              <img class="home-icon" src="/static/svg/home_icon4.png" />
            </div>
            <p>错题归因</p>
          </li>
          <li>
            <div>
              <img class="home-icon" src="/static/svg/home_icon5.png" />
            </div>
            <p>每日一题</p>
          </li>
          <li>
            <div>
              <img class="home-icon" src="/static/svg/home_icon6.png" />
            </div>
            <p>记忆引擎</p>
          </li>
          <li>
            <div>
              <img class="home-icon" src="/static/svg/home_icon7.png" />
            </div>
            <p>导出记录</p>
          </li>
          <li>
            <div>
              <img class="home-icon" src="/static/svg/home_icon7.png" />
            </div>
            <p>勤学中心</p>
          </li>
        </ul>
      </div>
      <div class="curve">
        <div class="curve_tit">成绩曲线</div>
        <div class="curve_con">
          <p><span>学科: </span><span v-if="studentData.subject">{{studentData.subject}}</span></p>
          <div class="chart">
            <div class="chart_con" v-if="studentData.student_status === 1">
              <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
            </div>
            <div class="no_chart" v-else>
              暂无数据
            </div>
          </div>
        </div>
      </div>
      <div class="advice">
        <div class="advice_tit">
          通知公告
        </div>
        <div class="advice_con" v-if="studentData.notice">
          {{studentData.notice}}
        </div>
      </div>
  </div>
</template>

<script>
import { getchange, getStudentList, getHome } from '@/api/student';
import echarts from 'echarts';
import mpvueEcharts from 'mpvue-echarts';
import mpvuePicker from "mpvue-picker";
import store from '@/store';
import { getToken } from '@/tools/auth';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    backgroundColor: '#fff',
    color: ['#37A2DA', '#f0f', '#ddd'],
    legend: {
      data: ['数学', '英语', '科学']
    },
    grid: {
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['数学', '英语', '科学', '历史', '语文']
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'A',
        type: 'line',
        smooth: true,
        data: [57, 98, 80]
      },
      {
        name: 'B',
        type: 'line',
        smooth: true,
        data: [18, 95, 100]
      },
      {
        name: 'C',
        type: 'line',
        smooth: true,
        data: [90, 98, 100]
      },
    ]
  }; // ECharts 配置项
  chart.setOption(option);
  return chart; // 返回 chart 后可以自动绑定触摸操作
}

export default {
  components: {
    mpvueEcharts,
    mpvuePicker
  },
  data () {
    return {
      echarts, // 折线图
      onInit: initChart, //折线图
      pickerValueArray: [],//切换学员选择框
      studentData: {},
      loading: false, // 进入页面的弹窗
      studentId: ''
    }
  },
  computed: {
    token () {
      return getToken()
    }
  },
  mounted (){
    // console.log(this.token)
  },
  watch: {
    token: {
      // immediate: true,
      handler (val) {
        if (val) {
          setTimeout(() => {
            this.getHome()
          }, 1000)
        }
      }
    }
  },
  methods: {
    // 请求首页接口
    async getHome () {
      const data = await getHome({})
      this.studentData = data.student_info
      this.studentId = data.student_info.id
      if(data.student_info.student_status === 1) { this.getStudentList() }
    },
    // 获取学员列表
    async getStudentList () {
      const data = await getStudentList({
        token: this.token
      })
      this.pickerValueArray = data;
      this.pickerValueArray.map((item,index) => {
        item.label = item.s_realname
        item.value = item.student_id
      })
    },
    // 切换学员
    showPicker () {
      this.$refs.mpvuePicker.show()
    },
    onConfirm (e) {
        console.log(e.value[0])
        // 切换完成请求切换接口
        this.getchangeData(e.value[0])
    },
    // 切换完成请求切换接口 
    async getchangeData (id) {
      const data = await getchange({
        student_id: id
      })
      this.getHome()
    },
    // 首页各种跳转
    jump (type) {
      if (!this.userInfo) { // 如果用户信息不存在
        this.userLogin()
      } else {
        switch (type) {
          case '1':
            wx.navigateTo({ url: '../wrongTitle/main' }) // 跳转到错题本页面
            break
          case '2':
            wx.navigateTo({ url: '../errorRegister/main?student_id=' + this.studentId }) // 跳转到错题登记页面
            break
          case '3':
            wx.navigateTo({ url: '../paperAnaly/main' }) // 跳转到错题分析页面
            break
          case 'bind':
            wx.navigateTo({ url: '../bind/bindfirst/main' }) // 绑定注册
            break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  padding-bottom:0.2rem;
  .bg {
    height:0.2rem;
    width:100%;
    background:#f2f2f2;
  }
  .tit{
    background:#f2f2f2;
    width:100%;
    font-size:0.24rem;
    padding:0.1rem 0;
  }
  .login_btn {
    margin:0.2rem auto;
    border-radius:0.5rem;
    font-size:0.32rem;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background:#fff!important;
      width:80%;
      height:0.8rem;
      background:#fff;
      border-radius:0.5rem;
      border:0.02rem #f2f2f2 solid;
    }
  }
  .login_mess {
    display: flex;
    font-size:0.28rem;
    background: #fff;
    .left {
      flex:1;
      .slide_same {
        padding:0.2rem 0.4rem 0.2rem 0.2rem;
        clear:both;
        overflow: hidden;
        div:first-child {
          float:left;
           
        }
        div:nth-child(2) {
          float:right;
        }
      }
      .slide1 {
        .slide_same
      }
      .slide2 {
        .slide_same
      }
      .slide3 {
        .slide_same
      }
    }
    .right {
      width:2rem;
      padding:0.2rem 0;
      .bind {
        border:0.02rem #333 solid;
        width:1.6rem;
        height:0.8rem;
        border-radius:0.18rem;
        text-align: center;
        line-height: 0.8rem;
      }
      .change {
        text-align:center;
        display: flex;
        align-items:center;
        img {
          width: 0.32rem;
          height: 0.32rem;
          padding-right:0.2rem;
        }
      }
    }
  }
  .home_model {
    background: #fff;
    ul {
      clear:both;
      overflow:hidden;
      li {
        width:25%;
        float:left;
        padding: 0.2rem;
        box-sizing:border-box;
        text-align:center;
        div {
          background: #666;
          border-radius:50%;
          width: 1.4rem;
          height: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .home-icon {
            width: 0.64rem;
            height: 0.64rem;
          }
        }
        p {
          font-size:0.28rem;
          padding:0.1rem 0;
        }
      }
    }
  }
  .curve {
    &_tit {
      .tit
    }
    &_con {
      padding:0.2rem 0;
      p {
        font-size:0.28rem;
        span:first-child {
          font-weight:bold;
        }
      }
      .chart {
        background:#fff;
        .chart_con {
          width:100%;
          height:5rem;
        }
        .no_chart {
          padding:0.5rem 0;
          font-size:0.32rem;
          display:flex;
          justify-content: center;
          align-content: center;
        }
      }
    }
  }
  .advice {
    &_tit {
      .tit
    }
    &_con {
      font-size:0.32rem;
      text-align:center;
      padding:0.2rem 0;
    }
    .advice_con {
      background:#fff;
    }
  }
}
</style>