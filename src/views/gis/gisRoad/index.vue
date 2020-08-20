<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">道路类型</label>
        <el-input v-model="query.dllx" clearable placeholder="道路类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">道路编号</label>
        <el-input v-model="query.dlbh" clearable placeholder="道路编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">是否标注</label>
        <el-input v-model="query.ismark" clearable placeholder="是否标注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">道路名称</label>
        <el-input v-model="query.dlmc" clearable placeholder="道路名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">更新时间</label>
        <el-input v-model="query.gxsj" clearable placeholder="更新时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">所属辖区</label>
        <el-input v-model="query.ssxq" clearable placeholder="所属辖区" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="MIS-主键">
            <el-input v-model="form.roadid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路类型">
            <el-input v-model="form.dllx" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路编号">
            <el-input v-model="form.dlbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否标注">
            <el-input v-model="form.ismark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路名称">
            <el-input v-model="form.dlmc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-date-picker v-model="form.gxsj" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="所属辖区">
            <el-input v-model="form.ssxq" style="width: 370px;" />
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
        <el-table-column prop="roadid" label="MIS-主键" />
        <el-table-column prop="dllx" label="道路类型" />
        <el-table-column prop="dlbh" label="道路编号" />
        <el-table-column prop="ismark" label="是否标注" />
        <el-table-column prop="dlmc" label="道路名称" />
        <el-table-column prop="gxsj" label="更新时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.gxsj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ssxq" label="所属辖区" />
        <el-table-column v-permission="['admin','gisRoad:edit','gisRoad:del']" label="操作" width="150px" align="center">
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
import crudGisRoad from '@/api/gis/gisRoad'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { roadid: null, dllx: null, dlbh: null, ismark: null, dlmc: null, gxsj: null, ssxq: null }
export default {
  name: 'GisRoad',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/gis/road', url: 'api/gisRoad', sort: 'roadid,desc', crudMethod: { ...crudGisRoad }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'gisRoad:add'],
        edit: ['admin', 'gisRoad:edit'],
        del: ['admin', 'gisRoad:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'dllx', display_name: '道路类型' },
        { key: 'dlbh', display_name: '道路编号' },
        { key: 'ismark', display_name: '是否标注' },
        { key: 'dlmc', display_name: '道路名称' },
        { key: 'gxsj', display_name: '更新时间' },
        { key: 'ssxq', display_name: '所属辖区' }
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
