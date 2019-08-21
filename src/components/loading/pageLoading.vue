<template>
 <!-- <div class="loading_wrapper" v-if="showLoading"> -->
   <div class="loading_wrapper" v-if="(showLoading === undefined ||showLoading === true ) ? true : false">
      <div>
          <!-- <img :src="svg" alt=""> -->
          <img src="../../assets/svg/loadingpage.svg" alt="">
          <span>
              <slot></slot>
          </span>
      </div>
 </div>
</template>
<script>
 export default {
   props: {
     value: {
       type: Boolean,
       default: false
     },
     loading: {
       type: Boolean,
       default: true
     }
   },
   data () {
     return {
       svg: require('../../assets/svg/loadingpage.svg'),
       showLoading: false,
       timeout: 3000,
       immediateLoadDone: 500
     }
   },
   watch: {
     value: {
       immediate: true,
       handler (val) {
         if (val) {
           this.showLoading = val
         } else {
           setTimeout(() => {
             this.showLoading = val
           }, this.immediateLoadDone)
         }
       }
     },
     showLoading: {
       immediate: true,
       handler (val) {
         this.$emit('input', val)
         if (val) {
           setTimeout(() => {
             if (this.showLoading) {
               this.showLoading = false
             }
           }, this.timeout)
         }
       }
     }
   }
 }
</script>
<style lang="less" scoped>
.loading_wrapper{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        position: relative;
        width: 118px;
        height: 118px;
        background: rgba(0,0,0,0.6);
        border-radius: 8px;
        img{
            width: 118px;
            height: 118px;
            border-radius: 8px;
            position: relative;
            top: -10px;
        }
        span{
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            left: 0;
            color: #ffffff;
            font-size: 16px;
            z-index: 10;
            line-height: 18px;
            padding-top: 4px;
        }
    }
}
</style>
