<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ data, xAxisData } = {}) {
      var seriesList = []
      var legendTitle = data.map(item => item.name)
      var color = ['#FF005A', 'rgb(137,189,27)', 'rgb(0,189,212)', 'rgb(234,223,41)', 'rgb(225,105,105)', 'rgb(12,32,225)', 'rgb(130,12,217)', 'rgb(26,86,5)', 'rgb(166,105,9)']
      data.forEach((item, index) => {
        seriesList.push({
          name: item.name,
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: color[index],
              lineStyle: {
                color: color[index],
                width: 2
              }
            }
          },
          data: item.data,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'

        })
      })
      this.chart.setOption({
        xAxis: {
          data: xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: legendTitle
        },
        series: seriesList
      })
    }
  }
}
</script>
