<template>
  <div class="visual_conBot">
    <div class="visual_bg conBot1" />
    <div class="visual_bg conBot2" />
    <div class="visual_bg conBot3" />
    <div class="visual_bg conBot4" />
    <div class="visual_chart_text">
      <h1>{{pageTitle}}+大数据</h1>
      <h2>湘潭市交通大数据分析平台</h2>
    </div>
    <el-row>
      <map-chart ref="map" class="visual_chart" :chart-data="chartData" />
    </el-row>
  </div>
</template>

<script>
import MapChart from '../components/MapChart'
export default {
  components: {
    MapChart
  },
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    }  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.$refs.map.setOptions(val)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.visual_conBot {
  height: calc(100% - 136px);
  background: url(/static/images/ksh41.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  & > img {
    position: absolute;
    width: 25px;
    height: 25px;
  }
  .visual_bg {
    position: absolute;
    width: 25px;
    height: 25px;
    background-size: 25px 25px;
    &.conBot1 {
      left: 0;
      top: 0;
      background-image: url(/static/images/ksh42.png);
    }
    &.conBot2 {
      right: 0;
      top: 0;
      background-image: url(/static/images/ksh43.png);
    }
    &.conBot3 {
      left: 0;
      bottom: 5px;
      background-image: url(/static/images/ksh45.png);
    }
    &.conBot4 {
      right: 0;
      bottom: 5px;
      background-image: url(/static/images/ksh44.png);
    }
  }
  .visual_conBot_l {
    position: absolute;
    left: 0;
    top: 0;
  }
  .visual_conBot_2 {
    position: absolute;
    right: 0;
    top: 0;
  }
  .visual_conBot_3 {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .visual_conBot_4 {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .visual_chart {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .visual_chart_text {
    color: #fff;
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 99;
    h1 {
      font-size: 26px;
      margin-bottom: 6px;
    }
    h2 {
      font-size: 20px;
    }
  }
  .visual_conBot_bot {
    width: calc(100% - 8px);
    height: 180px;
    background: rgba(16, 54, 87, 0.5);
    border: 1px solid #345f92;
    position: absolute;
    bottom: 10px;
    left: 4px;
    z-index: 99;
  }
}

.visualSssf_left {
  width: 40%;
  float: left;
  color: #fff;
  padding: 10px 20px 0 20px;
  h3 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  a {
    width: 32%;
    color: #fff;
    display: inline-block;
    margin-bottom: 10px;
    cursor: pointer;
    &.active {
      color: #01f0ff;
    }
  }
}
.visualSssf_right {
  width: 60%;
  height: 100%;
  float: left;
  .visualSssf_right_box {
    width: 33%;
    float: left;
    height: 100%;
  }
}
.el-row {
  position: absolute;
  top: 35px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
