<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">车牌</label> -->
        <el-input v-model="query.plateNum" clearable placeholder="车牌" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">责任人</label> -->
        <el-input v-model="query.personCharge" clearable placeholder="责任人" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">司机姓名</label> -->
        <el-input v-model="query.driverName" clearable placeholder="司机姓名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">部门id</label> -->
        <treeselect
          style="width: 185px;"
          class="filter-item"
          v-model="query.deptId"
          :options="depts"
          :load-options="loadDepts"
          placeholder="选择部门"
        />
        <!-- <el-input v-model="query.deptId" clearable placeholder="部门id" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="司机姓名">
            <el-input v-model="form.driverName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车牌">
            <el-input v-model="form.plateNum" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车辆颜色">
            <el-select v-model="form.carClor" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.ColorType"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="责任人电话">
            <el-input v-model="form.personChargePho" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="责任人">
            <el-input v-model="form.personCharge" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车辆类型">
            <el-select v-model="form.carType" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.plate_type"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="司机电话">
            <el-input v-model="form.driverPho" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车辆品牌">
            <el-select v-model="form.vehicleBrand" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.vehicle_brand"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="部门id">
            <treeselect
              style="width: 370px;"
              class="filter-item"
              v-model="form.deptId"
              :options="depts"
              :load-options="loadDepts"
              placeholder="选择部门"
            />
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
        <!-- <el-table-column prop="serviceCarNum" label="公务车表序号" /> -->
        <el-table-column prop="driverName" label="司机姓名" />
        <el-table-column prop="plateNum" label="车牌" />
        <el-table-column prop="carClor" label="车辆颜色">
          <template slot-scope="scope">
            {{ dict.label.ColorType[scope.row.carClor] }}
          </template>
        </el-table-column>
        <el-table-column prop="personChargePho" label="责任人电话" />
        <el-table-column prop="personCharge" label="责任人" />
        <el-table-column prop="carType" label="车辆类型">
          <template slot-scope="scope">
            {{ dict.label.plate_type[scope.row.carType] }}
          </template>
        </el-table-column>
        <el-table-column prop="driverPho" label="司机电话" />
        <el-table-column prop="vehicleBrand" label="车辆品牌">
          <template slot-scope="scope">
            {{ dict.label.vehicle_brand[scope.row.vehicleBrand] }}
          </template>
        </el-table-column>
        <el-table-column prop="deptId" label="部门id" />
        <el-table-column v-permission="['admin','serviceCarInfo:edit','serviceCarInfo:del']" label="操作" width="150px" align="center">
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
import crudServiceCarInfo from '@/api/serviceCarInfo'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { getDepts } from '@/api/system/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

const defaultForm = { serviceCarNum: null, driverName: null, plateNum: null, carClor: null, personChargePho: null, personCharge: null, carType: null, driverPho: null, vehicleBrand: null, deptId: null }
export default {
  name: 'ServiceCarInfo',
  components: { pagination, crudOperation, rrOperation, udOperation, Treeselect },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['ColorType', 'plate_type', 'vehicle_brand'],
  cruds() {
    return CRUD({ title: '', url: 'api/serviceCarInfo', sort: 'serviceCarNum,desc', crudMethod: { ...crudServiceCarInfo }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'serviceCarInfo:add'],
        edit: ['admin', 'serviceCarInfo:edit'],
        del: ['admin', 'serviceCarInfo:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'driverName', display_name: '司机姓名' },
        { key: 'plateNum', display_name: '车牌' },
        { key: 'personCharge', display_name: '责任人' },
        { key: 'deptId', display_name: '部门id' }
      ],
      depts: []
    }
  },
  mounted() {    
    this.getDepts()
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content.map(function(obj) {
          if (obj.hasChildren) {
            obj.children = null
          }
          return obj
        })
      })
    },
    // 获取弹窗内部门数据
    loadDepts({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        getDepts({ enabled: true, pid: parentNode.id }).then(res => {
          parentNode.children = res.content.map(function(obj) {
            if (obj.hasChildren) {
              obj.children = null
            }
            return obj
          })
          setTimeout(() => {
            callback()
          }, 200)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .vue-treeselect__control, /deep/ .vue-treeselect__placeholder, /deep/ .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>
