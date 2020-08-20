<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import { xiangtan } from '@/assets/js/xiangtan'
export default {
  props: {
    className: {
      type: String,
      default: 'visual_chart'
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
      chart: null,
      markSize: !!this.chartData.symbolSize ? this.chartData.symbolSize : 10
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
      this.initChart();
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
    setOptions({ citys } = {}) {
      if (!!citys) {
        var baseSize = 10
        citys = citys.map(item => {
          var size = typeof this.markSize == 'number' ? this.markSize : item.value[-1] / baseSize
          return {
            name: item.name,
            value: item.value,
            symbolSize: size,
            itemStyle: {
              normal: {
                color: '#F58158'
              }
            }
          }
        })
        echarts.registerMap('xiangtan', xiangtan);
        var option = {
          title: {
            text: '',
            left: 'center',
            textStyle: {
              color: 'red'
            }
          },
          legend: {
            show: false,
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: ['地点'],
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: 'xiangtan',
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: 'rgba(7,21,57,0.5)',
                borderColor: '#0177ff'
              },
              emphasis: {
                areaColor: '#071537' //鼠标指上市时的颜色
              }
            },
            emphasis: {
              itemStyle: {
                areaColor: 'red',
                borderColor: 'green'
              }
            },
            scaleLimit: { //滚轮缩放的极限控制
              min: 1,
              max: 20
            },
            zoom: 1
          },
          series: [{
            name: '地点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              color: '#fff',
              emphasis: {
                show: true,
                position: 'top',
                formatter: (params) => {
                  return params.name + params.value[2]
                }
              }
            },
            showEffectOn: 'render',
            itemStyle: {
              normal: {
                color: '#46bee9'
              }
            },
            data: citys
          }]
        };
        this.chart.setOption(option)
      }
    },


  }
}
</script>
