<template>
  <div class="register_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <!-- 筛选框组件 -->
    <two-select
      @subject="subjectFun"
      @grade="gradeFun"
    ></two-select>
    <!-- 作业本列表 -->
    <div class="bookList_con">
      <div class="list" v-for="(item, i) in errorBookListData" :key="i" @click="chapterList(item.book_id)">
        <img :src="item.url" v-if="item.url">
        <img src="/static/images/user.png" v-else>
        <div class="middle">
          <p>{{item.name}}</p>
          <p>{{item.semester}}</p>
          <p>浙江教育出版社</p>
        </div>
        <!-- <div class="show">
          <gap-chart></gap-chart> 
          <p>登记进度</p>
        </div> -->
      </div>
    </div>
    <!-- 添加作业本按钮 -->
    <div class="btn" @click="addBook">
      <img src="/static/svg/icon_add.png" alt="">
      <div class="btn_con">添加作业本</div>
    </div>
  </div>
</template>

<script>
import twoSelect from '@/components/select/twoSelect'
import gapChart from '@/components/echart/gapChart'
import { errorBookList } from '@/api/errorRegister'

export default {
  components: {
    twoSelect,
    gapChart
  },
  data () {
    return {
      loading: false,
      subjectVal: '',
      gradeVal: '',
      loading: false,
      listStatus: true, // 有无错题本列表
      errorBookListData: {}
    }
  },
  onLoad () {
    this.loading = true
  },
  watch: {
    subjectVal (val) {
      if (val && this.gradeVal) { this.errorBookList() }
    },
    gradeVal (val) {
      if (val && this.subjectVal) { this.errorBookList() }
    }
  },
  methods: {
    // 接收科目 年级子组件传值
    subjectFun (val) {
      this.subjectVal = val
    },
    gradeFun (val) {
      this.gradeVal = val
    },
    async errorBookList () {
      const data = await errorBookList({
        subject_id: this.subjectVal,
        grade: this.gradeVal
      })
      if (data.length > 0) { this.listStatus = true } else { this.listStatus = false }
      this.errorBookListData = data
      this.loading = false
    },
    // 添加作业本
    addBook () {
      wx.navigateTo({ url: '/pages/errorRegister/addwork/main'})
    },
    // 跳转到错题登记
    chapterList (book_id) {
      wx.navigateTo({ url: '/pages/errorRegister/errorTitleRegister/main?book_id=' + book_id  + '&grade=' + this.gradeVal+ '&subject_id=' + this.subjectVal })
    }
  }
}
</script>

<style lang="less">
.register_container {
  .bookList_con {
    .list {
      padding:0.2rem 0.3rem;
      display: flex;
      background:#fff;
      img {
        width:1.5rem;
        height:2.5rem;
      }
      .middle {
        flex:1;
        padding:0.1rem 0.2rem;
        p {
          padding:0.2rem 0;
        }
        p:nth-child(2) {
          color:#666;
        }
        p:nth-child(3) {
          color:#666;
        }
      }
      .show {
        width:1.5rem;
        padding:0.1rem 0;
        p {
          color:#666;
        }
      }
    }
  }
  .btn {
    background:#fff;
    margin-top:0.2rem;
    height:0.8rem;
    padding:0.1rem 0.3rem;
    display: flex;
    align-items: center;
    img {
      width:0.32rem;
      height:0.32rem;
      margin-right:0.3rem;
    }
    .btn_con {
      flex:1;
      color:#1296db;
    }
  }
}
</style>
