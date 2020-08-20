<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import { yAxisFormatter, unitFormatter } from '@/assets/js/formatter'

export default {
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
      default: '100%'
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
    });
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
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    setOptions({ data, xAxisData, unit } = {}) {
      if (!!data) {
        var unit = unit ? unit : "次";
        var max = []
        var seriesList = []
        var legendTitle = data.map(item => item.name)
        var color = ['rgb(137,189,27)', 'rgb(0,189,212)', 'rgb(219,50,51)', 'rgb(234,223,41)', 'rgb(225,105,105)', 'rgb(12,32,225)', 'rgb(130,12,217)', 'rgb(26,86,5)', 'rgb(166,105,9)']
        data.forEach((item, index) => {
          seriesList.push({
            name: item.name,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: color[index].slice(0, -1) + ',0.3)'
                }, {
                  offset: 0.8,
                  color: color[index].slice(0, -1) + ',0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: color[index]
              }
            },
            data: item.data
          })
          max.push(Math.max(...item.data))
        })
        max = Math.max(...max)
        unit = unitFormatter(max, unit)
        this.chart.setOption({
          title: {
            text: unit,
            left: "0",
            top: "0",
            textStyle: {
              fontSize: 12,
              color: '#fff',
              fontWeight: 'normal'
            },
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            data: xAxisData
          }],
          grid: {
            x: 35,
            y: 25,
            x2: 8,
            y2: 25
          },
          tooltip: { //鼠标指上时的标线
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: legendTitle,
            right: '10px',
            width: '80%',
            top: '0px',
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'

              }
            },
            axisLabel: {
              //Y轴刻度值
              formatter: function (value, index) {
                return yAxisFormatter(value, max)
              },
              margin: 10,
              textStyle: {
                fontSize: 14
              },
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)',
                type: 'dotted'
              }
            }
          }],
          dataZoom: [{
            start: 0,
            show: false
          }, {
            type: 'inside'
          }],
          series: seriesList
        })
      }
    }
  }
}
</script>
