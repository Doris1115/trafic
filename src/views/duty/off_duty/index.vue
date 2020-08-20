<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">空脱岗记录标识</label>
        <el-input v-model="query.offdutyId" clearable placeholder="空脱岗记录标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">警员标识</label>
        <el-input v-model="query.usercode" clearable placeholder="警员标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">记录日期</label>
        <el-input v-model="query.recordDate" clearable placeholder="记录日期" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">是否空岗 0:否 1:是</label>
        <el-input v-model="query.isVacancy" clearable placeholder="是否空岗 0:否 1:是" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">是否脱岗0:否 1:是</label>
        <el-input v-model="query.isOff" clearable placeholder="是否脱岗0:否 1:是" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="空脱岗记录标识">
            <el-input v-model="form.offdutyId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警员标识">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="记录日期">
            <el-input v-model="form.recordDate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否空岗 0:否 1:是">
            <el-input v-model="form.isVacancy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否脱岗0:否 1:是">
            <el-input v-model="form.isOff" style="width: 370px;" />
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
        <el-table-column prop="offdutyId" label="空脱岗记录标识" />
        <el-table-column prop="usercode" label="警员标识" />
        <el-table-column prop="recordDate" label="记录日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.recordDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isVacancy" label="是否空岗 0:否 1:是" />
        <el-table-column prop="isOff" label="是否脱岗0:否 1:是" />
        <el-table-column v-permission="['admin','offDuty:edit','offDuty:del']" label="操作" width="150px" align="center">
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
import crudOffDuty from '@/api/offDuty'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { offdutyId: null, usercode: null, recordDate: null, isVacancy: null, isOff: null }
export default {
  name: 'OffDuty',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/off_duty', url: 'api/offDuty', sort: 'offdutyId,desc', crudMethod: { ...crudOffDuty }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'offDuty:add'],
        edit: ['admin', 'offDuty:edit'],
        del: ['admin', 'offDuty:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'offdutyId', display_name: '空脱岗记录标识' },
        { key: 'usercode', display_name: '警员标识' },
        { key: 'recordDate', display_name: '记录日期' },
        { key: 'isVacancy', display_name: '是否空岗 0:否 1:是' },
        { key: 'isOff', display_name: '是否脱岗0:否 1:是' }
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
