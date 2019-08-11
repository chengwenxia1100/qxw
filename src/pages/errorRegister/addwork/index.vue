<template>
  <div class="addwork_container">
    <!-- 筛选框组件 -->
    <two-select></two-select>
    <div class="bookList_con">
      <div class="list">
        <img src="/static/images/user.png">
        <div class="middle">
          <p>作业本一</p>
          <p>初二上册</p>
          <p>浙江教育出版社</p>
        </div>
        <div class="status">
          <img src="/static/svg/icon_add.png">
        </div>
      </div>
      <div class="list">
        <img src="/static/images/user.png" @click="add">
        <div class="middle">
          <p>作业本一</p>
          <p>初二上册</p>
          <p>浙江教育出版社</p>
        </div>
        <div class="status">
          <img src="/static/svg/icon_add_r.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import twoSelect from '@/components/select/twoSelect'

export default {
  components: {
    twoSelect
  },
  data () {
    return {
        
    }
  },
  mounted () {
  },
  methods: {
    // 增加作业本
    add () {
       // 改变作业本状态
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
