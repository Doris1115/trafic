<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">警员考勤记录标识</label>
        <el-input v-model="query.attendId" clearable placeholder="警员考勤记录标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">警员标识</label>
        <el-input v-model="query.usercode" clearable placeholder="警员标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">上班时间</label>
        <el-input v-model="query.startTime" clearable placeholder="上班时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">下班时间</label>
        <el-input v-model="query.endTime" clearable placeholder="下班时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.checkDate"
          start-placeholder="checkDateStart"
          end-placeholder="checkDateStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="警员考勤记录标识">
            <el-input v-model="form.attendId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警员标识">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="考勤日期">
            <el-input v-model="form.checkDate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="上班时间">
            <el-input v-model="form.startTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="下班时间">
            <el-input v-model="form.endTime" style="width: 370px;" />
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
        <el-table-column prop="attendId" label="警员考勤记录标识" />
        <el-table-column prop="usercode" label="警员标识" />
        <el-table-column prop="checkDate" label="考勤日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.checkDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="上班时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.startTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="下班时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.endTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','attendance:edit','attendance:del']" label="操作" width="150px" align="center">
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
import crudAttendance from '@/api/attendance'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { attendId: null, usercode: null, checkDate: null, startTime: null, endTime: null }
export default {
  name: 'Attendance',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/attendance', url: 'api/attendance', sort: 'attendId,desc', crudMethod: { ...crudAttendance }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'attendance:add'],
        edit: ['admin', 'attendance:edit'],
        del: ['admin', 'attendance:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'attendId', display_name: '警员考勤记录标识' },
        { key: 'usercode', display_name: '警员标识' },
        { key: 'startTime', display_name: '上班时间' },
        { key: 'endTime', display_name: '下班时间' }
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
