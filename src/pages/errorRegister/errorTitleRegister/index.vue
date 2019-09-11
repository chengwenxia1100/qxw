<template>
  <div class="errorTitle_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="tip"><span></span><span>登记进度</span><span>正确率</span></div>
    <div class="list_con" v-for="(list, i) in chapterListData" :key="i">
      <div class="tit">
        <span>{{list.book_list_name}}</span>
        <!-- <span>登记进度</span>
        <span>正确率</span> -->
      </div>
      <div class="con">
        <ul>
          <li v-for="(item, j) in chapterListData[i].child" :key="j" @click="gotodetail(item.book_list_id, list.book_list_name, item.book_list_name)">
            <span>{{item.book_list_name}}</span>
            <span v-if="item.register_rate === 0" style="color:#FE0000;">暂无登记</span><span v-else style="color:#068BFF;">{{item.register_rate}}%</span>
            <span>{{item.right_rate}}%</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getChapterList } from '@/api/errorRegister'

export default {
  data () {
    return {
      chapterListData: {},
      message: {},
      loading: false
    }
  },
  onLoad (option) {
    this.message = option
  },
  onShow () {
    this.getChapterList()
  },
  computed: {
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
    async getChapterList () {
      this.loading = true
      const data = await getChapterList({
        book_id: this.book_id
      })
      this.loading = false
      this.chapterListData = data
    },
    // 跳转登记详情
    gotodetail (book_list_id, book_list_name, book_name) {
      wx.navigateTo({ url: '/pages/errorRegister/registerDetail/main?book_list_id=' + book_list_id + '&book_list_name=' + book_list_name + '&book_name=' + book_name + '&book_id=' + this.book_id + '&grade=' + this.grade + '&subject_id=' + this.subject_id })
    }
  },
  onUnload () {
    this.chapterListData = {}
  }
}
</script>

<style lang='less'>
page {
  background:#F8FBFF;
}
.errorTitle_container {
  font-size:0.28rem;
  .tip {
    padding:0.2rem;
    color:#333;
    display: flex;
    span:first-child {
      width:50%;
    }
    span {
      flex:1;
      font-size:0.24rem;
      text-align:center;
      line-height:0.3rem;
    }
  }
  .list_con {
    margin-bottom:0.4rem;
    .tit {
      display:flex;
      color:#333;
      font-weight:bold;
      font-size:0.32rem;
      padding:0.2rem;
      span:first-child {
        width:50%;
      }
      span:nth-child(2) {
        flex:1;
      }
      span:last-child {
        flex:1;
      }
    }
    .con {
      ul {
        li {
          box-shadow: 0 2px 0 #a6dcfd;
          margin:0 0.2rem 0.2rem;
          box-sizing:border-box;
          background:#fff;
          padding:0.2rem;
          display:flex;
          border-radius:0.12rem;
          span:first-child {
            width:50%;
          }
          span:nth-child(2) {
            flex:1;
            font-size:0.26rem;
          }
          span:last-child {
            flex:1;
            color:#068BFF;
          }
        }
        // li:nth-of-type(odd) { 
        //   background:#fff;
        // }
        // li:nth-of-type(even) { 
        //   background:#8a8a8a;
        // }
      }
    }
  }
}
 
</style>
