<template>
  <div style="100vh">
    <!-- tab 切换 -->
    <scroll-view scroll-x="true" class="tab_navbar" :scroll-left="navScrollLeft" scroll-with-animation="true">
      <block  v-for="(item,index) in tabs" :key="index">
        <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="nav_item" @click="tabClick(index)">
          <div class="navbar_title" :class="{'cur':activeIndex == index}">{{item.name}}</div>
        </div>
      </block>
      <div class="navbar_slider" :class="navbarSliderClass"></div>
    </scroll-view>
    <!-- 内容 --> 
    <div style="height:100vh" >
      <swiper class="content" :duration="50"  @change="swiperChange" :current="currentTab" @animationfinish="onAnimationfinish">
        <swiper-item  v-for="(item,index) in tabs" :key="index">    
          <scroll-view scroll-y  @scrolltolower="loadingMoreData">
            <div class="orderlist_con">
              {{index}}
            </div>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { bookTopicList, bookTopicRegister } from '@/api/errorRegister'

export default {
  data () {
    return {
      load: false,
      tabs: [
        {
          name: '全部',
          type: -1,
          checked: true
        },
        {
          name: '待付款',
          type: 0,
          checked: true
        },
        {
          name: '拼团中',
          type: 40,
          checked: true
        },
        {
          name: '待发货',
          type: 1,
          checked: true
        },
        {
          name: '待收货',
          type: 2,
          checked: true
        },
        {
          name: '已完成',
          type: 3,
          checked: true
        }
      ],
      activeIndex: 9,
      currentTab: 9,
      orderStatus: 9,
      list: [],
      orderComfirmInfo: {},
      page: 1,
      size: 20,
      totalCount: 0,
      orderMess: false,
      bottomTip: false,
      listHeight: 200, // list的总高度
      boxheight: 500, // 列表总内容的高度
      navScrollLeft: 0,
      upperStatus: false,

      loading: false,
      showLayer: false,
      chapterListData: {},
      numlist: []
,     message: {},
      statusStr: '',
      topicStr: '',
      page: 1,
      total: 0
    }
  },
  onLoad () {
    this.currentTab = 1 // 从上一页面传入的订单状态
    this.activeIndex = this.currentTab
    this.message = option
    this.bookTopicList()
  },
  computed: {
    navbarSliderClass () {
      if (this.activeIndex === 0) {
        return 'navbar_slider_0'
      }
      if (this.activeIndex === 1) {
        return 'navbar_slider_1'
      }
      if (this.activeIndex === 2) {
        return 'navbar_slider_2'
      }
      if (this.activeIndex === 3) {
        return 'navbar_slider_3'
      }
      if (this.activeIndex === 4) {
        return 'navbar_slider_4'
      }
      if (this.activeIndex === 5) {
        return 'navbar_slider_5'
      }
    },
    bodyHeight () {
      return wx.getSystemInfoSync().windowHeight - 20
    },
    bodyWidth () {
      return wx.getSystemInfoSync().windowWidth
    },
    tabWidth () {
      return wx.getSystemInfoSync().windowWidth / 4
    }
  },
  watch: {
    currentTab: {
      handler (val) {
        this.navScrollLeft = (val - 2) * this.tabWidth
        switch (val) {
          case 0:
            this.orderStatus = -1
            break
          case 1:
            this.orderStatus = 0
            break
          case 2:
            this.orderStatus = 40
            break
          case 3:
            this.orderStatus = 1
            break
          case 4:
            this.orderStatus = 2
            break
          case 5:
            this.orderStatus = 3
            break
        }
      },
      immediate: true
    },
    orderStatus: {
      handler (val) {
        this.getOrderListData(true)
      },
      immediate: true
    }
  },
  methods: {
    // 触底加载
    loadingMoreData () {
      if (this.page * this.size <= this.totalCount) {
        this.page += 1
        this.getOrderListData()
      }
    },
    tabClick (index) {
      this.page = 1
      this.activeIndex = index
      this.currentTab = this.activeIndex
    },
    swiperChange (e) {
      this.page = 1
      this.currentTab = e.mp.detail.current
      this.activeIndex = this.currentTab
    },
    async getOrderListData (load) {
      if (load) {
        this.load = true
      }
      const data = await getOrderList({
        current: this.page,
        size: this.size,
        status: this.orderStatus
      })
      setTimeout(() => {
        this.load = false
      }, 300)

      data.list.map((item, index) => {
        item.remainTime = Date.parse(item.endTime.replace(/-/g, '/')) - Date.parse(new Date())
        this.orderComfirmInfo = '{'
      })
      // 判断按钮显示状态
      for (let i of data.list) {
        // 订单状态
        switch (i.status) {
          case 0:
            i.statusText = '待付款'
            break
          case 1:
            i.statusText = '待发货'
            break
          case 2:
            i.statusText = '已发货'
            break
          case 3:
            i.statusText = '已完成'
            break
          case 10:
            i.statusText = '已关闭'
            break
          case 11:
            i.statusText = '无效订单'
            break
          case 40:
            i.statusText = '拼团中'
            break
        }
      }

      if (data.list.length <= 0) {
        this.orderMess = false
        this.boxheight = this.bodyHeight - 70
      } else {
        this.orderMess = true
        if (data.current === 1) {
          this.list = data.list
        } else {
          this.list = this.list.concat(data.list)
          // this.list = [...this.list, data.list]
        }

        this.listHeight = this.list.length * 220
        if (this.listHeight < this.bodyHeight) { this.boxheight = this.bodyHeight - 70 } else { this.boxheight = this.list.length * 220 }
      }
      this.totalCount = data.totalCount
    },
    // 接收子组件传值
    cancelStatus (val) {
      if (val) {
        this.getOrderListData()
      }
    },
    receiveStatus (val) {
      if (val) {
        this.getOrderListData()
      }
    },
    payStatus (val) {
      if (val) {
        this.getOrderListData()
      }
    },
    countdownStatus (val) {
      if (val) {
        this.getOrderListData()
      }
    },
    // 确认收货
    confirmReceive (orderId) {
      wx.showModal({
        title: '确认收到货了吗？',
        content: '为保障您的售后权益，请收到货确认无误后，在确认收货哦！',
        cancelColor: '#666',
        confirmText: '确认收货',
        confirmColor: '#F46161',
        success: (res) => {
          if (res.confirm) {
            // 请求确认收货接口
            const data = confirmReceiveData({
              orderId: orderId
            })
            if (data) {
              wx.showToast({
                title: '成功',
                duration: 2000
              })
              this.getOrderListData()
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 页面跳转物流详情页
    viewLogistic (orderId) {
      // const url = '../../logistics/main?orderId=' + orderId
      // wx.navigateTo({ url })
    },
    // 跳转到订单详情页面
    gotoOrdreDetail (orderId) {
      // const url = '../orderDetail/main?states=' + this.orderStatus + '&orderId=' + orderId
      // wx.navigateTo({ url })
    }
  },
  onUnload () {
    this.activeIndex = 9
    this.currentTab = 9
    this.orderStatus = 9
  }
}
</script>

<style  lang='less'>
page {
  background:#f2f2f2;
}
.content {
  box-sizing: border-box;
  height: 100%;
  padding-top: 50px;
  /* overflow: auto; */
  -webkit-overflow-scrolling: touch;
}

.swiper-item {
  height: 100%;
  text-align: center;
}
.tab_navbar {
  background-color: #fff;
  border-bottom: 0.02rem solid #f2f2f2;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  line-height: 50px;
  font-size: 16px;
  white-space: nowrap;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.nav_item {
  width: 20%;
  display: inline-block;
  text-align: center;
  height: 50px;
}
.navbar_item .navbar_item_on {
  color: white;
}
.cur {
  color: #333!important;
}
.navbar_title {
  color: #A69D9D;
  font-weight: 500;
  display: inline-block;
  font-size: 15px;
  max-width: 8em;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.navbar_slider {
  position: absolute;
  content: " ";
  left: 0;
  top:46px;
  width: 20px;
  height: 4px;
  background-color: #A69D9D;
  -webkit-transition: -webkit-transform 0.1s;
  transition: -webkit-transform 0.1s;
  transition: transform 0.1s;
  transition: transform 0.1s, -webkit-transform 0.1s;
}

.navbar_slider_0 {
  left: 27px;
  transform: translateX(0);
}
.navbar_slider_1 {
  left: 27px;
  transform: translateX(75px);
}
.navbar_slider_2 {
  left: 27px;
  transform: translateX(150px);
}
.navbar_slider_3 {
  left: 27px;
  transform: translateX(225px);
}
.navbar_slider_4 {
  left: 27px;
  transform: translateX(304px);
}
.navbar_slider_5 {
  left: 27px;
  transform: translateX(374px);
}

.controls {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: fixed;
  z-index: 8888;
  top: 80;
  height: 50px;
  width: 100%;
  background-color: #298de5;
}

.orderlist_con {
  padding-bottom:0.6rem;
  .order_mess {
    .list_con {
      padding:0 15px;
      background:#fff;
      margin-top:10px;
      .list_tit {
        border-bottom:1px #f2f2f2 solid;
        clear:both;
        overflow: hidden;
        padding:10px 0;
        span:first-child {
          font-size:15px;
          font-weight:bold;
          float:left;
        }
        span:last-child {
          font-size:13px;
          color:#999;
          float:right;
        }
      }
      .list_shop {
        border-bottom:1px #f2f2f2 solid;
        display:flex;
        padding-bottom:15px;
        image {
          width: 65px;
          height: 65px;
          margin:15px 10px 0 0;
        }
        .shop_detail {
          flex:1;
          padding:15px 0;
          p {
            display:flex;
          }
          p:first-child {
            span:first-child {
              font-size:14px;
              line-height:20px;
              flex:1;
              overflow:hidden;
              display:-webkit-box;
              text-overflow:ellipsis;
              -webkit-line-clamp:2;
              -webkit-box-orient:vertical;
              white-space:normal;
            }
            span:last-child{
              font-size:15px;
              width:50px;
              text-align:right;
            }
          }
          p:nth-child(2) {
            font-size:13px;
            padding-top:7px;
            span:first-child {
              color:#999;
              flex:1;
            }
            span:nth-child(2) {
              width:50px;
              text-align:right;
            }
          }
        }
      }
      .list_price {
        padding:11px 0;
        text-align:right;
        span:first-child {
          color:#000;
          font-size:16px;
          padding-right:10px;
        }
        span:nth-child(2) {
          color:#F46161;
          font-size:16px;
        }
      }
      .list_btn {
        padding:11px 0;
        text-align:right;
        overflow: hidden;
      }
      // .list_btn {
      //   // padding:10px 0;
      //   text-align:right;
      //   width:100%;
      //   clear:both;
      //   overflow:hidden;
      //   .btn_same {
      //     border-radius: 4px;
      //     font-size:13px;
      //     text-align:center;
      //     width: 85px;
      //     height: 31px;
      //     line-height:31px;
      //     float:right;
      //   }
      //   .btn {
      //     color:#fff;
      //     background:#F46161;
      //     margin-left:20px;
      //     .btn_same
      //   }
      //   .view_logis {
      //     color:#999;
      //     border:1px #999 solid;
      //     .btn_same
      //   }
      //   .confirm_btn {
      //     .btn
      //   }
      //   .invite_btn {
      //     .btn
      //   }
      //   .reopen_btn {
      //     .btn
      //   }
      // }
    }
  }
  .no_order_mess {
    padding-top:100px;
    text-align:center;
    img {
      width: 145px;
      height: 198px;
    }
    p {
      font-size:16px;
      color:#999;
      padding:18px 0;
    }
  }
}
</style>
