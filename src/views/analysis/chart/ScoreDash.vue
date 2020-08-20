<template>
  <div class="visual_conBot">
    <div class="visual_bg conBot1" />
    <div class="visual_bg conBot2" />
    <div class="visual_bg conBot3" />
    <div class="visual_bg conBot4" />
    <div class="visual_chart_text">
      <h1>{{chartData.title}}+大数据</h1>
      <h2>湘潭市交通大数据分析平台</h2>
    </div>
    <div class="icon-box">
      <i class="el-icon-s-data" />
      <evaluation-reg class="icon-inline"/>
    </div>
    <el-row>
      <div class="dash-board">
        <div
          id="lastMonthRank"
          class="dash"
          :class="{dashBoard1:rank.lastMonthRank===0,dashBoard2:rank.lastMonthRank===1,dashBoard3:rank.lastMonthRank===2}"
          @click="toActive($event)"
        >
          <dash
            v-if="chartData.data"
            :key="rank.lastMonthRank"
            class="visual_chart"
            :chart-data="chartData.data[0]"
            :active="rank.lastMonthRank===1?true:false"
          />
        </div>
        <div
          id="lastMontScore"
          class="dash"
          :class="{dashBoard1:rank.lastMontScore===0,dashBoard2:rank.lastMontScore===1,dashBoard3:rank.lastMontScore===2}"
          @click="toActive($event)"
        >
          <dash
            v-if="chartData.data"
            :key="rank.lastMontScore"
            class="visual_chart"
            :chart-data="chartData.data[1]"
            :active="rank.lastMontScore===1?true:false"
          />
        </div>
        <div
          id="currentMonthScore"
          class="dash"
          :class="{dashBoard1:rank.currentMonthScore===0,dashBoard2:rank.currentMonthScore===1,dashBoard3:rank.currentMonthScore===2}"
          @click="toActive($event)"
        >
          <dash
            v-if="chartData.data"
            :key="rank.currentMonthScore"
            class="visual_chart"
            :chart-data="chartData.data[2]"
            :active="rank.currentMonthScore===1?true:false"
          />
        </div>
      </div>
      <dl>
        <dd v-for="(item,index) in chartData.detail" :key="index">
          <h1>{{ item.type }}</h1>
          <p v-for="(text,index) in item.text" :key="index">{{ text }}</p>
        </dd>
      </dl>
    </el-row>
  </div>
</template>

<script>
import Dash from '../components/Dash'
import EvaluationReg from '../components/EvaluationReg'
export default {
  components: {
    Dash,
    EvaluationReg
  },
  props: {
    chartData: {
      type: Object,
      required: true
    }  },
  data() {
    return {
      rank: {
        lastMonthRank: 0,
        lastMontScore: 1,
        currentMonthScore: 2
      },
      active: 'lastMontScore',
    }
  },
  methods: {
    toActive(e) {
      var current = e.currentTarget.id
      var currentVal = this.rank[current]
      var toggleDiv = Object.keys(this.rank).filter(item => this.rank[item] == 1).join("")
      this.rank[current] = 1
      this.rank[toggleDiv] = currentVal
    }
  },
};
</script>

<style lang="scss" scoped>
.visual_conBot {
  // height: calc(100% - 136px);
  height: 100%;
  background: url(/source/images/ksh41.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .visual_bg {
    position: absolute;
    width: 25px;
    height: 25px;
    background-size: 25px 25px;
    &.conBot1 {
      left: 0;
      top: 260px;
      background-image: url(/static/images/ksh42.png);
    }
    &.conBot2 {
      right: 0;
      top: 260px;
      background-image: url(/static/images/ksh43.png);
    }
    &.conBot3 {
      left: 0;
      bottom: 5px;
      background-image: url(/static/images/ksh45.png);
    }
    &.conBot4 {
      right: 0;
      bottom: 5px;
      background-image: url(/static/images/ksh44.png);
    }
  }
  .visual_chart_text {
    color: #fff;
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 99;
    h1 {
      font-size: 26px;
      margin-bottom: 6px;
    }
    h2 {
      font-size: 20px;
    }
  }
  .visual_conBot_bot {
    width: calc(100% - 8px);
    height: 180px;
    background: rgba(16, 54, 87, 0.5);
    border: 1px solid #345f92;
    position: absolute;
    bottom: 10px;
    left: 4px;
    z-index: 99;
  }
}
.el-row {
  position: absolute;
  top: 35px;
  bottom: 0;
  left: 0;
  right: 0;
  .dash-board {
    position: relative;
    margin: 10px 40px;
    overflow: hidden;
    height: 228px;
    margin-top: 28px;
    .dash {
      position: absolute;
      height: 200px;
      width: 200px;
      left: 50%;
      &.dashBoard1 {
        margin-left: -300px;
        margin-top: 58px;
      }
      &.dashBoard2 {
        width: 290px;
        height: 280px;
        margin-left: -140px;
        z-index: 99;
      }
      &.dashBoard3 {
        margin-left: 110px;
        margin-top: 58px;
      }
    }
  }
}
dl {
  color: #fff;
  position: absolute;
  bottom: 10px;
  top: 250px;
  overflow: auto;
  width: 100%;
  dd {
    padding-bottom: 10px;
  }
  h1 {
    font-size: 16px;
    font-weight: bold;
    color: #0091d0;
  }
  p {
    font-size: 14px;
    margin: 0;
    line-height: 18px;
  }
}
.icon-box {
  position: absolute;
  top: 280px;
  right: 20px;
  z-index: 999;
  .icon-inline{display: inline;}
  i {
    color: #0091d0;
    font-size: 20px;
    margin-left: 10px;
    &:hover {
      color: #fff;
    }
  }
}
</style>
