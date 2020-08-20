<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">子字典标识</label>
        <el-input v-model="query.dictDetailId" clearable placeholder="子字典标识" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">字典分组标识</label>
        <el-input v-model="query.dictGroupId" clearable placeholder="字典分组标识" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="子字典标识" prop="dictDetailId">
            <el-input v-model="form.dictDetailId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="字典分组标识" prop="dictGroupId">
            <el-input v-model="form.dictGroupId" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;"
        @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="dictGroupDetailId" label="字典详情分组关系标识" />
        <el-table-column prop="createTime" label="创建日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dictDetailId" label="子字典标识" />
        <el-table-column prop="dictGroupId" label="字典分组标识" />
        <el-table-column prop="createBy" label="创建者" />
        <el-table-column prop="updateTime" label="更新时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateBy" label="更新者" />
        <el-table-column v-permission="['admin','dictRelGroupDetail:edit','dictRelGroupDetail:del']" label="操作"
          width="150px" align="center">
          <template slot-scope="scope">
            <udOperation :data="scope.row" :permission="permission" />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudDictRelGroupDetail from '@/api/dictRelGroupDetail'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { dictGroupDetailId: null, createTime: null, dictDetailId: null, dictGroupId: null, createBy: null, updateTime: null, updateBy: null }
export default {
  name: 'DictRelGroupDetail',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/dictRelGroupDetail', url: 'api/dictRelGroupDetail', sort: 'dictGroupDetailId,desc', crudMethod: { ...crudDictRelGroupDetail } })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'dictRelGroupDetail:add'],
        edit: ['admin', 'dictRelGroupDetail:edit'],
        del: ['admin', 'dictRelGroupDetail:del']
      },
      rules: {
        dictDetailId: [
          { required: true, message: '子字典标识不能为空', trigger: 'blur' }
        ],
        dictGroupId: [
          { required: true, message: '字典分组标识不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'dictDetailId', display_name: '子字典标识' },
        { key: 'dictGroupId', display_name: '字典分组标识' }
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
