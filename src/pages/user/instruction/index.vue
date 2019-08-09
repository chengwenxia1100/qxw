<template>
  <div class="add_container">
    <div class="tip">
      <p>常见问题</p>
      <ul>
        <li>如何注册？</li>
        <li>如何准确添加到班级？</li>
        <li>错题登记流程</li>
        <li>错题本查看</li>
        <li>切换、编辑、新增学生</li>
      </ul>
      <p>其他问题返回上一步联系客服</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
.add_container {
  .tip {
    p {
      background:#f2f2f2;
      color:#333;
      padding:0.2rem 0.4rem;
    }
    ul {
      background:#fff;
      padding:0 0.2rem;
      li {
        padding:0.2rem 0;
        border-bottom:0.02rem #f2f2f2 solid;
      }
    }
  }
}
</style>
