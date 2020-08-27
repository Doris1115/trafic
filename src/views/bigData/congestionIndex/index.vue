<template>
  <div class="app-container">
    <!--工具栏拥堵指数-->
    <div class="head-container">
      <div>
        <label class="el-form-item-label">日期:</label>
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="选择日期"
          size="small"
          clearable
          class="filter-item"
          format="yyyy 年 MM 月 dd 日"
        />
        <label class="el-form-item-label">道路名称:</label>
        <el-input
          v-model="roadName"
          clearable
          placeholder="道路名称"
          class="filter-item"
          style="width:200px"
          @keyup.enter.native="queryData"
        />
        <!-- 搜索 -->
        <el-button
          class="filter-item"
          size="mini"
          type="success"
          icon="el-icon-search"
          @click="queryData"
        >搜索</el-button>
      </div>
      <el-dialog
        :close-on-click-modal="false"
        :before-close="dialogClose"
        :visible.sync="chartShow"
        custom-class="chartModel"
        :title="trendTitle"
      >
        <el-row class="line-box">
          <line-chart :chart-data="trendData" />
        </el-row>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="tableLoading"
        :data="tableData"
        size="mini"
        style="width: 100%;"
        height="800"
      >
        <el-table-column fixed label="图表" width="60">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="showChart(scope.row)">
              <svg-icon icon-class="chart" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="roadName" label="道路名称" width="100" fixed />
        <!-- <el-table-column prop="roadSegid" label="路段名称" width="120" fixed /> -->
        <el-table-column
          v-for="(item,index) in tableColumnProp"
          :key="index"
          :label="item.title"
          width="80"
        >
          <el-table-column
            :prop="item.indexAvg"
            label="今日"
            width="80"
            :formatter="numberFormatter"
          />
          <el-table-column
            :prop="item.lastMonthThisDayIndexAvg"
            label="上月同期"
            width="80"
            :formatter="numberFormatter"
          />
          <el-table-column
            :prop="item.lastYearThisDayIndexAvg"
            label="去年同期"
            width="80"
            :formatter="numberFormatter"
          />
          <el-table-column
            :prop="item.yesterdayIndexAvg"
            label="昨日"
            width="80"
            :formatter="numberFormatter"
          />
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <!-- <pagination /> -->
    </div>
  </div>
</template>

<script>
import { congestionIndex } from '@/api/bigData/roadCondition'
import LineChart from '@/views/bigData/chart/lineChart'
export default {
  name: 'Dept',
  components: { LineChart },
  data() {
    return {
      time: new Date(),
      tableData: [],
      tableColumnProp: [],
      chartShow: false,
      tableLoading: true,
      trendData: {},
      trendTitle: '趋势图',
      roadName: '',
      options: []

    }
  },
  mounted() {
    this.initTableColumnProp()
  },

  created() {
    this.queryData()
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    // [CRUD.HOOK.beforeRefresh]() {
    //   return true
    // },

    // [CRUD.HOOK.beforeSubmit]() {
    //   return true
    // }
    queryData() {
      var param = {
        day: this.time.getDate(),
        month: this.time.getMonth() + 1,
        year: this.time.getFullYear(),
        roadname: this.roadName
      }
      this.tableLoading = true
      congestionIndex(param).then(res => {
        this.tableData = res.content
        this.$nextTick(item => {
          this.tableLoading = false
        })
      })
    },
    initTableColumnProp() {
      for (let i = 1; i < 25; i++) {
        const temp = { title: i + '时', columnProp: 'am' + i, indexAvg: 'am' + i + '.indexAvg', lastMonthThisDayIndexAvg: 'am' + i + '.lastMonthThisDayIndexAvg', lastYearThisDayIndexAvg: 'am' + i + '.lastYearThisDayIndexAvg', yesterdayIndexAvg: 'am' + i + '.yesterdayIndexAvg' }
        this.tableColumnProp.push(temp)
      }
    },
    showChart(row) {
      var data = Object.keys(row).filter(item => !item.indexOf('am')).map(el => {
        return {
          indexAvg: row[el].indexAvg,
          lastMonthThisDayIndexAvg: row[el].lastMonthThisDayIndexAvg,
          lastYearThisDayIndexAvg: row[el].lastYearThisDayIndexAvg,
          yesterdayIndexAvg: row[el].yesterdayIndexAvg
        }
      })
      this.trendTitle = row.YearMonthDay + row.roadName + '趋势图'
      this.trendData = {
        data: [{
          name: '今日',
          data: data.map(item => item.indexAvg)
        }, {
          name: '上月同期',
          data: data.map(item => item.lastMonthThisDayIndexAvg)
        }, {
          name: '去年同期',
          data: data.map(item => item.lastYearThisDayIndexAvg)
        }, {
          name: '昨日',
          data: data.map(item => item.yesterdayIndexAvg)
        }],
        xAxisData: data.map((item, index) => {
          return index + 1 + '时'
        })
      }
      this.chartShow = true
    },
    dialogClose() {
      this.chartShow = false
    },
    numberFormatter(row, column, cellValue, index) {
      return parseFloat(cellValue).toFixed(2)
    }
  }
}
</script>
<style lang="scss" scoped>
.line-box {
  height: 400px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .vue-treeselect__control,
/deep/ .vue-treeselect__placeholder,
/deep/ .vue-treeselect__single-value {
  height: 30px;
  font-size: 13px;
  // line-height: 30px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-input-number .el-input__inner {
  text-align: left;
  font-size: 13px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .vue-treeselect__menu {
  font-size: 13px;
  font-weight: 100;
  color: #606266;
}
/deep/ .vue-treeselect--has-value .vue-treeselect__multi-value {
  margin-bottom: 5px;
  max-height: 70px;
  // overflow-x: hidden;
}
/deep/ .chartModel .el-dialog__body {
  // background: #061537;
}
/deep/ .chartModel .el-dialog__header {
  // background: #1f2d3d;
  background: #13ce66;
  .el-dialog__title {
    color: #fff;
    font-weight: bold;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
    border: 1px solid hsla(0, 0%, 100%, 0.4);
    font-size: 18px;
    border-radius: 50%;
    padding: 4px;
    transition: 0.2s;
    cursor: pointer;
    &:hover,
    &:focus {
      border-color: hsla(0, 0%, 100%, 0.6);
      -webkit-transform: translateY(-0.2rem);
      transform: translateY(-0.2rem);
    }
  }
}
/deep/ .el-table .cell {
  text-align: center;
}
/deep/ .select-box span:focus-within {
  border: none;
  outline: none;
}

// /deep/ .ui-select-multiple.ui-select-bootstrap {
//   height: auto;
//   min-height: 34px;
//   /* padding: 3px 3px 0 3px;*/
//   padding: 4px 4px 3px 4px;
// }

// /deep/ .ui-select-multiple.ui-select-bootstrap input.ui-select-search {
//   background-color: transparent !important; /* To prevent double background when disabled */
//   border: none;
//   outline: none;
//   height: 1.666666em;
//   margin-bottom: 3px;
//   position: absolute;
// }
</style>
<style lang="scss" >
.el-table--scrollable-y .el-table__body-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
