<template>
  <div class="errorTitle_container">
    <div class="tip">*点击对应章节进行查看、登记</div>
    <div class="list_con" v-for="(list, i) in chapterListData" :key="i">
      <div class="tit">
        <span>{{list.book_list_name}}</span>
        <span>登记进度</span>
        <span>正确率</span>
      </div>
      <div class="con">
        <ul>
          <li v-for="(item, j) in chapterListData[i].child" :key="j" @click="bookDetail()">
            <span>{{item.book_list_name}}</span>
            <span>30%</span>
            <span>50%</span>
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
      book_id: 16
    }
  },
  onLoad () {
    this.getChapterList()
  },
  computed: {
    // book_id () {
    //   return this.$root.$mp.query.book_id
    // }
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
    bookDetail () {
      wx.navigateTo({ url: '/pages/errorRegister/addwork/main?book_id=' + book_id })
    }
  }
}
</script>

<style lang='less'>
.errorTitle_container {
  font-size:0.28rem;
  .tip {
    padding:0.2rem;
    color:#f00;
  }
  .list_con {
    margin-bottom:0.4rem;
    .tit {
      background:#707070;
      display:flex;
      color:#fff;
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
          padding:0.2rem;
          display:flex;
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
        li:nth-of-type(odd) { 
          background:#fff;
        }
        li:nth-of-type(even) { 
          background:#8a8a8a;
        }
      }
    }
  }
}
 
</style>
