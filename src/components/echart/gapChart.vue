<template>
  <div class="paper_container">
    <div class="echart">
      <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import mpvueEcharts from "mpvue-echarts";
let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  //当前申请人员统计环形图
  var allValue = 158;
  //标示文字
  var labelTop = {
    normal: {
      label: {
        show: false,
        position: "center",
        // formatter: "{b}",
        textStyle: {
          baseline: "bottom", //垂直对齐方式
          fontSize: 12,
          color: "#666",
          align: "center" //水平对齐方式
        }
      },
      color: "#de4751",
      labelLine: {
        //标示线
        show: false
      }
    }
  };
  var labelFromatter = {
    normal: {
      label: {
        formatter: function(params) {
          return 100 - params.value + "/" + allValue;
        },
        textStyle: {
          baseline: "middle", //垂直对齐方式
          fontSize: 24,
          color: "#666",
          align: "center" //水平对齐方式
        }
      }
    }
  };
  //数据位置
  var labelBottom = {
    normal: {
      color: "#ccc",
      label: {
        show: true,
        position: "center"
      },
      labelLine: {
        show: false
      }
    },
    emphasis: {
      color: "rgba(0,0,0,0)"
    }
  };
  var option = {
    title: {
      text: "70%",
      x: "center",
      y: "60",
      itemGap: 10,
      textStyle: {
        color: "#666",
        fontSize: 24,
        fontWeight: "normal"
      },
      subtextStyle: {
        color: "#de4751",
        fontSize: 12
      }
    },
    series: [
      {
        type: "pie",
        center: ["50%", "50%"],
        radius: ["48%", "85%"],
        x: '0%', // for funnel
        itemStyle: labelFromatter,
        data: [
          { name: "other", value: 30, itemStyle: labelBottom },
          { name: "人员", value: 70, itemStyle: labelTop }
        ]
      }
    ]
  }; // ECharts 配置项
  chart.setOption(option);
  return chart; // 返回 chart 后可以自动绑定触摸操作
}

export default {
  components: {
    mpvueEcharts
  },
  data() {
    return {
      echarts,
      onInit: initChart
    };
  }
};
</script>

<style lang="less">
.paper_container {
  .echart {
    margin-top:0.4rem;
    width:100%;
    height:1rem;
  }
}
</style>
