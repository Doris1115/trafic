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
    },
    showLable: {
      type: Boolean,
      default: false
    },
    showLegend: {
      type: Boolean,
      default: false
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
    },
    
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
      this.setOptions(this.chartData);
    },
    setOptions({ data } = {}) {
      if (!!data) {
        var baseDataWrap = [];
        var legendTitle = data.map(item => item.name)
        var colorWrap = ['#3087d6', '#f6ce54', '#4be1ff', '#b6e9ff', '#18edc9', '#6ac5fa'];
        for (let i = 0; i < data.length; i++) {
          baseDataWrap.push({
            value: data[i].value,
            name: data[i].name,
            itemStyle: {
              normal: {
                color: colorWrap[i],
                borderWidth: 5,
                borderColor: colorWrap[i],
                shadowBlur: 50,
                shadowColor: 'rgba(7, 132, 250, 0.8)',
              }
            }
          }, {
            value: 5,
            name: '',
            itemStyle: {
              normal: {
                color: 'transparent',
                borderWidth: 5,
                borderColor: 'transparent',

              }
            },
            tooltip: {
              show: false
            },
          })
        }

        this.chart.setOption({
          grid: {
            left: '0',
            top: '30',
            right: '0',
            bottom: '0',
            containLabel: true
          },
          legend: {
            show: this.showLegend,
            icon: 'rect',
            itemWidth: 14,
            orient: 'vertical',
            itemHeight: 5,
            itemGap: 5,
            data: legendTitle,
            right: '10px',
            top: '0px',
            // formatter: function (name) {
            //   return name.replace(/[交警大队]|湘潭市/ig, '');
            // },
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            confine: true,
            formatter: '{b} : {c} ({d}%)'
          },
          series: [{
            type: 'pie',
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            avoidLabelOverlap: true,
            center: ['50%', '55%'],
            radius: ['50%', '70%'],
            label: {
              normal: {
                show: this.showLable
              }
            },
            data: baseDataWrap
          }

          ]
        })
      }
    }
  }
}
</script>
