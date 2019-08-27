<template>
  <div class="addwork_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <!-- 筛选框组件 -->
    <two-select-books
      @subject="subjectFun"
      @grade="gradeFun"
    ></two-select-books>
    <!---->
    <div class="bookList_con">
      <div class="list" v-for="(item, i) in worksData" :key="i">
        <img :src="item.url">
        <div class="middle">
          <p>{{item.name}}</p>
          <p>{{item.semester}}</p>
          <p>浙江教育出版社</p>
        </div>
        <div class="status">
          <img src="../../../assets/icon/icon_click.png" v-if="item.status === 0" @click="selectWork(item.book_id, i)">
          <img src="../../../assets/icon/icon_clicked.png" v-if="item.status === 1">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import twoSelectBooks from '@/components/select/twoSelectBooks'
import { addBookList, addBook } from '@/api/errorRegister'

export default {
  components: {
    twoSelectBooks
  },
  data () {
    return {
      loading: false,
      worksData: {},
      subjectVal: '',
      gradeVal: '',
    }
  },
  onLoad () {
    this.loading = true
  },
  watch: {
    subjectVal (val) {
      this.loading = true
      console.log(this.gradeVal)
      if (val && this.gradeVal) { this.addBookList() }
    },
    gradeVal (val) {
      this.loading = true
      if (val && this.subjectVal) { this.addBookList() }
    }
  },
  methods: {
    // 增加作业本所有列表
    async addBookList () {
      const data = await addBookList({
        subject_id: this.subjectVal,
        grade: this.gradeVal
      })
      this.worksData = data
      this.loading = false
    },
    // 添加
    async addBook (book_id) {
      const data = await addBook({
        book_id: book_id
      })
    },
    // 接收科目 年级子组件传值
    subjectFun (val) {
      this.subjectVal = val
    },
    gradeFun (val) {
      this.gradeVal = val
    },
    selectWork (book_id, i) {
      this.loading = false
      this.worksData.forEach((item,index,arr)=>{
        if (index === i) {
          addBook({
            data: { book_id: book_id }
          }).then(res => {
            this.loading = false
             item.status = 1
          }).catch(err => {
            if (err.code === 1701) {
              this.loading = false
            }
          })
        }
			})
      // this.addBook(book_id)
    }
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
  }
}
</style>
