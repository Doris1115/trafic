<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">用户编号</label>
        <el-input v-model="query.usercode" clearable placeholder="用户编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">巡逻里程</label>
        <el-input v-model="query.patrolMileage" clearable placeholder="巡逻里程" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">执勤时长</label>
        <el-input v-model="query.dutyHours" clearable placeholder="执勤时长" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">空岗</label>
        <el-input v-model="query.jobVacancy" clearable placeholder="空岗" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">脱岗</label>
        <el-input v-model="query.offDuty" clearable placeholder="脱岗" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">工作时长</label>
        <el-input v-model="query.workingTime" clearable placeholder="工作时长" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">年</label>
        <el-input v-model="query.cmpteYear" clearable placeholder="年" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">月</label>
        <el-input v-model="query.cmpteMonth" clearable placeholder="月" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="用户编号" prop="usercode">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="巡逻里程">
            <el-input v-model="form.patrolMileage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="执勤时长">
            <el-input v-model="form.dutyHours" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="空岗">
            <el-input v-model="form.jobVacancy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="脱岗">
            <el-input v-model="form.offDuty" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="工作时长">
            <el-input v-model="form.workingTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="年" prop="cmpteYear">
            <el-input v-model="form.cmpteYear" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="月" prop="cmpteMonth">
            <el-input v-model="form.cmpteMonth" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="usercode" label="用户编号" />
        <el-table-column prop="patrolMileage" label="巡逻里程" />
        <el-table-column prop="dutyHours" label="执勤时长" />
        <el-table-column prop="jobVacancy" label="空岗" />
        <el-table-column prop="offDuty" label="脱岗" />
        <el-table-column prop="workingTime" label="工作时长" />
        <el-table-column prop="cmpteYear" label="年" />
        <el-table-column prop="cmpteMonth" label="月" />
        <el-table-column v-permission="['admin','police:edit','police:del']" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudPolice from '@/api/police'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { usercode: null, patrolMileage: null, dutyHours: null, jobVacancy: null, offDuty: null, workingTime: null, cmpteYear: null, cmpteMonth: null }
export default {
  name: 'Police',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/police', url: 'api/police', sort: 'usercode,desc', crudMethod: { ...crudPolice }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'police:add'],
        edit: ['admin', 'police:edit'],
        del: ['admin', 'police:del']
      },
      rules: {
        usercode: [
          { required: true, message: '用户编号不能为空', trigger: 'blur' }
        ],
        cmpteYear: [
          { required: true, message: '年不能为空', trigger: 'blur' }
        ],
        cmpteMonth: [
          { required: true, message: '月不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'usercode', display_name: '用户编号' },
        { key: 'patrolMileage', display_name: '巡逻里程' },
        { key: 'dutyHours', display_name: '执勤时长' },
        { key: 'jobVacancy', display_name: '空岗' },
        { key: 'offDuty', display_name: '脱岗' },
        { key: 'workingTime', display_name: '工作时长' },
        { key: 'cmpteYear', display_name: '年' },
        { key: 'cmpteMonth', display_name: '月' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
