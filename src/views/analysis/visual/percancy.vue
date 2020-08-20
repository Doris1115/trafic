<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content">
        <bar-chart :chart-data="highSegmentData" />
        <LineChartModule :chart-data="trendData" />
        <spider-module :chart-data="codeRateData" />
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content">
        <title-module :chart-data="summaryData" />
        <map-module :page-title="pageTitle" :chart-data="highSegmentODData" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content">
        <pieChartModule :chart-data="areaData" :show-lable="true" />
        <pieChartModule :chart-data="collectWayData" :show-lable="true" />
        <Historgram :chart-data="highTimesData" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import LineChartModule from '../chart/LineChartModule'
import PieChartModule from '../chart/PieChartModule'
import MapModule from '../chart/MapModule'
import SpiderModule from '../chart/SpiderModule'
import TitleModule from '../chart/TitleModule'
import Historgram from '../chart/Historgram'
import BarChart from '../chart/BarChart'
import { codeRate, summary, trend, highSegment, area, collectWay, highTimes, highSegmentOD } from '@/api/analysis/analysis'

export default {
  components: {
    LineChartModule,
    MapModule,
    TitleModule,
    SpiderModule,
    BarChart,
    Historgram,
    PieChartModule
  },
  data() {
    return {
      codeRateData: {},
      summaryData: [],
      trendData: {},
      highSegmentData: {},
      areaData: {},
      collectWayData: {},
      highTimesData: {},
      highSegmentODData:{},
      pageTitle: '违法高发地段统计'
    }
  },
  created() {
    this.getCodeRate();
    this.getSummary();
    this.getTrend();
    this.getHighSegment();
    this.getArea();
    this.getCollectWay();
    this.getHighTimes();
    this.getHighSegmentOD();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getCodeRate();
      this.getSummary();
      this.getTrend();
      this.getHighSegment();
      this.getArea();
      this.getCollectWay();
      this.getHighTimes();
      this.getHighSegmentOD();
    }, 10 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getCodeRate() {
      codeRate().then(res => {
        res.title = '违法类型占比';
        this.codeRateData = res;
      })
    },
    getSummary() {
      var list = {
        Total: '违法总量',
        MonthTotal: '当月违法总量',
        VehicheMonthTotal: '货车当月总量',
        ManualMonthTotal: '手动抓违法总量'
      }
      summary().then(res => {
        this.summaryData = Object.keys(list).map(key => {
          return {
            title: list[key],
            spanCol: key == 'Total' ? 7 : key == 'ManualMonthTotal' ? 5 : 6,
            account: res[key]
          }
        })
      })
    },
    getTrend() {
      trend().then(res => {
        res.title = '当月违法总数趋势';
        res.xAxisData = res.xAxisData.map(item => item + '日')
        this.trendData = res
      })
    },
    getHighSegment() {
      highSegment().then(res => {
        res.title = '高发路段';
        res.unit = '次';
        this.highSegmentData = res
      })
    },
    getArea() {
      area().then(res => {
        res.title = '辖区违法量';
        this.areaData = res
      })
    },
    getCollectWay() {
      collectWay().then(res => {
        res.title = '采集方式';
        this.collectWayData = res
      })
    },
    getHighTimes() {
      highTimes().then(res => {
        this.highTimesData.title = '违法高发时段';
        res.xAxisData = [];
        var val = [];
        for (var i = 0; i < 24; i += 4) {
          val.push(res.data[0].data.splice(0, 4))
          res.xAxisData.push(`${i}~${i + 4}`)
        }
        val = val.map(item => {
          return item.reduce((pre, value) => {
            return pre + value
          }, 0)
        })
        res.data[0].value = val
        this.highTimesData = res
      })
    },
    getHighSegmentOD() {
      highSegmentOD().then(res => {
        console.log('res',res)
        this.highSegmentODData = res
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