<template>
  <div class="multiPicker">
    <div class="multiPicker_con">
      <div class="tit" @click="cancel">
        <div class="cancel">取消</div>
        <div class="confirm">确定</div>
      </div>
      <div class="list">
        <ul>
          <li v-for="(list, i) in listArray" :key="i"  
          :style="'color:' + list.color" 
          @click="select(list.label, list.value)">{{list.label}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    listArray: {
      default: {}
    },
    type: {
      default: 0
    }
  },
  data() {
    return {
      
    }
  },
  onLoad () {
  },
  methods: {
    select (label, value) {
      this.listArray.map((list, index) => {
        list.value == value ? list.color="#25A7F7" : list.color="#666"
      })
      console.log(label)
      const arr = { label: label, value: value, status: false }
      this.$emit('gradeArr', arr)
    },
    cancel () {
      this.$emit('status', false)
    }
  }
}
</script>

<style lang="less" scoped>
.multiPicker {
  background:rgba(0, 0, 0, 0.5);
  height:100vh;
  width:100%;
  z-index:999;
  position: fixed;
  left:0; 
  top:0;
  .multiPicker_con {
    position:fixed;
    bottom:0;
    left:0;
    background:#fff;
    width:100%;
    height:6rem;
    padding-bottom:0.6rem;
    z-index:1000;
  }
  .tit {
    width:100%;
    box-sizing: border-box;
    padding:0.2rem;
    font-size:0.32rem;
    display: flex;
    border-bottom:0.02rem #eaeaea solid;
    .cancel {
      color:#666;
      flex:1;
      text-align:left;
    }
    .confirm {
      color:#25A7F7;
      flex:1;
      text-align: right;
    }
  }
  .list {
    padding:0.4rem 0 0.6rem;
    text-align:center;
    overflow: hidden;
    ul {
      max-height:4rem;
      overflow-y:scroll;
      -webkit-overflow-scrolling: touch;
      li {
        padding:0.2rem 0;
        font-size:0.28rem;
        color:#666;
        border-bottom:0.02rem #eaeaea solid;
      }
    }
  }
}
</style>