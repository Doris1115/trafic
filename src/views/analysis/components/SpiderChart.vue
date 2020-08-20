<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

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
    setOptions({ data } = {}) {
      if (!!data) {
        var max = data[0].value
        var color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131'];
        data.forEach(function (d) {
          max = d.value > max ? d.value : max;
        });

        var renderData = [{
          value: [],
          name: "告警类型TOP5",
          symbol: 'none',
          lineStyle: {
            normal: {
              color: '#ecc03e',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
                [{
                  offset: 0,
                  color: 'rgba(203, 158, 24, 0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(190, 96, 20, 0.8)'
                }],
                false)
            }
          }
        }];


        data.forEach(function (d, i) {
          var value = ['', '', '', '', ''];
          value[i] = max,
          renderData[0].value[i] = d.value;
          renderData.push({
            value: value,
            symbol: 'circle',
            symbolSize: 12,
            lineStyle: {
              normal: {
                color: 'transparent'
              }
            },
            itemStyle: {
              normal: {
                color: color[i],
              }
            }
          })
        })
        var indicator = [];

        data.forEach(function (d) {
          indicator.push({
            name: d.name,
            max: max,
            color: '#fff'
          })
        })
        this.chart.setOption({
          tooltip: {
            show: true,
            confine: true,
            trigger: "item",
            padding: [20, 15],
            formatter: (params) => {
              var html = '';
              indicator.forEach((item, i) => {
                html += `${item.name}:${data[i].value}</br>`
              })
              return html
            }
          },
          radar: {
            center: ["50%", "50%"], //偏移位置
            radius: "70%",
            startAngle: 40, // 起始角度
            splitNumber: 4,
            shape: "circle",
            splitArea: {
              areaStyle: {
                color: 'transparent'
              }
            },
            axisLabel: {
              show: false,
              fontSize: 20,
              color: "#000",
              fontStyle: "normal",
              fontWeight: "normal"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },
            indicator: indicator,
            name: {
              formatter: function (value, indicator) {
                if (!!value&&value.length > 6) {
                  return value.slice(0, 6) + '...'
                } else {
                  return value
                }
              }
            },
            textStyle: {
              width: '20px'

            }
          },
          series: [{
            type: "radar",
            data: renderData,
          }]
        })
      }
    }
  }
}
</script>
