<template>
  <div class="add_container">
    <student-form></student-form>
    <div class="btn">完成</div>
  </div>
</template>

<script>
import studentForm from '@/components/form/studentForm'

export default {
  components: {
    studentForm
  },
  data () {
    return {
    }
  },
  methods: {
    // 单选框
    radioChange: e => {
        console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
    }
  }
}
</script>

<style lang="less">
page {
    background:#f2f2f2;
    font-size:0.28rem;
} 
.add_container {
  .btn {
    color:#fff;
    background:#EA5A49;
    width: 1.6rem;
    height: 0.6rem;
    line-height:0.6rem;
    text-align:center;
    border-radius: 0.08rem;
    margin:0.2rem auto;
  }
}
</style>
