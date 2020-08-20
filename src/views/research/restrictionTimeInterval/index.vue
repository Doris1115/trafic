<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="时段结束时间" prop="timeEnd">
            <el-date-picker v-model="form.timeEnd" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="时间类型" prop="timeType">
            <el-select v-model="form.timeType" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.time_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时段开始时间" prop="timeStart">
            <el-date-picker v-model="form.timeStart" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="限行规则标识" prop="restrictionId">
            <el-input v-model="form.restrictionId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="时段类型" prop="timeIntervalType">
            <el-select v-model="form.timeIntervalType" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.restriction_time_interval_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        <el-table-column prop="timeEnd" label="时段结束时间" />
        <el-table-column prop="timeType" label="时间类型">
          <template slot-scope="scope">
            {{ dict.label.time_type[scope.row.timeType] }}
          </template>
        </el-table-column>
        <el-table-column prop="timeStart" label="时段开始时间" />
        <el-table-column prop="restrictionId" label="限行规则标识" />
        <el-table-column prop="timeIntervalType" label="时段类型">
          <template slot-scope="scope">
            {{ dict.label.restriction_time_interval_type[scope.row.timeIntervalType] }}
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','restrictionTimeInterval:edit','restrictionTimeInterval:del']" label="操作" width="150px" align="center">
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
import crudRestrictionTimeInterval from '@/api/restrictionTimeInterval'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
// import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { timeIntervalId: null, timeEnd: null, timeType: null, timeStart: null, restrictionId: null, timeIntervalType: null }
export default {
  name: 'RestrictionTimeInterval',
  components: { pagination, crudOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['time_type', 'restriction_time_interval_type'],
  cruds() {
    return CRUD({ title: 'v1/api/research/restriction_time_interval', url: 'api/restrictionTimeInterval', sort: 'timeIntervalId,desc', crudMethod: { ...crudRestrictionTimeInterval }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'restrictionTimeInterval:add'],
        edit: ['admin', 'restrictionTimeInterval:edit'],
        del: ['admin', 'restrictionTimeInterval:del']
      },
      rules: {
        timeEnd: [
          { required: true, message: '时段结束时间不能为空', trigger: 'blur' }
        ],
        timeType: [
          { required: true, message: '时间类型不能为空', trigger: 'blur' }
        ],
        timeStart: [
          { required: true, message: '时段开始时间不能为空', trigger: 'blur' }
        ],
        restrictionId: [
          { required: true, message: '限行规则标识不能为空', trigger: 'blur' }
        ],
        timeIntervalType: [
          { required: true, message: '时段类型不能为空', trigger: 'blur' }
        ]
      }
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
