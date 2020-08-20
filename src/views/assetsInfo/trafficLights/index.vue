<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">所属子控制区域</label>
        <el-input v-model="query.para10" clearable placeholder="所属子控制区域" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label"> 所属行政区域</label>
        <el-input v-model="query.para11" clearable placeholder=" 所属行政区域" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">IP地址</label>
        <el-input v-model="query.para05" clearable placeholder="IP地址" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">所属控制区域</label>
        <el-input v-model="query.para09" clearable placeholder="所属控制区域" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">信号机ID</label>
        <el-input v-model="query.para06" clearable placeholder="信号机ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">路口ID</label>
        <el-input v-model="query.para01" clearable placeholder="路口ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">路口名称</label>
        <el-input v-model="query.para02" clearable placeholder="路口名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="所属子控制区域" prop="para10">
            <el-input v-model="form.para10" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="交叉路名1" prop="para03">
            <el-input v-model="form.para03" style="width: 370px;" />
          </el-form-item>
          <el-form-item label=" 所属行政区域" prop="para11">
            <el-input v-model="form.para11" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注" prop="para16">
            <el-input v-model="form.para16" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="VAID" prop="para08">
            <el-input v-model="form.para08" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="IP地址" prop="para05">
            <el-input v-model="form.para05" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="所属控制区域" prop="para09">
            <el-input v-model="form.para09" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路口文字尺寸" prop="para15">
            <el-input v-model="form.para15" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="信号机ID" prop="para06">
            <el-input v-model="form.para06" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="VAIP地址" prop="para07">
            <el-input v-model="form.para07" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路口ID" prop="para01">
            <el-input v-model="form.para01" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路口的图形坐标" prop="para13">
            <el-input v-model="form.para13" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="交叉路名2" prop="para04">
            <el-input v-model="form.para04" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路口的图形坐标" prop="para12">
            <el-input v-model="form.para12" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路口的图形坐标" prop="para14">
            <el-input v-model="form.para14" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路口名称" prop="para02">
            <el-input v-model="form.para02" style="width: 370px;" />
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
        <el-table-column prop="para10" label="所属子控制区域" />
        <el-table-column prop="para03" label="交叉路名1" />
        <el-table-column prop="para11" label=" 所属行政区域" />
        <el-table-column prop="para16" label="备注" />
        <el-table-column prop="para08" label="VAID" />
        <el-table-column prop="para05" label="IP地址" />
        <el-table-column prop="para09" label="所属控制区域" />
        <el-table-column prop="para15" label="路口文字尺寸" />
        <el-table-column prop="para06" label="信号机ID" />
        <el-table-column prop="para07" label="VAIP地址" />
        <el-table-column prop="para01" label="路口ID" />
        <el-table-column prop="para13" label="路口的图形坐标" />
        <el-table-column prop="para04" label="交叉路名2" />
        <el-table-column prop="para12" label="路口的图形坐标" />
        <el-table-column prop="para14" label="路口的图形坐标" />
        <el-table-column prop="para02" label="路口名称" />
        <el-table-column v-permission="['admin','utctable08:edit','utctable08:del']" label="操作" width="150px" align="center">
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
import crudUtctable08 from '@/api/assetsInfo/trafficLights'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { para10: null, para03: null, para11: null, para16: null, para08: null, para05: null, para09: null, para15: null, para06: null, para07: null, para01: null, para13: null, para04: null, para12: null, para14: null, para02: null }
export default {
  name: 'Utctable08',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/assets/traffic_lights', url: 'api/utctable08', sort: 'para01,desc', crudMethod: { ...crudUtctable08 }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'utctable08:add'],
        edit: ['admin', 'utctable08:edit'],
        del: ['admin', 'utctable08:del']
      },
      rules: {
        para10: [
          { required: true, message: '所属子控制区域不能为空', trigger: 'blur' }
        ],
        para03: [
          { required: true, message: '交叉路名1不能为空', trigger: 'blur' }
        ],
        para11: [
          { required: true, message: ' 所属行政区域不能为空', trigger: 'blur' }
        ],
        para16: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        para08: [
          { required: true, message: 'VAID不能为空', trigger: 'blur' }
        ],
        para05: [
          { required: true, message: 'IP地址不能为空', trigger: 'blur' }
        ],
        para09: [
          { required: true, message: '所属控制区域不能为空', trigger: 'blur' }
        ],
        para15: [
          { required: true, message: '路口文字尺寸不能为空', trigger: 'blur' }
        ],
        para06: [
          { required: true, message: '信号机ID不能为空', trigger: 'blur' }
        ],
        para07: [
          { required: true, message: 'VAIP地址不能为空', trigger: 'blur' }
        ],
        para01: [
          { required: true, message: '路口ID不能为空', trigger: 'blur' }
        ],
        para13: [
          { required: true, message: '路口的图形坐标不能为空', trigger: 'blur' }
        ],
        para04: [
          { required: true, message: '交叉路名2不能为空', trigger: 'blur' }
        ],
        para12: [
          { required: true, message: '路口的图形坐标不能为空', trigger: 'blur' }
        ],
        para14: [
          { required: true, message: '路口的图形坐标不能为空', trigger: 'blur' }
        ],
        para02: [
          { required: true, message: '路口名称不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'para10', display_name: '所属子控制区域' },
        { key: 'para11', display_name: ' 所属行政区域' },
        { key: 'para05', display_name: 'IP地址' },
        { key: 'para09', display_name: '所属控制区域' },
        { key: 'para06', display_name: '信号机ID' },
        { key: 'para01', display_name: '路口ID' },
        { key: 'para02', display_name: '路口名称' }
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
