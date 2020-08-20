<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="queryData">搜索
        </el-button>
      </div>
      <!-- <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="500px">
        
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog> -->
      <!--表格渲染-->
      <el-table ref="table" v-loading="tableLoading" :data="tableData" size="small" style="width: 100%;" height="800">
        <el-table-column fixed type="selection" width="55" />
        <!-- <el-table-column prop="roadName" label="道路名称" width="80" /> -->
        <el-table-column fixed prop="roadLinkName" label="路段名称" width="120" />
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
import Treeselect, { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { highFrequencyRoadLink } from '@/api/bigData/roadCondition'

export default {
  name: 'highFrequencyRoadLink',
  components: { Treeselect },
  data() {
    return {
      permission: {
        add: ['admin', 'assessMark:add']
      },
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
  methods: {
    queryData() {
      this.tableLoading = true
      highFrequencyRoadLink().then(res => {
        console.log(res)
        this.tableData = res
        this.$nextTick(item => {
          this.tableLoading = false
        })
      })
    },
    initTableColumnProp() {
      for (let i = 1; i < 25; i++) {
        const temp = { title: i + '时', columnProp: 'am' + i, time: 'am' + i + '.time'}
        this.tableColumnProp.push(temp)
      }
      console.log(this.tableColumnProp)
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