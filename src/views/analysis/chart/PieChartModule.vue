<template>
  <visual-box :title="chartData.title">
    <template v-slot:main>
      <el-row>
        <pie-chart
          ref="pie"
          :class="className"
          :chart-data="chartData"
          :show-lable="showLable"
          :show-legend="showLegend"
        />
      </el-row>
    </template>
  </visual-box>
</template>

<script>
import VisualBox from '../visualBox'
import PieChart from '../components/LoopChart'

export default {
  components: {
    VisualBox,
    PieChart
  },
  props: {
    className: {
      type: String,
      default: 'visual_chart'
    },
    showLable: {
      type: Boolean,
      default: false
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.$refs.pie.setOptions(val)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  position: absolute;
  top: 35px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
