<template>
    <div class="parents_mess">
        <div class="list">
            <div class="tit">关系</div>
            <div class="radio">
                <div class="select_btn" @click="relativeRadio(1)">
                    <img :src="selectIcon" v-if="relation == 1">
                    <img :src="noselectIcon" v-else>
                    <span>父亲</span>
                </div>
                <div class="select_btn" @click="relativeRadio(2)">
                    <img :src="selectIcon" v-if="relation == 2">
                    <img :src="noselectIcon" v-else>
                    <span>母亲</span>
                </div>
                <div class="select_btn" @click="relativeRadio(0)">
                    <img :src="selectIcon" v-if="relation == 0">
                    <img :src="noselectIcon" v-else>
                    <span>其他</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            relative: 1
        }
    },
    computed: {
      selectIcon () {
        return require('@/assets/svg/radio_select.png')
      },
      noselectIcon () {
        return require('@/assets/svg/radio_noselect.png')
      }
    },
    watch: {
        relative: {
            handler (val) {
                 this.$emit('relative', val)
            },
            immediate: true
        }
    },
    methods: {
        relativeRadio (value) {
            this.relation = value
        },
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
