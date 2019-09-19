<template>
  <div class="statistic">
    <canvas canvas-id="runCanvas" id="runCanvas" class='canvas'>
    </canvas>
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  methods: {
    run(x0, y0, nowPercent) {
      // 1° 设置配置参数
      // 环形的线宽度
      const lineWidth = 8;
      // 半径
      const radius = x0 - lineWidth;
      // 起始弧
      const sAngle = -0.5 * Math.PI;
      // 终止弧
      let eAngle = (2 * Math.PI / 100 * nowPercent) - 0.5 * Math.PI;

      // 2° 画圆环阴影
      this.ctx2.setLineWidth(8);
      this.ctx2.setStrokeStyle('#d2d2d2');
      this.ctx2.setLineCap('round')
      this.ctx2.arc(x0, y0, radius, 0, 2 * Math.PI, false);
      //对当前路径进行描
      this.ctx2.stroke();

      // 3° 画圆环激活高亮部分
      this.ctx2.beginPath();//开始一个新的路径
      this.ctx2.setLineWidth(8);
      this.ctx2.setStrokeStyle('#00D49F');
      this.ctx2.setLineCap('round')
      this.ctx2.arc(x0, y0, radius, sAngle, eAngle, false);
      this.ctx2.stroke();

      // 4° 设置环心字体
      this.ctx2.beginPath();
      // 字体大小 注意不要加引号
      this.ctx2.font = 'normal noraml 16px sans-serif';
      // 字体颜色
      this.ctx2.setFillStyle("#00D49F");
      // 字体位置
      this.ctx2.setTextAlign("center");
      // 字体对齐方式
      this.ctx2.setTextBaseline("middle");
      // 文字内容和文字坐标
      this.ctx2.fillText(nowPercent + "%", x0, y0);

      // 5°最后通过draw把上面的描述绘制出来
      this.ctx2.draw();
    },

    draw(id, percent) {
      this.ctx2 = wx.createCanvasContext(id);
      const that = this;
      wx.createSelectorQuery().select('#' + id).boundingClientRect(function (rect) { //监听canvas的宽高
        // 获取圆心坐标
        var x0 = parseInt(rect.width / 2); //获取canvas宽的的一半
        var y0 = parseInt(rect.height / 2); //获取canvas高的一半，
        // 开始画画
        that.run(x0, y0, percent);
      }).exec();
    },

  },
  onLoad() {
    this.draw('runCanvas', 50);
  }
}
</script>

<style lang="less" scoped>
  .canvas {
    width: 90px;
    height: 90px;
    // position: absolute;
    // left: 0;
    // top: 0;
    bottom: 0;
    right: 0;
    margin: auto auto;
    z-index: 99;
  }
</style>
<style lang="less">
</style>




