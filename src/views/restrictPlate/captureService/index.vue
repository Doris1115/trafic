<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">过车信息编号</label>
        <el-input v-model="query.xh" clearable placeholder="过车信息编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">图片序号</label>
        <el-input v-model="query.zjwjsx" clearable placeholder="图片序号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">图片服务IP</label>
        <el-input v-model="query.zjwjip" clearable placeholder="图片服务IP" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.gxsj"
          start-placeholder="gxsjStart"
          end-placeholder="gxsjStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="过车信息编号">
            <el-input v-model="form.xh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="图片序号" prop="zjwjsx">
            <el-input v-model="form.zjwjsx" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="图片相对地址">
            <el-input v-model="form.zjwjlj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="未知">
            <el-input v-model="form.zjwjlx" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="图片服务IP">
            <el-input v-model="form.zjwjip" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="生成时间">
            <el-date-picker v-model="form.gxsj" type="datetime" style="width: 370px;" />
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
        <el-table-column prop="xh" label="过车信息编号" />
        <el-table-column prop="zjwjsx" label="图片序号" />
        <el-table-column prop="zjwjlj" label="图片相对地址" />
        <el-table-column prop="zjwjlx" label="未知" />
        <el-table-column prop="zjwjip" label="图片服务IP" />
        <el-table-column prop="gxsj" label="生成时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.gxsj) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','captureService:edit','captureService:del']" label="操作" width="150px" align="center">
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
import crudCaptureService from '@/api/captureService'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { xh: null, zjwjsx: null, zjwjlj: null, zjwjlx: null, zjwjip: null, gxsj: null }
export default {
  name: 'CaptureService',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/restrictPlate/capture_service', url: 'api/captureService', sort: 'xh,desc', crudMethod: { ...crudCaptureService }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'captureService:add'],
        edit: ['admin', 'captureService:edit'],
        del: ['admin', 'captureService:del']
      },
      rules: {
        zjwjsx: [
          { required: true, message: '图片序号不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'xh', display_name: '过车信息编号' },
        { key: 'zjwjsx', display_name: '图片序号' },
        { key: 'zjwjip', display_name: '图片服务IP' }
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
