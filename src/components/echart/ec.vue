<template>
  <div class="container">
    <div class="echarts">
      <div class="wrap">
        <mpvue-echarts :echarts="echarts" :onInit="initChart" />
      </div>
    </div>
  </div>
</template>
<script>
import machineList from './machineList'
import * as echarts from '../../../static/echarts/echarts.min'
import mpvueEcharts from 'mpvue-echarts'
let chart = null
export default {
  data () {
    return {
      echarts,
      IN_PRODUCTION: 1,
      IN_STAND: 1,
      OFF_LINE: 1,
      BREAKDOWN: 1,
      machineList: [],
      showState: false,
      machineState: 'IN_PRODUCTION'
    }
  },
  components: {
    mpvueEcharts,
    machineList
  },
  onLoad () {
    this.getMachineStateInfo()
  },
  methods: {
    stateChange (val) {
      this.machineState = val
    },
    test () {
      var option = {
        calculable: false,
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: this.IN_PRODUCTION, name: '开机 : ' + this.IN_PRODUCTION},
              {value: this.OFF_LINE, name: '关机 : ' + this.OFF_LINE},
              {value: this.BREAKDOWN, name: '故障 : ' + this.BREAKDOWN}
            ]
          }
        ]
      }
      chart.setOption(option)
    },
    initChart (canvas, width, height) {
      chart = echarts.init(canvas, 'light', {
        width: width,
        height: height
      })
      canvas.setChart(chart)
      return chart
    },
    async getMachineStateInfo () {
      let resp = await this.$http.get('machine/state/count')
      if (resp.data.code === 1) {
        this.IN_PRODUCTION = resp.data.data.machineOpen
        this.OFF_LINE = resp.data.data.machineClosed
        this.BREAKDOWN = resp.data.data.machineAlarm
        setTimeout(() => {
          this.test()
        },1000)
      } else {
        wx.showToast({
          title: resp.data.message,
          icon: 'none',
          duration: 3000
        })
      }
    }
  }
}
</script>

<style scoped>
  .echarts{
    width: 100%;
    font-size: 14px;
  }
  .wrap {
    width: 100%;
    height: 200px;
    margin: 30px auto;
    margin-top: 0px;
  }
</style>

mpvue 使用 echarts