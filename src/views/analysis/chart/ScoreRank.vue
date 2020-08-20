<template>
  <visual-box :title="chartData.title">
    <template v-slot:main>
      <div>
        <el-row class="toggle-nav">
          <el-col :span="12">
            <div class="grid-content btn-15" :class="{active:!activeIndex}" @click="toggleTab(0)">大队</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content btn-15" :class="{active:activeIndex}" @click="toggleTab(1)">中队</div>
          </el-col>
        </el-row>
        <div class="rank-box">
          <dl>
            <dd v-for="(item,index) in rankData" :key="index">
              <el-row>
                <el-col :span="4">
                  <i v-if="index<3" class="el-icon-trophy-1" />
                  <span v-else>{{ index }}</span>
                </el-col>
                <el-col :span="14">{{ item.name }}【{{ item.userCode }}】</el-col>
                <el-col :span="6">{{ item.score.toFixed(2) }}分</el-col>
              </el-row>
            </dd>
          </dl>
        </div>
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
  data() {
    return {
      rankData: [],
      activeIndex: 0
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.rankData = this.chartData.data
      }
    }
  },
  created() {
    this.rankData = this.chartData.data
  },
  methods: {
    toggleTab(index) {
      this.activeIndex = index
      this.$listeners.toggleRank()
    }
  },

};
</script>

<style lang='scss' scoped>
.toggle-nav {
  margin-top: -5px;
  .grid-content {
    width: 100%;
    line-height: 38px;
    font-size: 14px;
    text-align: center;
    height: 38px;
    color: #fff;
    border-radius: 5px;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0 rgba(255, 255, 255, 0.5),
      7px 7px 20px 0 rgba(0, 0, 0, 0.1), 4px 4px 5px 0 rgba(0, 0, 0, 0.1);
  }
  .btn-15 {
    background: #061537;
    background: linear-gradient(
      0deg,
      rgba(6, 25, 54, 1) 0,
      rgba(6, 14, 131, 1) 100%
    );
    border: 0;
    z-index: 1;
    &:after {
      position: absolute;
      content: "";
      width: 0;
      height: 100%;
      top: 0;
      right: 0;
      z-index: -1;
      background-color: #0095d6;
      border-radius: 5px;
      box-shadow: inset 2px 2px 2px 0 rgba(255, 255, 255, 0.5),
        7px 7px 20px 0 rgba(0, 0, 0, 0.1), 4px 4px 5px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    &:hover {
      color: #fff;
    }

    &:hover:after {
      left: 0;
      width: 100%;
    }
    &:active {
      top: 2px;
    }
    &.active {
      background: linear-gradient(
        0deg,
        rgba(0, 145, 208, 1) 0,
        rgba(0, 117, 168, 1) 100%
      );
    }
  }
}
.rank-box {
  position: absolute;
  top: 80px;
  bottom: 0;
  width: 100%;
  overflow: auto;
}
dl {
  margin: 0;
  dd {
    color: #fff;
    font-size: 1em;
    padding: 4px 0;
    padding-left: 30px;
    margin: 0;
    &:hover {
      background-color: #0f3384;
      cursor: pointer;
    }
    .el-col {
      text-align: left;
      span {
        padding-left: 0.5em;
      }
      i {
        font-size: 1.5em;
      }
    }
    &:nth-child(1) i {
      color: #ecc31e;
    }
    &:nth-child(2) i {
      color: #bbc1cd;
    }
    &:nth-child(3) i {
      color: rgb(184, 115, 51);
    }
  }
}
</style>