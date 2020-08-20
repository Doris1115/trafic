<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">开始监测点编号</label>
        <el-input v-model="query.stationIdS" clearable placeholder="开始监测点编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">结束监测点编号</label>
        <el-input v-model="query.stationIdE" clearable placeholder="结束监测点编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
          <el-form-item label="开始监测点编号">
            <el-input v-model="form.stationIdS" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="方向编号">
            <el-input v-model="form.directionId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="Z坐标">
            <el-input v-model="form.zpos" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="X坐标">
            <el-input v-model="form.xpos" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="结束监测点编号">
            <el-input v-model="form.stationIdE" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="路段名称">
            <el-input v-model="form.roadName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="坐标顺序号">
            <el-input v-model="form.orderId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="Y坐标">
            <el-input v-model="form.ypos" style="width: 370px;" />
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
        <el-table-column prop="stationIdS" label="开始监测点编号" />
        <el-table-column prop="directionId" label="方向编号" />
        <el-table-column prop="zpos" label="Z坐标" />
        <el-table-column prop="xpos" label="X坐标" />
        <el-table-column prop="stationIdE" label="结束监测点编号" />
        <el-table-column prop="roadName" label="路段名称" />
        <el-table-column prop="orderId" label="坐标顺序号" />
        <el-table-column prop="ypos" label="Y坐标" />
        <el-table-column v-permission="['admin','tGisRoadKml:edit','tGisRoadKml:del']" label="操作" width="150px" align="center">
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
import crudTGisRoadKml from '@/api/gis/gisRoadKml'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { id: null, stationIdS: null, directionId: null, zpos: null, xpos: null, stationIdE: null, roadName: null, orderId: null, ypos: null }
export default {
  name: 'TGisRoadKml',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/gis/road_kml', url: 'api/tGisRoadKml', sort: 'id,desc', crudMethod: { ...crudTGisRoadKml }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'tGisRoadKml:add'],
        edit: ['admin', 'tGisRoadKml:edit'],
        del: ['admin', 'tGisRoadKml:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'stationIdS', display_name: '开始监测点编号' },
        { key: 'stationIdE', display_name: '结束监测点编号' }
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
