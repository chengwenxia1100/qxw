<template>
  <div class="paperRegister_container">
    <div class="tit">
      <span>试卷名称</span>
      <span>单元自测卷：  总分：150</span>
      <span>我的得分：100</span>
    </div>
    <div class="register">
      <div class="register_tit">
        <div class="left">选</div>
        <div class="right">98</div>
      </div>
      <div class="register_con">
        <div class="box">
          <div class="row tit"> 
            <div class="cell">题号</div> 
            <div class="cell">题目及答案</div> 
            <div class="cell">作答情况</div>
            <div class="cell">分值</div>
            <div class="cell">得分</div>
          </div>
          <div class="row">
            <div class="cell">2</div> 
            <div class="cell blue">查看详情</div> 
            <div class="cell">
              <i class="icon1"></i>
              <i class="icon2"></i>
            </div>
            <div class="cell">3</div>
            <div class="cell">67</div>
          </div>
          <div class="row">
            <div class="cell">23</div> 
            <div class="cell">100</div> 
            <div class="cell">80</div>
            <div class="cell">3</div>
            <div class="cell">67</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang='less'>
.bule {
  color: #1296db;
}
.paperRegister_container {
  font-size:0.24rem;
  .tit {
    display: flex;
    padding:0.2rem;
    color:#fff;
    span {
      flex:1;
    }
    span:first-child {
      color:#333;
    }
    span:nth-child(2) {
      color:#666;
    }
    span:nth-child(3) {
      color:#666
    }
  }
  .register {
    &_tit {
      color:#fff;
      background:#707070;
      clear:both;
      overflow: hidden;
      padding:0.2rem;
      .left {
        float:left;
      }
      .right {
        float:right;
      }
    }
    &_con {
      background:#fff;
      .tit{
        background:#8a8a8a;
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
        .icon1 {
          background: url(../../../assets/icon/icon_answer1.png) no-repeat center;
          background-size:0.36rem 0.36rem;
        }
        .icon2 {
          background: url(../../../assets/icon/icon_answer2.png) no-repeat center;
          background-size:0.36rem 0.36rem;
        }
      }
    }
  }
}
 
</style>
