<template>
  <div class="app-container">
    <!--工具栏高发路段-->
    <div class="head-container">
      <div>
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="选择日期"
          size="small"
          clearable
          class="filter-item"
          format="yyyy 年 MM 月 dd 日"
          @change="queryData"
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
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="tableLoading"
        :data="tableData"
        size="small"
        style="width: 100%;"
        height="800"
      >
        <el-table-column fixed type="selection" width="55" />
        <!-- <el-table-column prop="roadName" label="道路名称" width="80" /> -->
        <el-table-column fixed prop="RoadName" label="路段名称" width="120" />
        <el-table-column v-for="(item,index) in tableColumnProp" :key="index" :label="item.title">
          <el-table-column :prop="item.time" label="总次数" width="60" />
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <!-- <pagination /> -->
    </div>
  </div>
</template>

<script>
import { highFrequencyRoadLink } from '@/api/bigData/roadCondition'
export default {
  name: 'Dept',

  data() {
    return {
      permission: {
        add: ['admin']
      },
      time: '',
      queryTypeOptions: [
        { key: '', display_name: '' }
      ],
      tableLoading: false,
      tableData: [],
      tableColumnProp: []
    }
  },
  mounted() {
    this.initTableColumnProp()
  },

  created() {
    // this.queryData()
    var param = {
      day: 21,
      month: 8,
      year: 2020
    }
    highFrequencyRoadLink(param).then(res => {
      this.tableData = res.tableData
      this.$nextTick(item => {
        this.tableLoading = false
      })
    })
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
      this.tableLoading = true
      var param = {
        day: this.time.getDate(),
        month: this.time.getMonth() + 1,
        year: this.time.getFullYear()
      }
      highFrequencyRoadLink(param).then(res => {
        this.tableData = res.tableData
        this.$nextTick(item => {
          this.tableLoading = false
        })
      })
    },
    initTableColumnProp() {
      for (let i = 1; i < 25; i++) {
        const temp = { title: i + '时', num: 'am' + i + '.Num', timeSum: 'am' + i + '.TimeLength' }
        this.tableColumnProp.push(temp)
      }
    }
  }
}
</script>

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

