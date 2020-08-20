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
    isColorChange: {
      type: Boolean,
      default: false
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

  computed: {
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
        var unit = !!unit ? unit : "次"
        var max = []
        var isShowLable = xAxisData.length < 10 ? true : false;
        var seriesList = []
        var color = ['#446ACF', '#4fb69d', '#4f369d']
        data.forEach((item, index) => {
          seriesList.push({
            type: 'bar',
            data: item.value,
            label: {
              show: isShowLable,
              position: 'top',
              textStyle: {
                color: '#ffffff'
              },
              formatter: function (params) {
                return params.value
              //   if (params.value > 1000) {
              //     return params.value / 10000 + '万'
              //   } else if (params.value > 10000000) {
              //     return params.value / 100000000 + "/亿";
              //   } else {
              //     return params.value
              //   }
              }
            },
            barMaxWidth: 15,
            // barMinHeight: 35,
            itemStyle: {
              normal: {
                barBorderRadius: 50,
                color: color[index]
              }
            }
          })
          max.push(Math.max(...item.value))
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
          grid: {
            left: '0',
            top: '30',
            right: '0',
            bottom: '0',
            containLabel: true
          },
          legend: {
            top: 0,
            textStyle: {
              color: '#fff'
            },
            itemWidth: 10, // 设置宽度
            itemHeight: 10 // 设置高度
          },

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },

          xAxis: {
            type: 'category',
            data: xAxisData,
            axisTick: {
              //---坐标轴 刻度
              show: true //---是否显示
            },
            axisLine: {
              //---坐标轴 轴线
              show: true, //---是否显示
              lineStyle: {
                color: '#57617B'
              }
            },

            axisLabel: {
              //X轴文字
              textStyle: {
                fontSize: 12,
                color: '#fff',
              },
              rotate: 0,
              // formatter: function (value, index) {
              //   if (value.length > 3) {
              //     return value.slice(0, 2)
              //   }
              // }
            }
          },

          yAxis: {
            type: 'value',
            splitLine: {
              //分割线
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'dotted'
              }
            },
            axisLabel: {
              //Y轴刻度值
              formatter: function (value, index) {
                return yAxisFormatter(value, max)
              },
              textStyle: {
                fontSize: 12,

                color: '#fff'
              }
            },

            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },

          series: seriesList
        })
      }
    }
  }
}
</script>
