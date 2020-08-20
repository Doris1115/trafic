<template>
  <visual-box :title="chartData.title">
    <template v-slot:main>
      <el-row>
        <bar ref="bar" :class="className" :chart-data="chartData" />
      </el-row>
    </template>
  </visual-box>
</template>

<script>
import VisualBox from '../visualBox'
import Bar from '../components/BarSimple'

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
    }},
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.$refs.bar.setOptions(val)
      }
    }
  },
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
