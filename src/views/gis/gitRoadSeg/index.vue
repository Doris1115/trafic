<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">路段名称</label>
        <el-input v-model="query.ldmc" clearable placeholder="路段名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">地点编号</label>
        <el-input v-model="query.dlbh" clearable placeholder="地点编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="序号">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路段名称">
            <el-input v-model="form.ldmc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="某时间">
            <el-date-picker v-model="form.gxsj" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路段方向">
            <el-input v-model="form.ldfx" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="地点编号">
            <el-input v-model="form.dlbh" style="width: 370px;" />
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
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="ldmc" label="路段名称" />
        <el-table-column prop="gxsj" label="某时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.gxsj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ldfx" label="路段方向" />
        <el-table-column prop="dlbh" label="地点编号" />
        <el-table-column v-permission="['admin','gisRoadSeg:edit','gisRoadSeg:del']" label="操作" width="150px" align="center">
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
import crudGisRoadSeg from '@/api/gis/gisRoadSeg'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { id: null, ldmc: null, gxsj: null, ldfx: null, dlbh: null }
export default {
  name: 'GisRoadSeg',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/gis/road_seg', url: 'api/gisRoadSeg', sort: 'id,desc', crudMethod: { ...crudGisRoadSeg }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'gisRoadSeg:add'],
        edit: ['admin', 'gisRoadSeg:edit'],
        del: ['admin', 'gisRoadSeg:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'ldmc', display_name: '路段名称' },
        { key: 'dlbh', display_name: '地点编号' }
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
