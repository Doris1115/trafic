<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">执勤明细标识</label>
        <el-input v-model="query.dutydetailId" clearable placeholder="执勤明细标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">警员编号</label>
        <el-input v-model="query.usercode" clearable placeholder="警员编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">执勤日期</label>
        <el-input v-model="query.dutyDate" clearable placeholder="执勤日期" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">开始时间</label>
        <el-input v-model="query.startTime" clearable placeholder="开始时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">结束时间</label>
        <el-input v-model="query.endTime" clearable placeholder="结束时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="执勤明细标识">
            <el-input v-model="form.dutydetailId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警员编号">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="执勤日期">
            <el-input v-model="form.dutyDate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-input v-model="form.startTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="结束时间">
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
        <el-table-column prop="dutydetailId" label="执勤明细标识" />
        <el-table-column prop="usercode" label="警员编号" />
        <el-table-column prop="dutyDate" label="执勤日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.dutyDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.startTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.endTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','dutyDetail:edit','dutyDetail:del']" label="操作" width="150px" align="center">
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
import crudDutyDetail from '@/api/dutyDetail'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { dutydetailId: null, usercode: null, dutyDate: null, startTime: null, endTime: null }
export default {
  name: 'DutyDetail',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/duty_detail', url: 'api/dutyDetail', sort: 'dutydetailId,desc', crudMethod: { ...crudDutyDetail }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'dutyDetail:add'],
        edit: ['admin', 'dutyDetail:edit'],
        del: ['admin', 'dutyDetail:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'dutydetailId', display_name: '执勤明细标识' },
        { key: 'usercode', display_name: '警员编号' },
        { key: 'dutyDate', display_name: '执勤日期' },
        { key: 'startTime', display_name: '开始时间' },
        { key: 'endTime', display_name: '结束时间' }
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
