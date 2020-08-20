<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">用户编号</label>
        <el-input v-model="query.usercode" clearable placeholder="用户编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">接警量</label>
        <el-input v-model="query.alermVolume" clearable placeholder="接警量" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">出警量</label>
        <el-input v-model="query.policeVolume" clearable placeholder="出警量" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">平均出警时长</label>
        <el-input v-model="query.avgPoliceTime" clearable placeholder="平均出警时长" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">处警量</label>
        <el-input v-model="query.policeCapacity" clearable placeholder="处警量" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">平均处警时长</label>
        <el-input v-model="query.avgDealTime" clearable placeholder="平均处警时长" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">及时处理率</label>
        <el-input v-model="query.timelyRate" clearable placeholder="及时处理率" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
          <el-form-item label="用户编号">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="接警量">
            <el-input v-model="form.alermVolume" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="出警量">
            <el-input v-model="form.policeVolume" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="平均出警时长">
            <el-input v-model="form.avgPoliceTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处警量">
            <el-input v-model="form.policeCapacity" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="平均处警时长">
            <el-input v-model="form.avgDealTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="及时处理率">
            <el-input v-model="form.timelyRate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="年" prop="cmpteYear">
            <el-input v-model="form.cmpteYear" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="月" prop="cmpteMonth">
            <el-input v-model="form.cmpteMonth" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="接触警类标识">
            <el-input v-model="form.touchId" style="width: 370px;" />
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
        <el-table-column prop="alermVolume" label="接警量" />
        <el-table-column prop="policeVolume" label="出警量" />
        <el-table-column prop="avgPoliceTime" label="平均出警时长" />
        <el-table-column prop="policeCapacity" label="处警量" />
        <el-table-column prop="avgDealTime" label="平均处警时长" />
        <el-table-column prop="timelyRate" label="及时处理率" />
        <el-table-column prop="cmpteYear" label="年" />
        <el-table-column prop="cmpteMonth" label="月" />
        <el-table-column prop="touchId" label="接触警类标识" />
        <el-table-column v-permission="['admin','clssfyTouch:edit','clssfyTouch:del']" label="操作" width="150px" align="center">
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
import crudClssfyTouch from '@/api/clssfyTouch'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { usercode: null, alermVolume: null, policeVolume: null, avgPoliceTime: null, policeCapacity: null, avgDealTime: null, timelyRate: null, cmpteYear: null, cmpteMonth: null, touchId: null }
export default {
  name: 'ClssfyTouch',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/touch', url: 'api/clssfyTouch', sort: 'touchId,desc', crudMethod: { ...crudClssfyTouch }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'clssfyTouch:add'],
        edit: ['admin', 'clssfyTouch:edit'],
        del: ['admin', 'clssfyTouch:del']
      },
      rules: {
        cmpteYear: [
          { required: true, message: '年不能为空', trigger: 'blur' }
        ],
        cmpteMonth: [
          { required: true, message: '月不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'usercode', display_name: '用户编号' },
        { key: 'alermVolume', display_name: '接警量' },
        { key: 'policeVolume', display_name: '出警量' },
        { key: 'avgPoliceTime', display_name: '平均出警时长' },
        { key: 'policeCapacity', display_name: '处警量' },
        { key: 'avgDealTime', display_name: '平均处警时长' },
        { key: 'timelyRate', display_name: '及时处理率' },
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
