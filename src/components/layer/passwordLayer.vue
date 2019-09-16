<template>
<div class="password_container" v-if="passwordLayer">
  <div class='password_input_box'>
    <img src="../../assets/svg/close.png" @click="closeInput" class="close">
    <div class="title">{{passwordtip}}</div>
    <div class='input'>
      <div v-for="(item,i) in numLength" :key="i" class='input_content'>
        <div>{{item.numInput}}</div>
      </div>
    </div>
  </div>

  <div class="key-board">
    <div class="title" @click="closeBoard"> 
		  <!-- <img src="../../assets/icon/icon_up.png" style="width: 80rpx;height: 60rpx;"/> -->
    </div>
		<div class="keys">
			<div class="key button" v-for="num in config.loop" :key="num.key" @click="numList(num.number)">{{num.number}}</div>
			<!-- <div class="key button" style="background: #eeeeee;"></div> -->
      <div class="key button" @click="del" style="background: #eeeeee;">
			  <img src="../../assets/icon/delete.png" style="width: 50rpx;height: 50rpx;"/>
			</div>
			<div class="key button" @click="numList(0)">0</div>
			<div class="key button" @click="finished" style="background: #eeeeee; font-size:16px;color:#25a7f7;">
        完成
			  <!-- <img src="../../assets/icon/delete.png" style="width: 50rpx;height: 50rpx;"/> -->
			</div>
		</div>
  </div> 
</div>
</template>

<script>
export default {
	props: {
		passwordLayer: {
			type: Boolean,
			default: false
		},
		passwordtip: {
			type: String,
			default: '请设置密码'
		}
	},
	data() {
		return {
			config :{
				loop : [
					{
						number : 1,
						key : 'number-1',
					},
					{
						number : 2,
						key : 'number-2',
					},
					{
						number : 3,
						key : 'number-3',
					},
					{
						number : 4,
						key : 'number-4',
					},
					{
						number : 5,
						key : 'number-5',
					},
					{
						number : 6,
						key : 'number-6',
					},
					{
						number : 7,
						key : 'number-7',
					},
					{
						number : 8,
						key : 'number-8',
					},
					{
						number : 9,
						key : 'number-9',
					},
				]
      }, // 密码框
      numLength : [
        {
          number : 1,
          numInput: ''
        },
        {
          number : 2,
          numInput: ''
        },
        {
          number : 3,
          numInput: ''
        },
        {
          number : 4,
          numInput: ''
        },
        {
          number : 5,
          numInput: ''
        },
        {
          number : 6,
          numInput: ''
        }
      ] //输入框个数
		};
	},
	methods: {
		closeInput(){
      this.passwordLayer = false;
      this.$emit('passwordLayer', this.passwordLayer)
		},
		del() {
			if (this.numLength[5].numInput !== '') {
        this.numLength[5].numInput = ''
      } else if (this.numLength[4].numInput !== '') {
        this.numLength[4].numInput = ''
      } else if (this.numLength[3].numInput !== '') {
        this.numLength[3].numInput = ''
      } else if (this.numLength[2].numInput !== '') {
        this.numLength[2].numInput = ''
      } else if (this.numLength[1].numInput !== '') {
        this.numLength[1].numInput = ''
      } else if (this.numLength[0].numInput !== '') {
        this.numLength[0].numInput = ''
      }
    },
    finished () {
      if (this.numLength[5].numInput !== '') {
        let password = this.numLength[0].numInput + '' + this.numLength[1].numInput + '' + this.numLength[2].numInput+ '' + this.numLength[3].numInput + '' + this.numLength[4].numInput + '' + this.numLength[5].numInput
        this.$emit('password', password)
      } else {
        this.passwordLayer = false;
        this.$emit('passwordLayer', this.passwordLayer)
      }
    },
		numList(val) {
      if (this.numLength[0].numInput == '') {
        this.numLength[0].numInput = val
      } else if (this.numLength[1].numInput == '') {
        this.numLength[1].numInput = val
      } else if (this.numLength[2].numInput == '') {
        this.numLength[2].numInput = val
      } else if (this.numLength[3].numInput == '') {
        this.numLength[3].numInput = val
      } else if (this.numLength[4].numInput == '') {
        this.numLength[4].numInput = val
      } else if (this.numLength[5].numInput == '') {
        this.numLength[5].numInput = val

        let password = this.numLength[0].numInput + '' + this.numLength[1].numInput + '' + this.numLength[2].numInput+ '' + this.numLength[3].numInput + '' + this.numLength[4].numInput + '' + this.numLength[5].numInput
        // this.numLength.map((item, index)=>{
        //   let password = item.numInput.concat(item.numInput)
        // })
        this.$emit('password', password)
      }
		}
	}
}
</script>
<style lang='less'>
.password_container {
  background:rgba(0,0,0,0.3);
  position:absolute;
  height:100vh;
  width:100%;
  left:0;
  top:0;
  .password_input_box {
    background:#fff;
    margin: 1rem auto;
    width:80%;
    border-radius: 0.3rem;
    box-sizing: border-box;
    height: 3rem;
    padding:0.4rem;
    position:relative;
    .close {
      position:absolute;
      right:0.2rem;
      top:0.2rem;
      width: 0.36rem;
      height: 0.36rem;
    }
    .title {
      font-size:0.32rem;
      text-align:center;
      padding:0.2rem 0 0.4rem;
    }
    .input{
      height: 100rpx;
      width: 100%;
      border: 1px solid #BBB;
      border-radius: 20rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;   
      text-align: center;
      .input_content{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 16.6%;
        border-right: 1px solid #BBB;
      }
      .input_content:nth-child(6){
        border:none
      }
    }
  }
  .key-board {
    background:#fff;
    z-index:999;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60rpx;
      background: #eeeeee;
    }
    .keys {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .key {
        width: 250rpx;
        height: 100rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #eeeeee;
        box-sizing: border-box;
        font-size: 40rpx;
      }
      .key:nth-child(n + 4) {
        border-top: 1px solid #eeeeee;
        box-sizing: border-box;
      }
      .key:active {
        background: #dddddd;
      }
    }
  }
}
</style>
