<template>
  <visual-box :title="chartData.title">
    <template v-slot:main>
      <div ref="box" class="visual_chart sfzcll">
        <el-row>
          <el-col v-for="title in chartData.column" :key="title.index" :span="spanAccount">{{title}}</el-col>
        </el-row>
        <el-row v-for="data in chartData.flowData" :key="data.index" class="sfzcll_box">
          <img class="sfzcll_bkJk" src="@/assets/ksh_images/ksh34.png" />
          <img class="sfzcll_bkJk" src="@/assets/ksh_images/ksh34.png" />
          <img class="sfzcll_bkJk" src="@/assets/ksh_images/ksh34.png" />
          <img class="sfzcll_bkJk" src="@/assets/ksh_images/ksh34.png" />

          <el-col :span="8" class="sfzcll_smallBk">
            <div class="ygl">
              <span :style={height:boxHeight,lineHeight:boxHeight}>{{data.Orgin}}</span>
            </div>
          </el-col>
          <el-col :span="8" class="sfzcll_smallBk">
            <div class="ygh">
              <span :style={height:boxHeight,lineHeight:boxHeight}>{{data.Destination}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <label :style={height:boxHeight,lineHeight:boxHeight}>{{data.Time}} min</label>
          </el-col>
        </el-row>
      </div>
    </template>
  </visual-box>
</template>

<script>
import VisualBox from '../visualBox'
export default {
  components: {
    VisualBox
  },
  data() {
    return {
      vc: 'red'
    }
  },
  props: {
    className: {
      type: String,
      default: 'visual_chart'
    },
    chartData: {
      type: Object,
      required: true
    }  },
  computed: {
    spanAccount() {
      return 24 / (this.chartData.column.length)
    },
    boxHeight() {
      return (this.$refs.box.offsetHeight*0.21-12)+'px';
    }


  },
  mounted() {
    console.log('fe', this.boxHeight)
  },}
</script>


<style lang='scss' scoped>
.visual_chart {
  height: calc(100% - 55px) !important;
}
.sfzcll {
  position: relative;
  .el-col {
    text-align: center;
    line-height: 25px;
    color: #fff;
    display: inline-block;
  }

  .sfzcll_box {
    width: 100%;
    position: relative;
    height: calc(21% - 10px);
    line-height: calc(100% - 2px);
    background: rgba(15, 47, 72, 0.8);
    border: 1px solid #1380bd;
    position: relative;
    margin-bottom: 8px;
    &:last-of-type {
      margin: 0;
    }
    .sfzcll_bkJk {
      position: absolute;
      &:first-of-type {
        top: -2px;
        left: -2px;
      }
      &:nth-child(2) {
        top: -2px;
        right: -2px;
      }
      &:nth-child(3) {
        bottom: -2px;
        right: -2px;
      }
      &:nth-child(4) {
        bottom: -2px;
        left: -2px;
      }
    }
    label {
      width: 100%;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      margin-top: 2px;
      img {
        width: 23px;
        height: 23px;
        margin-right: 5px;
        margin-top: -2px;
      }
    }
    .sfzcll_smallBk {
      height: 100%;
      padding: 2px 5px;
      & > div {
        height: 100%;
        background: url(/static/images/ksh38.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: calc(100% - 2px);
      }
      .ygl {
        color: #00ffc6;
        span{display: block;}
      }
      .ygh {
        color: #ffe400;
      }
    }
  }
}
</style>