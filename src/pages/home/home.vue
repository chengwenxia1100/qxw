<template>
  <div class="home_container">
    <div class="stundent_info">
      <div class="student">
          <div class="left_mess">
            <div class="name">名字</div>
            <div class="grade"><span>中学</span><span>五年级二班</span></div>
          </div>
          <div class="right_btn">
            <div class="con">切换</div>
          </div>
      </div>
    </div>
    <div class="model_list">
      <ul>
        <li>
          <img src="@/assets/icon/home_icon1.png" />
          <p>每日一题</p>
        </li>
        <li>
          <img src="@/assets/icon/home_icon2.png" />
          <p>每日一题</p>
        </li>
        <li>
          <img src="@/assets/icon/home_icon3.png" />
          <p>每日一题</p>
        </li>
        <li>
          <img src="@/assets/icon/home_icon4.png" />
          <p>每日一题</p>
        </li>
      </ul>
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
.home_container {
  .stundent_info{ 
    background:#25A7F7;
    color:#fff;
    height: 2rem;
    padding:0.3rem;
    width:100%;
    .studnet {
      color:#fff;
      clear:both;
      overflow: hidden;
       .left_mess {
         width:80%;
         float:left;
         .name {
           font-size:0.34rem;
         }
         .grade {
           font-size:0.26rem;
         }
       }
       .right_btn {
         width:20%;
         float:right;
         .btn_con {
           width:1.28rem;
           height:0.6rem;
           text-align:center;
           line-height:0.6rem;
           background:#f2f2f2;
           border-radius:0.2rem;
         }
       }
    }
  }
  .model_list {
    border-radius:0.2rem;
    background: #fff;
    margin:-0.3rem 0.3rem 0.3rem 0.3rem;
    ul {
      display: flex;
      li {
        flex:1;
        padding: 0.2rem;
        box-sizing:border-box;
        text-align:center;
        img {
          border-radius:50%;
          width: 0.8rem;
          height: 0.8rem;
        }
        p {
          font-size:0.28rem;
          padding:0.1rem 0;
        }
      }
    }
  }
}
</style>
