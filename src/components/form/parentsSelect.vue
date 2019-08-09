<template>
  <div class="user_wrongTitle">
    <div class="parents_mess">
        <div class="list">
            <div class="tit">关系</div>
            <radio-group class="radio-group" @change="radioChange">
                <label v-for="item in lists" :key="item.name">
                    <radio color='#EA5A49' :value="item.name" :checked="item.checked"/>{{item.value}}
                </label>
            </radio-group>
        </div>
    </div>
  </div>
</template>

<script>
import mpvuePicker from "mpvue-picker";

export default {
    components: {
        mpvuePicker
    },
    data () {
        return {
            lists: [
                {name: 'father', value: '父亲 ', checked: 'true'},
                {name: 'mother', value: '母亲'},
                {name: 'other', value: '其他'},
            ],
            mode: 'selector'
        }
    },
    computed: {
    },
    methods: {
      // 单选框
      radioChange: e => {
          console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
      }
    },
    mounted () {
    }
}
</script>

<style lang="less">
page {
    background:#f2f2f2;
}
.user_wrongTitle {
  font-size:0.28rem;
  .list_same {
    display: flex;
    align-items: center;
    border-bottom:0.02rem #f2f2f2 solid;
    padding:0.2rem;
    color:#999;
    .tit {
        width:1.4rem;
        color:#333;
        margin-right:0.2rem;
        text-align:right;
    }
    input {
        flex:1;
    }
    .input {
        flex:1;
        display: flex;
        align-items: center;
        input {
            flex:1;

        }
        span {
            width:1.4rem;
            text-align:center;
            color:#fff;
            padding:0.1rem;
            border:0.02rem #ddd solid;
            border-radius: 0.18rem;
        }
    }
  }
  .parents_mess {
    background:#fff;
    margin-top:0.2rem;
    .list {
        .list_same
    }
  }
}
</style>
