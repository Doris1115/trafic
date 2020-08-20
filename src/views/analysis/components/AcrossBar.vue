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
    setOptions({ data, xAxisData } = {}) {

      if (!!data) {
        var salvProName = xAxisData;
        var salvProValue = data[0].value;
        var salvProMax = [];//背景按最大值
        const maxData = 300;
        const size = 22;
        const num = 10;
        const innerWidth = size * num;
        for (let i = 0; i < salvProValue.length; i++) {
          salvProMax.push(salvProValue[0])
        }
        var option = {
          'title': {
            'text': ' ',
            'left': 'center',
            'y': '10',
            'textStyle': {
              'color': '#fff'
            }
          },

          'grid': {
            "left": 30,
            "top": 0,
            "bottom": 10
          },
          'tooltip': {
            'trigger': 'item',
            'confine': true,
            'textStyle': {
              'fontSize': 12
            },
            'formatter': '{b0}:{c0}'
          },
          'xAxis': {
            'max': 100,
            'show': true,
            ' position': 'top',
            'splitLine': {
              'show': false
            },
            'axisLine': {
              'show': false
            },
            'axisLabel': {
              'show': false
            },
            'axisTick': {
              'show': false
            }
          },
          'yAxis': [
            {
              'type': 'category',
              'inverse': false,
              'data': salvProName,
              'axisLine': {
                'show': false
              },
              'axisTick': {
                'show': false
              },
              'axisLabel': {
                'margin': [-4],
                'textStyle': {
                  'color': '#fff',
                  'fontSize': 16.25
                },
                formatter: function (value) {
                  if (value.length > 3) {
                    return value.slice(0, 3)
                  } else {
                    return value
                  }
                }
              }
            },

          ],
          'series': [
            {
              'id': 'forward',
              'type': 'pictorialBar',
              'symbol': "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUBAMAAABlm+CwAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURQew/wAAAAew/wew/wew/wen/wep/wem/wev/weq/wen/weo/wem/wen/weq/wem/2DT+WQAAAAPdFJOUwEAEAQIt3LsHlXMjOKkLqmNLeMAAACxSURBVBjTYxAUZAABQRBgEGQwBgEwj0GA2UlJSUnFmRHMsQwFgU0GQB4Ds/t/EPjpzADi6EM4KkApBmZ1MOdv5mOgWSwQzvfzPwwYYZyfHV+dkTjzHzPC9Pzs6AkxgHH+rFr+xQBmNBAUATmuMA5QRsAo9f/XtLTc/79SgBwT7f+/m5Ta/n9VZmQQZHb7/03FRfP/b6A9ggJGWUnGzCZZmwyAnhNkBnpNAESAOAIMMAIA/b9rDcM60qoAAAAASUVORK5CYII=",
              'symbolRepeat': 'fixed',
              'symbolMargin': '5%',
              'symbolClip': true,
              'symbolSize': size,
              'symbolPosition': 'start',
              'symbolOffset': [
                20,
                0
              ],
              'symbolBoundingData': 300,
              'data': salvProValue,
              'z': 10
            },
            {
              'id': 'floor',
              'type': 'pictorialBar',
              'itemStyle': {
                'normal': {
                  'opacity': 0.3
                }
              },
              'label': {
                'normal': {
                  'show': false
                }
              },
              'animationDuration': 0,
              'symbolRepeat': 'fixed',
              'symbolMargin': '5%',
              'symbol': "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUBAMAAABlm+CwAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURQew/wAAAAew/wew/wew/wen/wep/wem/wev/weq/wen/weo/wem/wen/weq/wem/2DT+WQAAAAPdFJOUwEAEAQIt3LsHlXMjOKkLqmNLeMAAACxSURBVBjTYxAUZAABQRBgEGQwBgEwj0GA2UlJSUnFmRHMsQwFgU0GQB4Ds/t/EPjpzADi6EM4KkApBmZ1MOdv5mOgWSwQzvfzPwwYYZyfHV+dkTjzHzPC9Pzs6AkxgHH+rFr+xQBmNBAUATmuMA5QRsAo9f/XtLTc/79SgBwT7f+/m5Ta/n9VZmQQZHb7/03FRfP/b6A9ggJGWUnGzCZZmwyAnhNkBnpNAESAOAIMMAIA/b9rDcM60qoAAAAASUVORK5CYII=",
              'symbolSize': size,
              'symbolBoundingData': 300,
              'symbolPosition': 'start',
              'symbolOffset': [
                20,
                0
              ],
              'data': salvProValue,
              'z': 5
            }
          ]
        };
        this.chart.setOption(option)
        // var dist = this.chart.convertToPixel({ xAxisIndex: 0 }, maxData) - this.chart.convertToPixel({ xAxisIndex: 0 }, 0)
        // var margin = (dist - innerWidth) / ((num - 1) * 2);
        // console.log('象形图', this.chart, margin)
        // this.cahrt.setOption({
        //   series: [{
        //     id: 'forward',
        //     symbolMargin: margin
        //   }, {
        //     id: 'floor',
        //     symbolMargin: margin
        //   }]
        // });
      }
    }
  }
}
</script>
