<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">手台号</label>
        <el-input v-model="query.vehId" clearable placeholder="手台号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">手台名称</label>
        <el-input v-model="query.vehName" clearable placeholder="手台名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.lng"
          start-placeholder="lngStart"
          end-placeholder="lngStart"
          class="date-item"
        />
        <date-range-picker
          v-model="query.lat"
          start-placeholder="latStart"
          end-placeholder="latStart"
          class="date-item"
        />
        <date-range-picker
          v-model="query.updateTime"
          start-placeholder="updateTimeStart"
          end-placeholder="updateTimeStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="记录编号">
            <el-input v-model="form.recordno" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="form.lng" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="维度">
            <el-input v-model="form.lat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="速度">
            <el-input v-model="form.speed" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="手台号">
            <el-input v-model="form.vehId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="手台名称">
            <el-input v-model="form.vehName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="设备状态">
            <el-input v-model="form.deviceState" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-date-picker v-model="form.updateTime" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="行进方向">
            <el-input v-model="form.direction" style="width: 370px;" />
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
        <el-table-column prop="recordno" label="记录编号" />
        <el-table-column prop="lng" label="经度" />
        <el-table-column prop="lat" label="维度" />
        <el-table-column prop="speed" label="速度" />
        <el-table-column prop="vehId" label="手台号" />
        <el-table-column prop="vehName" label="手台名称" />
        <el-table-column prop="deviceState" label="设备状态" />
        <el-table-column prop="updateTime" label="更新时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="direction" label="行进方向" />
        <el-table-column v-permission="['admin','gpsVehicle:edit','gpsVehicle:del']" label="操作" width="150px" align="center">
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
import crudGpsVehicle from '@/api/duty/gpsCurrent'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { recordno: null, lng: null, lat: null, speed: null, vehId: null, vehName: null, deviceState: null, updateTime: null, direction: null }
export default {
  name: 'GpsVehicle',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/gps_current', url: 'api/gpsVehicle', sort: 'recordno,desc', crudMethod: { ...crudGpsVehicle }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'gpsVehicle:add'],
        edit: ['admin', 'gpsVehicle:edit'],
        del: ['admin', 'gpsVehicle:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'vehId', display_name: '手台号' },
        { key: 'vehName', display_name: '手台名称' }
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
