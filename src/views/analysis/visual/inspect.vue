<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content">
        <LineChartModule :chart-data="trendData" />
        <pieChartModule :chart-data="areaData" :show-lable="true" />
        <spider-module :chart-data="alarmTypeData" />
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content">
        <title-module :chart-data="summaryData" />
        <map-module :page-title="pageTitle" :chart-data="highAddressODData" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content">
        <across-bar :chart-data="highAddressData" />
        <LineChartModule :chart-data="monthAlarmTypeData" />
        <bar-chart :chart-data="highAddressData" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import AcrossBar from '../chart/AcrossBarChart'
import LineChartModule from '../chart/LineChartModule'
import PieChartModule from '../chart/PieChartModule'
import MapModule from '../chart/MapModule'
import SpiderModule from '../chart/SpiderModule'
import TitleModule from '../chart/TitleModule'
import BarChart from '../chart/BarChart'
import { summary, trend, area, alarmType, highAddress, monthAlarmType, monthHighAddress, highAddressOD } from '@/api/analysis/suspicion'

export default {
  components: {
    AcrossBar,
    BarChart,
    LineChartModule,
    MapModule,
    TitleModule,
    SpiderModule,
    PieChartModule
  },
  data() {
    return {
      pageTitle: '稽查布控',
      summaryData: [],
      trendData: {},
      areaData: {},
      alarmTypeData: {},
      highAddressData: {},
      monthAlarmTypeData: {},
      monthHighAddressData: {},
      highAddressODData: {}
    }
  },
  created() {
    this.getSummary();
    this.getTrend();
    this.getArea();
    this.getAlarmType();
    this.getHighAddress();
    this.getMonthAlarmType();
    this.getMonthHighAddress();
    this.getHighAddressOD();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getSummary();
      this.getTrend();
      this.getArea();
      this.getAlarmType();
      this.getHighAddress();
      this.getMonthAlarmType();
      this.getMonthHighAddress();
      this.getHighAddressOD();
    },10 *60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getSummary() {
      var list = {
        TodaySspcnVehicleTotal: '布控车辆总量',
        TodayAlarmVehicleTotal: '当日报警车辆总量',
        TodayAlarmRate: '当日报警率',
        TodayUnsspcnRate: '当日处置率'
      }
      summary().then(res => {
        this.summaryData = Object.keys(list).map(key => {
          return {
            title: list[key],
            spanCol: 6,
            account: key.indexOf('Rate') > 0 ? (res[key] * 100).toFixed(2) + '%' : res[key]
          }
        })
      })
    },

    getTrend() {
      trend().then(res => {
        res.title = '报警总量趋势'
        this.trendData = res
      })
    },
    getArea() {
      area().then(res => {
        res.title = '辖区报警量';
        console.log('fd',res)
        this.areaData = res
      })
    },
    getAlarmType() {
      alarmType().then(res => {
        res.title = '当日报警类别';
        this.alarmTypeData = res
      })
    },
    getHighAddress() {
      highAddress().then(res => {
        res.title = '报警高发地排名';
        this.highAddressData = res
      })
    },
    getMonthAlarmType() {
      monthAlarmType().then(res => {
        res.title = '当月报警类别分析';
        this.monthAlarmTypeData = res
      })
    },
    getMonthHighAddress() {
      monthHighAddress().then(res => {
        this.monthHighAddressData = res
      })
    },
    getHighAddressOD() {
      highAddressOD().then(res => {
        console.log("稽查",res)
        this.highAddressODData = res
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