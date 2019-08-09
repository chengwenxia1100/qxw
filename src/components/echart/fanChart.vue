<template>

    <div class="echart">
       <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
    </div>

</template>

<script>
import echarts from 'echarts';
import mpvueEcharts from 'mpvue-echarts';
let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    title: {
        text: '成绩',
        x: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
    stillShowZeroSum: false,
    series: [
        {
          name: 'bug分布',
          type: 'pie',
          radius: '80%',
          center: ['60%', '60%'],
          data: [
              {value: 1, name: '数学'},
              {value: 3, name: '语文'},
              {value: 7, name: '科学'},
              {value: 4, name: '英语'},
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(128, 128, 128, 0.5)'
              }
          }
        }
    ]
  }; // ECharts 配置项
  chart.setOption(option);
  return chart; // 返回 chart 后可以自动绑定触摸操作
}

export default {
  components: {
    mpvueEcharts,
  },
  data () {
    return {
      echarts,
      onInit: initChart,
    }
  }
}
</script>

<style lang="less">

  .echart {
    margin:0.2rem auto;
    width:80%;
    height:5rem;
  }

</style>
