<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">月</label>
        <el-input v-model="query.cmpteMonth" clearable placeholder="月" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">用户编号</label>
        <el-input v-model="query.usercode" clearable placeholder="用户编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">执法总量</label>
        <el-input v-model="query.enforcementTotal" clearable placeholder="执法总量" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">强制措施类</label>
        <el-input v-model="query.compulsoryTimes" clearable placeholder="强制措施类" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">简易执法类</label>
        <el-input v-model="query.simpleTimes" clearable placeholder="简易执法类" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">非现场执法类</label>
        <el-input v-model="query.offSiteTimes" clearable placeholder="非现场执法类" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">年</label>
        <el-input v-model="query.cmpteYear" clearable placeholder="年" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">执法类标识</label>
        <el-input v-model="query.enforceId" clearable placeholder="执法类标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="月" prop="cmpteMonth">
            <el-input v-model="form.cmpteMonth" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="用户编号">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="执法总量">
            <el-input v-model="form.enforcementTotal" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="强制措施类">
            <el-input v-model="form.compulsoryTimes" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="简易执法类">
            <el-input v-model="form.simpleTimes" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="非现场执法类">
            <el-input v-model="form.offSiteTimes" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="年" prop="cmpteYear">
            <el-input v-model="form.cmpteYear" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="执法类标识">
            <el-input v-model="form.enforceId" style="width: 370px;" />
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
        <el-table-column prop="cmpteMonth" label="月" />
        <el-table-column prop="usercode" label="用户编号" />
        <el-table-column prop="enforcementTotal" label="执法总量" />
        <el-table-column prop="compulsoryTimes" label="强制措施类" />
        <el-table-column prop="simpleTimes" label="简易执法类" />
        <el-table-column prop="offSiteTimes" label="非现场执法类" />
        <el-table-column prop="cmpteYear" label="年" />
        <el-table-column prop="enforceId" label="执法类标识" />
        <el-table-column v-permission="['admin','clssfyEnforcement:edit','clssfyEnforcement:del']" label="操作" width="150px" align="center">
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
import crudClssfyEnforcement from '@/api/clssfyEnforcement'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { cmpteMonth: null, usercode: null, enforcementTotal: null, compulsoryTimes: null, simpleTimes: null, offSiteTimes: null, cmpteYear: null, enforceId: null }
export default {
  name: 'ClssfyEnforcement',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/enforcement', url: 'api/clssfyEnforcement', sort: 'enforceId,desc', crudMethod: { ...crudClssfyEnforcement }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'clssfyEnforcement:add'],
        edit: ['admin', 'clssfyEnforcement:edit'],
        del: ['admin', 'clssfyEnforcement:del']
      },
      rules: {
        cmpteMonth: [
          { required: true, message: '月不能为空', trigger: 'blur' }
        ],
        cmpteYear: [
          { required: true, message: '年不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'cmpteMonth', display_name: '月' },
        { key: 'usercode', display_name: '用户编号' },
        { key: 'enforcementTotal', display_name: '执法总量' },
        { key: 'compulsoryTimes', display_name: '强制措施类' },
        { key: 'simpleTimes', display_name: '简易执法类' },
        { key: 'offSiteTimes', display_name: '非现场执法类' },
        { key: 'cmpteYear', display_name: '年' },
        { key: 'enforceId', display_name: '执法类标识' }
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
