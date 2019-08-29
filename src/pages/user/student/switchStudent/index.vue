<template>
  <div class="switch_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="slide_con">
      <div class="slide" v-for="(list, i) in studentListData" :key="i"  @click="switchSlide(list.student_id)">
        <div class="icon">
          <img :src="selectIcon" v-if="list.checked">
          <img :src="noselectIcon" v-else>
        </div>
        <div class="mess">
          <div class="li">
            <div><span>学员姓名：</span><span>{{list.s_realname}}</span></div>
            <div><span>性别：</span><span v-if="list.sex === 1">女</span><span v-if="list.sex === 0">男</span></div>
          </div>
          <div class="li">
            <div><span>就读学校: </span><span>{{list.school}}</span></div>
            <div><span>年级：</span><span>{{list.grade}}</span></div>
          </div>
          <div class="li">
            <div><span>就读班级：</span><span v-if="list.class_id">{{list.class_id}}</span><span v-else>--</span></div>
            <div @click="update(list.student_id, list.bind_id)"><a>更新学员信息></a></div>
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
import { getchange, getStudentList } from '@/api/student';

export default {
  data () {
    return {
      studentListData: {},
      bind_id: '',
      lengthMax: false,
      loading: false
    }
  },
  onLoad () {
    this.loading = true
    this.getStudentListData()
  },
  computed: {
    selectIcon () {
      return require('@/assets/icon/icon_clicked.png')
    },
    noselectIcon () {
      return require('@/assets/icon/icon_no_select.png')
    }
  },
  methods: {
    async getStudentListData () {
        const data = await getStudentList({})
        this.student_id = data[0].student_id
        this.bind_id = data[0].bind_id
        this.studentListData = data

        this.loading = false

        this.studentListData.map((item,index) => {
          if (item.student_status === 1) { item.checked = true }
        })

        if (data.length >= 3) {
          this.lengthMax = true
        }
    },
    // 点击切换事件
    switchSlide (id) {
      this.loading = true
      this.getchangeData(id)
    },
    async getchangeData (id) {
        console.log(id)
        const data = await getchange({
          student_id: id
        })
        this.getStudentListData()
    },
    // 增加学员
    add () {
      const url = '../add/main';
      wx.navigateTo({ url })
    },
    // 更新学员信息
    update (id, bindId) {
      const url = '../update/main?student_id=' + id + '&bind_id=' + bindId;
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
              color:#1296db;
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
      background:#25a7f7;
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
