<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">顺序号</label>
        <el-input v-model="query.orderid" clearable placeholder="顺序号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">道路编号</label>
        <el-input v-model="query.roadid" clearable placeholder="道路编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="编号">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="顺序号">
            <el-input v-model="form.orderid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="Z坐标">
            <el-input v-model="form.zpos" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="Y坐标">
            <el-input v-model="form.ypos" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="X坐标">
            <el-input v-model="form.xpos" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路编号">
            <el-input v-model="form.roadid" style="width: 370px;" />
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
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="orderid" label="顺序号" />
        <el-table-column prop="zpos" label="Z坐标" />
        <el-table-column prop="ypos" label="Y坐标" />
        <el-table-column prop="xpos" label="X坐标" />
        <el-table-column prop="roadid" label="道路编号" />
        <el-table-column v-permission="['admin','gisRoadPoints:edit','gisRoadPoints:del']" label="操作" width="150px" align="center">
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
import crudGisRoadPoints from '@/api/gis/gisRoadPoints'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { id: null, orderid: null, zpos: null, ypos: null, xpos: null, roadid: null }
export default {
  name: 'GisRoadPoints',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/gis/road_points', url: 'api/gisRoadPoints', sort: 'id,desc', crudMethod: { ...crudGisRoadPoints }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'gisRoadPoints:add'],
        edit: ['admin', 'gisRoadPoints:edit'],
        del: ['admin', 'gisRoadPoints:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'orderid', display_name: '顺序号' },
        { key: 'roadid', display_name: '道路编号' }
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
