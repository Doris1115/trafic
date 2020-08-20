<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="queryData">搜索
        </el-button>
      </div>
      <el-dialog :close-on-click-modal="false" :before-close="dialogClose" :visible.sync="chartShow" title="趋势图">
        <!-- <line-chart :chart-data="lineChartData" /> -->
        <!-- <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div> -->
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" :data="tableData" v-loading="tableLoading" size="mini" style="width: 100%;" height="800">
        <el-table-column fixed label="图表" width="60">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="showChart(scope.row)">
              <svg-icon icon-class="chart" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="roadName" label="道路名称" width="80" fixed />
        <el-table-column prop="roadLinkName" label="路段名称" width="120" fixed />
        <el-table-column v-for="(item,index) in tableColumnProp" :key="index" :label="item.title" width="80">
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
import Treeselect, { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
// import crudTCfgDepartment from '@/api/duty/tCfgDepartment'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { congestionIndex } from '@/api/bigData/roadCondition'
// import LineChart from '../../dashboard/LineChart'


// const defaultForm = {}
// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145]
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }
export default {
  name: 'congestionIndex',
  components: { Treeselect },
  // mixins: [presenter(), header(), crud()],
  // cruds() {
    // return CRUD({ title: '', url: '', sort: 'recordId,desc', crudMethod: {}, idField: "recordId" })
  // },
  data() {
    return {
      // permission: {
      //   add: ['admin', 'assessMark:add']
      // },
      // queryTypeOptions: [
      //   { key: '', display_name: '' }
      // ],
      tableData: [],
      tableColumnProp: [],
      chartShow: false,
      tableLoading: false,

    }
  },
  mounted() {
    this.initTableColumnProp()
    // this.queryData()
    this.getEchartData()
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    // [CRUD.HOOK.beforeRefresh]() {
    //   return true
    // },

    // [CRUD.HOOK.beforeSubmit]() {
    //   return true
    // },
    queryData() {
      this.tableLoading = true
      congestionIndex().then(res => {
        console.log(res)
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
      console.log(this.tableColumnProp)
    },
    showChart(row) {
      
      this.chartShow = true
    },
    dialogClose() {
      this.chartShow = false
    },
    getEchartData() {

    }
  },

  created() {

  }
}
</script>

<style scoped>
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
</style>