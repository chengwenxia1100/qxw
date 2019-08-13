<template>
  <div class="analydetail_container">
    <div class="potic">
      <h2>选择题</h2>
      <div class="box">
        <div class="row"> 
          <div class="cell">题号</div> 
          <div class="cell">分值</div> 
          <div class="cell">学生得分</div>
          <div class="cell">难度系数</div>
          <div class="cell">班级平均分</div>
          <div class="cell">班级得分率</div>
        </div>
        <div class="row">
          <div class="cell">23</div> 
          <div class="cell">100</div> 
          <div class="cell">80</div>
          <div class="cell">3</div>
          <div class="cell">67</div>
          <div class="cell">60%</div>
        </div>
        <div class="row">
          <div class="cell">23</div> 
          <div class="cell">100</div> 
          <div class="cell">80</div>
          <div class="cell">3</div>
          <div class="cell">67</div>
          <div class="cell">60%</div>
        </div>
        <div class="row">
          <div class="cell">23</div> 
          <div class="cell">100</div> 
          <div class="cell">80</div>
          <div class="cell">3</div>
          <div class="cell">67</div>
          <div class="cell">60%</div>
        </div>
        <div class="row">
          <div class="cell">23</div> 
          <div class="cell">100</div> 
          <div class="cell">80</div>
          <div class="cell">3</div>
          <div class="cell">67</div>
          <div class="cell">60%</div>
        </div>
      </div>
      <h2>试题内容</h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less">
.analydetail_container {
  .potic {
    h2 {
      padding:0.1rem 0.2rem;
    }
    .type {
      font-size:0.24rem;
      padding:0.1rem 0.2rem;
      background:#666;
      color:#fff;
    }
    .box { 
      display: table; 
      font-size:0.24rem;
      text-align:center;
      width:100%;
      background:#fff;
    } 
    .row { 
      display: table-row; 
    } 
    .cell { 
      display: table-cell;
      width: 20%;
      border: 1px solid #f2f2f2;
      padding:0.1rem 0;
    }
    .blue {
      color:#1296db;
    }
  }
}
</style>
