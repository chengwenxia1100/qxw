<template>
  <div class="addwork_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <!-- 筛选框组件 -->
    <!-- <two-select-books
      @grade="gradeFun"
      :subjectType="subjectType"
      :subject="subject"
      :subjectValue="subjectValue"
    ></two-select-books> -->
    <div class="main_box">
      <div class="navTab">
        <ul>
          <li> {{subject}} </li>
          <li> {{grade}} </li>
        </ul>
      </div>
    </div>
    <!---->
    <div class="bookList_con" v-if="bookList">
      <div class="list" v-for="(item, i) in worksData" :key="i">
        <img :src="item.url">
        <div class="middle">
          <p>{{item.name}}</p>
          <p>{{item.semester}}</p>
          <p>浙江教育出版社</p>
        </div>
        <div class="status">
          <img src="../../../assets/icon/icon_click.png" v-if="item.status === 0" @click="addWork(item.book_id, i)">
          <img src="../../../assets/icon/icon_clicked.png" v-if="item.status === 1" @click="removeWork(item.book_id, i)">
        </div>
      </div>
    </div>
    <div class="bookList_con" v-else>
      <div class="no_books">
        该年级下暂无该科目的作业本
      </div>
    </div>
  </div>
</template>

<script>
import twoSelectBooks from '@/components/select/twoSelectBooks'
import { addBookList, addBook, removeBook } from '@/api/errorRegister'

export default {
  components: {
    twoSelectBooks
  },
  data () {
    return {
      loading: false,
      worksData: {},
      gradeVal: '',
      subjectType: false,
      subject: '',
      grade: ''
      // bookList: false
    }
  },
  onLoad (option) {
    this.loading = true
    console.log(option)
    this.subject = option.subject
    this.subjectValue = option.subjectValue
    this.grade = option.grade
    this.gradeValue = option.gradeValue
    setTimeout(() => {
      this.addBookList()
    }, 200);
  },
  computed: {
    bookList () {
      if (this.worksData.length > 0) { return true } else { return false }
    }
  }, 
  watch: {
    // gradeVal: {
    //   immediate: true,
    //   handler (val) {
    //     console.log(val)
    //     if (val && this.subjectValue) { this.addBookList() }
    //   }
    // }
    // gradeVal (val) {
    //   this.loading = true
    //   console.log('watch' + val + this.subjectValue)
    //   if (val && this.subjectValue) { this.addBookList() }
    // }
  },
  methods: {
    // 增加作业本所有列表
    async addBookList () {
      const data = await addBookList({
        subject_id: this.subjectValue,
        grade: this.gradeValue
      })
      this.worksData = data
      // if (data.length > 0) { this.bookList = true } else { this.bookList = false }
      this.loading = false
    },
    // 添加
    async addBook (book_id) {
      const data = await addBook({
        book_id: book_id
      })
    },
    // 接收科目 年级子组件传值
    gradeFun (val) {
      console.log(val)
      this.gradeVal = val
    },
    addWork (book_id, i) {
      this.loading = true
      this.worksData.forEach((item,index,arr)=>{
        if (index === i) {
          addBook({
            book_id: book_id 
          }).then(res => {
            this.loading = false
             item.status = 1
          })
        }
			})
      // this.addBook(book_id)
    },
    removeWork (book_id, i) {
      this.loading = true
      this.worksData.forEach((item,index,arr)=>{
        if (index === i) {
          removeBook({
            book_id: book_id 
          }).then(res => {
            this.loading = false
             item.status = 0
          })
        }
			})
      // this.addBook(book_id)
    }
  },
  onUnload () {
    this.subjectValue = 0
    this.subject = ''
    this.gradeVal = ''
  }
}
</script>

<style lang="less">
.addwork_container {
  .bookList_con {
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
        width:1.5rem;
        padding:0.1rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width:0.64rem;
            height:0.64rem;
        }
      }
    }
    .no_books {
      padding:0.5rem 0;
      margin:0 auto;
      text-align:center;
      font-size:0.32rem;
      color:#666;
    }
  }
  .main_box {
    .navTab {
      color: #25A7F7;
      height:0.6rem;
      background:#fff;
      padding:0.1rem 0;
      box-shadow: 0 2px 5px #a6dcfd;
      border-bottom:0.02rem #a6dcfd solid;
      ul {
        display:flex;
        li {
          flex:1;
          text-align:center;
          line-height:0.6rem;
          clear:both;
          img {
            width:0.48rem;
            height:0.48rem;
            float:right;
            margin-right:0.6rem;
            margin-top:0.06rem;
          }
        }
        li:first-child{
          border-right:0.02rem rgb(126, 125, 125) solid;
        }
      }
    }
  }
}
</style>
