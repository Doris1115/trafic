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
    active: {
      type: Boolean,
      default: false
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
    setOptions(data) {
      if (!!data) {
        var size = this.active ? 60 : 40
        var color = this.active ? '#0AFCE0' : '#fff'
        var option = {
          series: (function () {
            var result = [];
            var centerPoint = ['50%', '50%']
            var score = typeof data.data == 'number' ? data.data : 0;
            result.push({
              name: data.typeName,
              type: 'gauge',
              radius: '100%',
              startAngle: 225,
              endAngle: -45,
              min: 0,
              max: 100,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 150,
                  color: [
                    [
                      score / 100, new echarts.graphic.LinearGradient(
                        0, 1, 0, 0, [{
                          offset: 0,
                          color: 'rgba(69, 161, 255,0)',
                        }, {
                          offset: 0.3,
                          color: 'rgba(69, 161, 255,0)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(69, 161, 255,0.7)',
                        }]
                      )
                    ],
                    [
                      1, 'rgba(28,128,245,.0)'
                    ]
                  ],
                }
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: 0,
              },
              axisLabel: {
                show: 0
              },
              pointer: {
                show: false,
              },
              detail: {
                show: false,
              },
              data: [{
                show: false,
              }]
            }, {
              name: data.typeName,
              type: 'gauge',
              radius: '73.10%',
              startAngle: 225,
              endAngle: -45,
              min: 0,
              max: 100,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 150,
                  color: [
                    [
                      data.value / 100, new echarts.graphic.LinearGradient(
                        0, 1, 0, 0, [{
                          offset: 0,
                          color: 'rgba(69, 161, 255,0)',
                        }, {
                          offset: 0.3,
                          color: 'rgba(69, 161, 255,0)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(69, 161, 255,0.7)',
                        }
                      ]
                      )
                    ],
                    [
                      1, 'rgba(28,128,245,.0)'
                    ]
                  ],
                }
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: 0,
              },
              axisLabel: {
                show: 0
              },
              pointer: {
                show: false,
                length: '100%'
              },
              detail: {
                show: true,
                offsetCenter: [1, '1%'],
                textStyle: {
                  fontSize: size,
                  color: color
                }
              },
              itemStyle: {
                color: 'rgba(28, 128, 245,.3)',
                borderColor: 'rgba(28, 128, 245,1)',
              },
              data: [{
                value: score
              }]
            }, {
              type: 'gauge',
              radius: '60%',
              splitNumber: 20,
              min: 0,
              max: 100,
              startAngle: 225,
              endAngle: -45,
              axisLabel: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  color: [
                    [1,
                      new echarts.graphic.LinearGradient(0, 0, 1, 0, [

                        {
                          offset: 1,
                          color: '#194383'
                        },
                        {
                          offset: 1,
                          color: '#194383'
                        }
                      ])
                    ]
                  ],
                }
              },

              splitLine: {
                show: true,
                length: 14,
                color: "#90D1FE"

              },
              pointer: {
                show: 0
              },
              detail: {
                show: 0
              }
            }, {
              type: 'gauge',
              radius: '90%',
              splitNumber: 10,
              splitLine: {
                show: false
              },
              min: 0,
              max: 100,
              startAngle: 225,
              endAngle: -45,
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false,

              },

              pointer: {
                show: 0
              },
              axisTick: {
                show: false
              },
              detail: {
                show: true,
                offsetCenter: [0, '56%'],
                formatter: data.typeName,
                textStyle: {
                  fontSize: 16,
                  color: '#ffffff',
                  lineHeight: 24,
                  fontWeight: 'bold',
                }



              }
            }, {
              type: 'gauge',
              radius: '73%',
              splitNumber: 10,
              splitLine: {
                show: false
              },
              min: 0,
              max: 100,
              startAngle: 225,
              endAngle: -45,
              axisLabel: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 2,
                  shadowBlur: 0,
                  color: [
                    [0.05, '#3F6BFC'],
                    [0.10, '#4072FB'],
                    [0.15, '#4077F9'],
                    [0.20, '#417BF9'],
                    [0.25, '#4282F8'],
                    [0.30, '#4385F7'],
                    [0.35, '#4389F6'],
                    [0.40, '#448FF5'],
                    [0.45, '#4594F4'],
                    [0.50, '#4599F3'],
                    [0.55, '#469EF2'],
                    [0.60, '#46A3F1'],
                    [0.65, '#46A6F0'],
                    [0.70, '#24befe'],
                    [0.75, '#12d1ff'],
                    [0.80, '#06defe'],
                    [0.85, '#05e0ff'],
                    [0.90, '#06deff'],
                    [0.95, '#06deff'],
                    [1, '#06deff']
                  ],

                }

              },
              pointer: {
                show: 0
              },
              axisTick: {
                show: false
              },
              detail: {
                show: false
              }

            }, {
              type: 'gauge',
              radius: '82%',
              splitNumber: 10,
              splitLine: {
                show: false
              },
              min: 0,
              max: 100,
              startAngle: 225,
              endAngle: -45,
              axisLabel: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 2,
                  shadowBlur: 0,
                  color: [
                    [0.05, '#0A498E'],
                    [0.10, '#0C58A7'],
                    [0.15, '#254DD3'],
                    [0.20, '#355FEC'],
                    [0.25, '#4072FB'],
                    [0.30, '#355FEC'],
                    [0.35, '#254DD3'],
                    [0.40, '#06478B'],
                    [0.45, '#0A246C'],
                    [0.50, '#071848'],
                    [0.55, '#071848'],
                    [0.60, '#0A246C'],
                    [0.65, '#06478B'],
                    [0.70, '#254DD3'],
                    [0.75, '#355FEC'],
                    [0.80, '#355FEC'],
                    [0.85, '#254DD3'],
                    [0.90, '#0C58A7'],
                    [0.95, '#0A498E'],
                    [1, '#0A498E']
                  ],

                }

              },
              pointer: {
                show: 0
              },
              axisTick: {
                show: false
              },
              detail: {
                show: false
              }

            }, { //外圆
              type: 'pie',
              radius: '100%',
              center: centerPoint,
              z: 0,
              itemStyle: {
                color: '#061537',
              },
              hoverAnimation: false,
              label: {
                show: false,
              },
              tooltip: {
                show: false
              },
              data: [120],
              animationType: "scale"
            });

            return result;
          })()
        };
        this.chart.setOption(option)
      }
    }
  }
}
</script>
