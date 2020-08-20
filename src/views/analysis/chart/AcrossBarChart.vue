<template>
  <visual-box :title="chartData.title">
    <template v-slot:main>
      <el-carousel
        v-if="carouselData.length>0"
        direction="vertical"
        :autoplay="false"
        height="100%"
      >
        <el-carousel-item v-for="(item,index) in carouselData" :key="index">
          <bar :class="className" :chart-data="item" />
        </el-carousel-item>
      </el-carousel>
    </template>
  </visual-box>
</template>
s
<script>
import VisualBox from '../visualBox'
import Bar from '../components/AcrossBar'

export default {
  components: {
    VisualBox,
    Bar
  },
  props: {
    className: {
      type: String,
      default: 'visual_chart'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  computed: {
    carouselData() {
      var data = [];
      var gap = 6
      if (!!this.chartData.xAxisData) {
        for (var i = 0; i < this.chartData.xAxisData.length; i += gap) {
          data.push({
            data: this.chartData.data.map(item => {
              return {
                value: item.value.slice(i, i + gap),
                name: item.name
              }
            }),
            xAxisData: this.chartData.xAxisData.slice(i, i + gap)
          })
        }
      }
      return data
    }
  },
};
</script>
<style lang="scss" scoped>
.el-carousel,.el-carousel__container {
  position: absolute;
  top: 35px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
