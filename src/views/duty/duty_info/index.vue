<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">主动勤务标识</label>
        <el-input v-model="query.dutyId" clearable placeholder="主动勤务标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">警员标识</label>
        <el-input v-model="query.usercode" clearable placeholder="警员标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">勤务时间</label>
        <el-input v-model="query.serviceTime" clearable placeholder="勤务时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">勤务地点</label>
        <el-input v-model="query.serviceAddress" clearable placeholder="勤务地点" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">经度</label>
        <el-input v-model="query.lon" clearable placeholder="经度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">纬度</label>
        <el-input v-model="query.lat" clearable placeholder="纬度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">勤务内容</label>
        <el-input v-model="query.serviceContent" clearable placeholder="勤务内容" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">报警标识</label>
        <el-input v-model="query.tid" clearable placeholder="报警标识" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="主动勤务标识">
            <el-input v-model="form.dutyId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警员标识">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="勤务时间">
            <el-input v-model="form.serviceTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="勤务地点">
            <el-input v-model="form.serviceAddress" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="form.lon" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="form.lat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="勤务内容">
            <el-input v-model="form.serviceContent" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="勤务类型">
            <el-input v-model="form.serviceType" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="报警标识">
            <el-input v-model="form.tid" style="width: 370px;" />
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
        <el-table-column prop="dutyId" label="主动勤务标识" />
        <el-table-column prop="usercode" label="警员标识" />
        <el-table-column prop="serviceTime" label="勤务时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.serviceTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceAddress" label="勤务地点" />
        <el-table-column prop="lon" label="经度" />
        <el-table-column prop="lat" label="纬度" />
        <el-table-column prop="serviceContent" label="勤务内容" />
        <el-table-column prop="serviceType" label="勤务类型" />
        <el-table-column prop="tid" label="报警标识" />
        <el-table-column v-permission="['admin','duty:edit','duty:del']" label="操作" width="150px" align="center">
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
import crudDuty from '@/api/duty'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { dutyId: null, usercode: null, serviceTime: null, serviceAddress: null, lon: null, lat: null, serviceContent: null, serviceType: null, tid: null }
export default {
  name: 'Duty',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/duty_info', url: 'api/duty', sort: 'dutyId,desc', crudMethod: { ...crudDuty }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'duty:add'],
        edit: ['admin', 'duty:edit'],
        del: ['admin', 'duty:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'dutyId', display_name: '主动勤务标识' },
        { key: 'usercode', display_name: '警员标识' },
        { key: 'serviceTime', display_name: '勤务时间' },
        { key: 'serviceAddress', display_name: '勤务地点' },
        { key: 'lon', display_name: '经度' },
        { key: 'lat', display_name: '纬度' },
        { key: 'serviceContent', display_name: '勤务内容' },
        { key: 'tid', display_name: '报警标识' }
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
