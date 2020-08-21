<template>
  <visual-box :title="chartData.title" class="enforce-box">
    <template v-slot:main>
      <dl>
        <dd v-for="(item,index) in chartData.data" :key="index">
          <span>{{ item.time }}</span>
          <p>{{ item.content }}</p>
        </dd>
      </dl>
    </template>
  </visual-box>
</template>
<script>
import VisualBox from '../visualBox'
export default {
  components: {
    VisualBox
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
  }

}
</script>

<style lang='scss' scoped>
.enforce-box {
  height: calc(50% - 140px);
  overflow: hidden;
}
dl {
  overflow: auto;
  position: absolute;
  top: 30px;
  bottom: 0;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  dd {
    color: #fff;
    border-bottom: 1px dotted #0095d6;
    margin: 0;
    padding: 8px;
    & > span {
      font-size: 14x;
    }
    p {
      margin: 8px auto;
      line-height: 1.5em;
      span {
        font-weight: bolds;
      }
    }
  }
}
</style>
