<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">规范标识</label>
        <el-input v-model="query.standardId" clearable placeholder="规范标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">用户编号</label>
        <el-input v-model="query.usercode" clearable placeholder="用户编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">上传视频总量</label>
        <el-input v-model="query.uploadVideoNum" clearable placeholder="上传视频总量" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">总时长</label>
        <el-input v-model="query.videoDuration" clearable placeholder="总时长" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
          <el-form-item label="规范标识">
            <el-input v-model="form.standardId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="用户编号">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="上传视频总量">
            <el-input v-model="form.uploadVideoNum" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="总时长">
            <el-input v-model="form.videoDuration" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="年">
            <el-input v-model="form.cmpteYear" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="月">
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
        <el-table-column prop="standardId" label="规范标识" />
        <el-table-column prop="usercode" label="用户编号" />
        <el-table-column prop="uploadVideoNum" label="上传视频总量" />
        <el-table-column prop="videoDuration" label="总时长" />
        <el-table-column prop="cmpteYear" label="年" />
        <el-table-column prop="cmpteMonth" label="月" />
        <el-table-column v-permission="['admin','clssfyStandard:edit','clssfyStandard:del']" label="操作" width="150px" align="center">
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
import crudClssfyStandard from '@/api/clssfyStandard'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { standardId: null, usercode: null, uploadVideoNum: null, videoDuration: null, cmpteYear: null, cmpteMonth: null }
export default {
  name: 'ClssfyStandard',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/standard', url: 'api/clssfyStandard', sort: 'standardId,desc', crudMethod: { ...crudClssfyStandard }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'clssfyStandard:add'],
        edit: ['admin', 'clssfyStandard:edit'],
        del: ['admin', 'clssfyStandard:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'standardId', display_name: '规范标识' },
        { key: 'usercode', display_name: '用户编号' },
        { key: 'uploadVideoNum', display_name: '上传视频总量' },
        { key: 'videoDuration', display_name: '总时长' },
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
