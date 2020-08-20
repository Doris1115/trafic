<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">地点标识</label>
        <el-input v-model="query.siteId" clearable placeholder="地点标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">限行规则标识</label>
        <el-input v-model="query.restrictionId" clearable placeholder="限行规则标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="地点标识" prop="siteId">
            <el-input v-model="form.siteId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="限行规则标识" prop="restrictionId">
            <el-input v-model="form.restrictionId" style="width: 370px;" />
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
        <el-table-column prop="siteId" label="地点标识" />
        <el-table-column prop="restrictionId" label="限行规则标识" />
        <el-table-column v-permission="['admin','restrictionSite:edit','restrictionSite:del']" label="操作" width="150px" align="center">
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
import crudRestrictionSite from '@/api/restrictionSite'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { restrictionSiteId: null, siteId: null, restrictionId: null }
export default {
  name: 'RestrictionSite',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/research/restriction_site', url: 'api/restrictionSite', sort: 'restrictionSiteId,desc', crudMethod: { ...crudRestrictionSite }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'restrictionSite:add'],
        edit: ['admin', 'restrictionSite:edit'],
        del: ['admin', 'restrictionSite:del']
      },
      rules: {
        siteId: [
          { required: true, message: '地点标识不能为空', trigger: 'blur' }
        ],
        restrictionId: [
          { required: true, message: '限行规则标识不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'siteId', display_name: '地点标识' },
        { key: 'restrictionId', display_name: '限行规则标识' }
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
