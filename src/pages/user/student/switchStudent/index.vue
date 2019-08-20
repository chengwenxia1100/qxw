<template>
  <div class="switch_container">
    <div class="slide_con">
      <div class="slide" v-for="list in studentListData" :key="list">
        <div class="icon">
          <img src="/static/svg/radio_select.png" alt="">
        </div>
        <div class="mess">
          <div class="li">
            <div><span>学员姓名：</span><span>{{list.s_realname}}</span></div>
            <div><span>性别：</span><span v-if="list.sex === 1">女</span><span v-if="list.sex === 0">男</span></div>
          </div>
          <div class="li">
            <div><span>就读学校:</span><span>{{list.school}}</span></div>
            <div><span>年级：</span><span>{{list.grade}}</span></div>
          </div>
          <div class="li">
            <div><span>就读班级：</span><span v-if="list.class_id">{{list.class_id}}</span><span v-else>--</span></div>
            <div @click="update"><a>更新学员信息></a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <div class="btn_con" @click="add" v-if="!lengthMax">
        +添加
      </div>
      <div class="btn_con" style="background:#ddd" v-else>
        +添加
      </div>
      <p>*一个账号最多绑定3个学生</p>
    </div>
  </div>
</template>

<script>
import { getStudentList, getchange } from '../../user.api'

export default {
  data () {
    return {
      studentListData: {},
      student_id: '',
      bind_id: '',
      lengthMax: false
    }
  },
  created () {
    this.getStudentListData()
  },
  methods: {
    async getStudentListData () {
        const data = await getStudentList({})
        this.student_id = data[0].student_id
        this.bind_id = data[0].bind_id
        this.studentListData = data
        console.log(data.length)
        if (data.length >= 3) {
          this.lengthMax = true
        }
    },
    async getchangeData () {
        const data = await getchange({})
    },
    // 增加学员
    add () {
      const url = '../add/main';
      wx.navigateTo({ url })
    },
    // 更新学员信息
    update () {
      const url = '../update/main?student_id=' + this.student_id + '&bind_id=' + this.bind_id;
      wx.navigateTo({ url })
    }
  }
}
</script>

<style lang="less">
page {
  background:#f2f2f2;
}
.switch_container {
  font-size:0.28rem;
  .slide_con {
    .slide {
      display:flex;
      background:#fff;
      margin:0.2rem 0;
      padding:0.2rem;
      .icon {
        width:1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.64rem;
          height: 0.64rem;
        }
      }
      .mess {
        flex:1;
        .li {
          display: flex;
          padding:0.1rem 0;
          div {
            flex:1;
            span:last-child {
              color:#999;
            }
            a {
              color:#e12a22;
              text-align:right;
            }
          }
          div:nth-child(2) {
            text-align:left;
          }
        }
      }
    }
  }
  .btn {
    text-align:center;
    .btn_con {
      color:#fff;
      background:#e12a22;
      width:80%;
      height:0.8rem;
      text-align:center;
      line-height:0.8rem;
      border-radius:0.08rem;
      margin:0.4rem auto;
    }
  }
}
</style>
