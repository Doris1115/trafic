<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
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
        title="趋势图"
      >
        <el-row class="line-box">
          <line-chart :chart-data="trendData" />
        </el-row>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>-->
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
        <el-table-column prop="roadName" label="道路名称" width="80" fixed />
        <el-table-column prop="roadLinkName" label="路段名称" width="120" fixed />
        <el-table-column
          v-for="(item,index) in tableColumnProp"
          :key="index"
          :label="item.title"
          width="80"
        >
          <el-table-column :prop="item.indexAvg" label="今日" width="80" />
          <el-table-column :prop="item.lastMonthThisDayIndexAvg" label="上月同期" width="80" />
          <el-table-column :prop="item.lastYearThisDayIndexAvg" label="去年同期" width="80" />
          <el-table-column :prop="item.yesterdayIndexAvg" label="昨日" width="80" />
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <!-- <pagination /> -->
    </div>
  </div>
</template>

<script>
// import CRUD, { presenter, header, form, crud } from '@crud/crud'
// import rrOperation from '@crud/RR.operation'
// import crudOperation from '@crud/CRUD.operation'
// import udOperation from '@crud/UD.operation'
// import pagination from '@crud/Pagination'
import Treeselect, { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
// import crudTCfgDepartment from '@/api/duty/tCfgDepartment'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { congestionIndex } from '@/api/bigData/roadCondition'
// import LineChart from '@/views/bigData/chart/lineChart'
export default {
  name: 'CongestionIndex',
  components: { Treeselect, LineChart },
  data() {
    return {
      tableData: [],
      tableColumnProp: [],
      chartShow: false,
      tableLoading: false,
      trendData: {}
    }
  },
  mounted() {
    this.initTableColumnProp()
    // this.queryData()
    this.getEchartData()
  },

  created() {
    this.queryData()
  },
  methods: {
    queryData() {
      this.tableLoading = true
      congestionIndex().then(res => {
        console.log('21dd', res)
        this.tableData = res
        this.$nextTick(iten => {
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
    getEchartData() {

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
</style>
<style lang="scss" >
.el-table--scrollable-y .el-table__body-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
