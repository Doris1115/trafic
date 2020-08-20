<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">现场照片标识</label>
        <el-input v-model="query.casephotoId" clearable placeholder="现场照片标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">勤务标识</label>
        <el-input v-model="query.dutyId" clearable placeholder="勤务标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">编号</label>
        <el-input v-model="query.tid" clearable placeholder="编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">序号</label>
        <el-input v-model="query.porder" clearable placeholder="序号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="现场照片标识">
            <el-input v-model="form.casephotoId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="勤务标识">
            <el-input v-model="form.dutyId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model="form.tid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="照片信息">
            <el-input v-model="form.photoInfo" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.photoDesc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="序号">
            <el-input v-model="form.porder" style="width: 370px;" />
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
        <el-table-column prop="casephotoId" label="现场照片标识" />
        <el-table-column prop="dutyId" label="勤务标识" />
        <el-table-column prop="tid" label="编号" />
        <el-table-column prop="photoInfo" label="照片信息" />
        <el-table-column prop="photoDesc" label="描述" />
        <el-table-column prop="porder" label="序号" />
        <el-table-column v-permission="['admin','dutyPhoto:edit','dutyPhoto:del']" label="操作" width="150px" align="center">
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
import crudDutyPhoto from '@/api/dutyPhoto'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { casephotoId: null, dutyId: null, tid: null, photoInfo: null, photoDesc: null, porder: null }
export default {
  name: 'DutyPhoto',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/dutyPhoto', url: 'api/dutyPhoto', sort: 'casephotoId,desc', crudMethod: { ...crudDutyPhoto }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'dutyPhoto:add'],
        edit: ['admin', 'dutyPhoto:edit'],
        del: ['admin', 'dutyPhoto:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'casephotoId', display_name: '现场照片标识' },
        { key: 'dutyId', display_name: '勤务标识' },
        { key: 'tid', display_name: '编号' },
        { key: 'porder', display_name: '序号' }
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
