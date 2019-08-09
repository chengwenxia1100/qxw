<template>

    <div class="pageBtn" >
      <ul>
        <li @click="firstPage">首页</li>
        <li  @click="changePagePrev()" v-if="prev">上一页</li><li class="stop" v-if="!prev">上一页</li>
        <li v-for="(page,i) in pages" :key="i" @click="changePage(i)" :style="'color:' + page.col" >{{page.val}}</li>
        <li @click="changePageNext()" v-if="next">下一页</li><li class="stop" v-if="!next">下一页</li>
        <li @click="lastPage">尾页</li>
      </ul>
    </div>

</template>

<script>
export default {
  data () {
    return {
      pages: [{val:1,col:'#f7536a'},{val:2},{val:3},{val:4}],
      count: 20, // 总数据数 page * sizePage * size
      page:1, // 当前分页器在第几条
      pageNum:1, // 当前分页器在第几页
      sizePage: 2, // 一页显示 2 条内容
      size:4, // 一页显示 4 条分页
      prev: false, // 上一页按钮显示状态
      next: true, // 下一页按钮显示状态
    }
  },
  mounted () {
    if (this.sizePage * this.size >= this.count) { // 如果一屏展示的数据大于总数据下一页置灰色
      this.next = false;
    }
    this.fun();
  },
  methods: {
    changePage (page) { // 点击页码传过来对应的 index index从 0开始的
      this.page = page + 1;
      this.fun();
    },
    changePagePrev () { // 点击上一页 page切换 4页 
      let num = this.page - this.size * ( this.pageNum - 2) - 1;// 计算减少的页面 保持点击上一页停留在第1页
      this.pages = [{val:1,col:'#f7536a'},{val:2},{val:3},{val:4}];
      this.page -= num;
      this.pageNum -= 1;
      if (this.page >= 0) {
        this.prev = false;
      }
      this.fun();
    },
    changePageNext () { // 点击下一页 page切换 4页 
      let num = this.size * this.pageNum - this.page + 1; // 计算增加的页面 保持点击下一页停留在第五页
      this.pages = [{val:5,col:'#f7536a'},{val:6},{val:7},{val:8}];
      this.page += num;
      this.pageNum += 1;
      if (this.page * this.size > this.count) {
        this.next = false;
      }
      this.fun();
    },
    firstPage () { // 点击首页 跳到第一页
      this.page = 1;
      this.fun();
    },
    lastPage () {
      this.page = this.count / 2;
      this.fun();
    },
    // 请求接口
    fun () {
      console.log(this.page);
    }
  },
  watch: {                                                                                              
    page(val) {
      this.pages.map((item, index) => {
        if(this.page === index + 1) {
          item.col = '#f7536a';
        } else {
          item.col = '';
        }
      })
      if (val > this.size) { // 如果有上一页 上一页按钮变亮可点击
        this.prev = true;
      } else {
        this.prev = false;
      }
      if (val < this.size) {
        this.next = true;
      }
      if (val <= 0) {
        this.prev = false;
      }
      if (val * this.size >= this.coun) {
        this.next = false;
      }
    }
  }
}
</script>

<style lang="less">

  .pageBtn {
    height:0.8rem;
    width:6.7rem;
    padding:0 0.4rem;
    ul {
      display:flex;
      li {
        flex:1;
        text-align:center;
        color:#333;
        white-space: nowrap;
        padding: 0 0.1rem;
      }
      .stop {
        color:#999;
      }
      .on {
        color:#f7536a;
      }
    }
  }

</style>
