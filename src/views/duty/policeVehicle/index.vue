<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">管理部门</label>
        <el-input v-model="query.glbm" clearable placeholder="管理部门" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">呼叫号码</label>
        <el-input v-model="query.hjhm" clearable placeholder="呼叫号码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">车载台号</label>
        <el-input v-model="query.czth" clearable placeholder="车载台号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">车辆品牌</label>
        <el-input v-model="query.clpp" clearable placeholder="车辆品牌" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">设备编码</label>
        <el-input v-model="query.devid" clearable placeholder="设备编码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">联系电话</label>
        <el-input v-model="query.lxdh" clearable placeholder="联系电话" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">号牌种类</label>
        <el-input v-model="query.hpzl" clearable placeholder="号牌种类" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.gzrq"
          start-placeholder="gzrqStart"
          end-placeholder="gzrqStart"
          class="date-item"
        />
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
          <el-form-item label="购置日期">
            <el-date-picker v-model="form.gzrq" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="管理部门">
            <el-input v-model="form.glbm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="呼叫号码">
            <el-input v-model="form.hjhm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车载台号">
            <el-input v-model="form.czth" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="有无GPS">
            <el-input v-model="form.gps" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车辆品牌">
            <el-select v-model="form.clpp" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.vehicle_brand"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="车辆型号">
            <el-input v-model="form.clxh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="设备编码">
            <el-input v-model="form.devid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车架号">
            <el-input v-model="form.cjh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.lxdh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="号牌号码">
            <el-input v-model="form.hphm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.sjxm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="号牌种类">
            <el-select v-model="form.hpzl" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.plate_type"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="警用装备">
            <el-input v-model="form.jyzb" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="未知">
            <el-input v-model="form.domainid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车辆状态">
            <el-input v-model="form.clzt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车辆型号">
            <el-select v-model="form.clzl" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.vehicle_type"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="设备状态">
            <el-input v-model="form.sbzt" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="发动机号">
            <el-input v-model="form.fdjh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="人员状况">
            <el-input v-model="form.ryzk" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车载台组号">
            <el-input v-model="form.cztzh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="核定客量">
            <el-input v-model="form.hdkl" style="width: 370px;" />
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
        <el-table-column prop="gzrq" label="购置日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.gzrq) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="glbm" label="管理部门" />
        <el-table-column prop="hjhm" label="呼叫号码" />
        <el-table-column prop="czth" label="车载台号" />
        <el-table-column prop="gps" label="有无GPS" />
        <el-table-column prop="clpp" label="车辆品牌">
          <template slot-scope="scope">
            {{ dict.label.vehicle_brand[scope.row.clpp] }}
          </template>
        </el-table-column>
        <el-table-column prop="clxh" label="车辆型号" />
        <el-table-column prop="devid" label="设备编码" />
        <el-table-column prop="cjh" label="车架号" />
        <el-table-column prop="lxdh" label="联系电话" />
        <el-table-column prop="hphm" label="号牌号码" />
        <el-table-column prop="sjxm" label="手机号码" />
        <el-table-column prop="hpzl" label="号牌种类">
          <template slot-scope="scope">
            {{ dict.label.plate_type[scope.row.hpzl] }}
          </template>
        </el-table-column>
        <el-table-column prop="jyzb" label="警用装备" />
        <el-table-column prop="domainid" label="未知" />
        <el-table-column prop="clzt" label="车辆状态" />
        <el-table-column prop="clzl" label="车辆型号">
          <template slot-scope="scope">
            {{ dict.label.vehicle_type[scope.row.clzl] }}
          </template>
        </el-table-column>
        <el-table-column prop="sbzt" label="设备状态" />
        <el-table-column prop="fdjh" label="发动机号" />
        <el-table-column prop="ryzk" label="人员状况" />
        <el-table-column prop="cztzh" label="车载台组号" />
        <el-table-column prop="hdkl" label="核定客量" />
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
import crudDuty from '@/api/duty/policeVehicle'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { id: null, gzrq: null, glbm: null, hjhm: null, czth: null, gps: null, clpp: null, clxh: null, devid: null, cjh: null, lxdh: null, hphm: null, sjxm: null, hpzl: null, jyzb: null, domainid: null, clzt: null, clzl: null, sbzt: null, fdjh: null, ryzk: null, cztzh: null, hdkl: null }
export default {
  name: 'Duty',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['vehicle_brand', 'plate_type', 'vehicle_type'],
  cruds() {
    return CRUD({ title: 'v1/api/duty/police_vehicle', url: 'api/duty', sort: 'id,desc', crudMethod: { ...crudDuty }})
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
        { key: 'glbm', display_name: '管理部门' },
        { key: 'hjhm', display_name: '呼叫号码' },
        { key: 'czth', display_name: '车载台号' },
        { key: 'clpp', display_name: '车辆品牌' },
        { key: 'devid', display_name: '设备编码' },
        { key: 'lxdh', display_name: '联系电话' },
        { key: 'hpzl', display_name: '号牌种类' }
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
