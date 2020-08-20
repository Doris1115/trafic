<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content">
        <table-module :chart-data="carTimeData" />
        <historgram :chart-data="carTypeData" />
        <line-chart-module :chart-data="hIsData" />
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content">
        <title-module :chart-data="timerCongestionData" />
        <map-module :page-title="pageTitle" :chart-data="ODData" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content">
        <line-chart-module :chart-data="aLARMData" />
        <pie-chart-module :chart-data="congestionHisData" :show-lable="true"/>
        <!-- <bar-chart :chart-data="indexHisData" /> -->
        <historgram :chart-data="indexHisData" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Historgram from '../chart/Historgram'
import LineChartModule from '../chart/LineChartModule'
import PieChartModule from '../chart/PieChartModule'
import MapModule from '../chart/MapModule'
import TitleModule from '../chart/TitleModule'
import BarChart from '../chart/BarChart'
import TableModule from '../chart/TableModule'
import { timerCongestion, congestionHis, hIs, indexHis, aLARM, carTime, carType, OD } from '@/api/analysis/alarm'

export default {
  components: {
    Historgram,
    LineChartModule,
    MapModule,
    TitleModule,
    TableModule,
    BarChart,
    PieChartModule
  },
  data() {
    return {
      timerCongestionData: [],
      congestionHisData: {},
      hIsData: {},
      indexHisData: {},
      aLARMData: {},
      carTimeData: {},
      carTypeData: {},
      ODData: {},
      pageTitle: '拥堵流量'
    }
  },
  created() {
    this.getHIs();
    this.getIndexHis();
    this.getALARM();
    this.getCarTime();
    this.getCarType();
    this.getTimerCongestion();
    this.getCongestionHis();
    this.getOD();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getHIs();
      this.getIndexHis();
      this.getALARM();
      this.getCarTime();
      this.getCarType();
      this.getTimerCongestion();
      this.getCongestionHis();
      this.getOD();
    }, 10 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getTimerCongestion() {
      var list = {
        Total: '当日拥堵报警总量',
        DayTotal: '当日过车总量',
        TimeIndexTotal: '瞬时拥堵指数(实时)',
        TopIndexTotal: '高峰时段拥堵指数'
      }
      timerCongestion().then(res => {
        this.timerCongestionData = Object.keys(list).map(key => {
          return {
            title: list[key],
            spanCol: 6,
            account: res[key]
          }
        })
      })

    },
    getHIs() {
      hIs().then(res => {
        this.hIsData = res;
      })
    },
    getIndexHis() {
      indexHis().then(res => {
        this.indexHisData = res
      })
    },
    getCongestionHis() {
      congestionHis().then(res => {
        this.congestionHisData = res
      })
    },
    getALARM() {
      aLARM().then(res => {
        this.aLARMData = res
      })
    },
    getCarTime() {
      carTime().then(res => {
        var num = 5;
        res.flowData = res.flowData.slice(0, num)
        this.carTimeData = res
      })
    },
    getCarType() {
      carType().then(res => {
        this.carTypeData = res;
        this.carTypeData.isColorChange = true;
      })
    },
    getOD() {
      OD().then(res => {
        this.ODData = res;
      })
    }
  },
}

</script>

<style lang='scss' scoped>
.el-row,
.el-col,
.grid-content {
  height: 100%;
}
</style>