<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">用户编号</label>
        <el-input v-model="query.usercode" clearable placeholder="用户编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">主动勤务</label>
        <el-input v-model="query.activeSrviceTimes" clearable placeholder="主动勤务" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">拥堵类</label>
        <el-input v-model="query.congestionTimes" clearable placeholder="拥堵类" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">其他</label>
        <el-input v-model="query.otherTimes" clearable placeholder="其他" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
          <el-form-item label="主动勤务">
            <el-input v-model="form.activeSrviceTimes" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="拥堵类">
            <el-input v-model="form.congestionTimes" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="其他">
            <el-input v-model="form.otherTimes" style="width: 370px;" />
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
        <el-table-column prop="activeSrviceTimes" label="主动勤务" />
        <el-table-column prop="congestionTimes" label="拥堵类" />
        <el-table-column prop="otherTimes" label="其他" />
        <el-table-column prop="cmpteYear" label="年" />
        <el-table-column prop="cmpteMonth" label="月" />
        <el-table-column v-permission="['admin','guide:edit','guide:del']" label="操作" width="150px" align="center">
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
import crudGuide from '@/api/guide'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { usercode: null, activeSrviceTimes: null, congestionTimes: null, otherTimes: null, cmpteYear: null, cmpteMonth: null }
export default {
  name: 'Guide',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/guide', url: 'api/guide', sort: 'usercode,desc', crudMethod: { ...crudGuide }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'guide:add'],
        edit: ['admin', 'guide:edit'],
        del: ['admin', 'guide:del']
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
        { key: 'activeSrviceTimes', display_name: '主动勤务' },
        { key: 'congestionTimes', display_name: '拥堵类' },
        { key: 'otherTimes', display_name: '其他' },
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
