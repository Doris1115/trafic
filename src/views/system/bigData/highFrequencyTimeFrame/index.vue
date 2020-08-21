<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <el-date-picker v-model="time" type="month" placeholder="选择月" />
        <el-button
          class="filter-item"
          size="mini"
          type="success"
          icon="el-icon-search"
          @click="queryData"
        >搜索</el-button>
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <!-- <crudOperation :permission="permission"> -->

      <!-- </crudOperation> -->
      <!--表单组件-->
      <!-- <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="500px">
        
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>-->
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
        <el-table-column fixed prop="day" label="日" width="80" />
        <el-table-column v-for="(item,index) in tableColumnProp" :key="index" :label="item.title">
          <el-table-column :prop="item.num" label="总次数" width="60" />
          <el-table-column :prop="item.timeSum" label="总时长" width="60" />
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
import { highFrequencyTimeFrame } from '@/api/bigData/roadCondition'


// const defaultForm = { recordId: null, policeId: null, dutyTimeMark: null, patorlLengthMark: null, processTimeMark: null, volunteerMark: null, totalProcessMark: null, evaluationMark: null, markDate: null, totalMark: null, organId: null }
export default {
  name: 'highFrequencyTimeFrame',
  components: { Treeselect },
  // mixins: [presenter(), header(), form(defaultForm), crud()],
  // cruds() {
  //   return CRUD({ title: '评分结果', url: 'api/duty/assessMark', sort: 'recordId,desc', crudMethod: { ...crudAssessMark }, idField: "recordId" })
  // },
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
    highFrequencyTimeFrame().then(res => {
      this.tableData = res
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
      console.log("month", this.time.getMonth());
      var param = {
        month: this.time.getMonth() + 1,
        year: this.time.getFullYear()
      }
      highFrequencyTimeFrame(param).then(res => {
        this.tableData = res
        this.$nextTick(item => {
          this.tableLoading = false
        })
      })
    },
    initTableColumnProp() {
      for (let i = 1; i < 25; i++) {
        const temp = { title: i + '时', num: 'am' + i + '.num', timeSum: 'am' + i + '.timeSum' }
        this.tableColumnProp.push(temp)
      }
      console.log('tableColumnProp', this.tableColumnProp)
    }
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