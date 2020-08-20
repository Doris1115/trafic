<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">车辆类型</label>
        <el-input v-model="query.cllx" clearable placeholder="车辆类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">采集机关</label>
        <el-input v-model="query.cjjg" clearable placeholder="采集机关" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">号牌号码</label>
        <el-input v-model="query.hphm" clearable placeholder="号牌号码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">地点编号</label>
        <el-input v-model="query.ddbh" clearable placeholder="地点编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">号牌颜色</label>
        <el-input v-model="query.hpys" clearable placeholder="号牌颜色" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">号牌种类</label>
        <el-input v-model="query.hpzl" clearable placeholder="号牌种类" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">车道编号</label>
        <el-input v-model="query.cdbh" clearable placeholder="车道编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">车身颜色</label>
        <el-input v-model="query.csys" clearable placeholder="车身颜色" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.gwsj"
          start-placeholder="gwsjStart"
          end-placeholder="gwsjStart"
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
            <el-input v-model="form.xh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车辆速度">
            <el-input v-model="form.clsd" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车辆类型">
            <el-select v-model="form.cllx" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.vehicle_type_xiangtan"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="采集机关">
            <el-input v-model="form.cjjg" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="过往时间">
            <el-date-picker v-model="form.gwsj" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标记">
            <el-input v-model="form.bj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="卡口编号">
            <el-input v-model="form.kkid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="号牌号码">
            <el-input v-model="form.hphm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车速毫秒">
            <el-input v-model="form.cshm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="方向编号">
            <el-input v-model="form.fxbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="图片标记">
            <el-input v-model="form.tpbj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="记录类型">
            <el-input v-model="form.jllx" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="地点编号">
            <el-input v-model="form.ddbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="数据来源">
            <el-input v-model="form.sjly" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="号牌颜色">
            <el-select v-model="form.hpys" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.ColorType"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
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
          <el-form-item label="车道编号">
            <el-input v-model="form.cdbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否识别">
            <el-input v-model="form.ishp" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-input v-model="form.gxsj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.bz" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车身颜色">
            <el-select v-model="form.csys" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.ColorType"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
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
        <el-table-column prop="xh" label="序号" />
        <el-table-column prop="clsd" label="车辆速度" />
        <el-table-column prop="cllx" label="车辆类型">
          <template slot-scope="scope">
            {{ dict.label.vehicle_type_xiangtan[scope.row.cllx] }}
          </template>
        </el-table-column>
        <el-table-column prop="cjjg" label="采集机关" />
        <el-table-column prop="gwsj" label="过往时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.gwsj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bj" label="标记" />
        <el-table-column prop="kkid" label="卡口编号" />
        <el-table-column prop="hphm" label="号牌号码" />
        <el-table-column prop="cshm" label="车速毫秒" />
        <el-table-column prop="fxbh" label="方向编号" />
        <el-table-column prop="tpbj" label="图片标记" />
        <el-table-column prop="jllx" label="记录类型" />
        <el-table-column prop="ddbh" label="地点编号" />
        <el-table-column prop="sjly" label="数据来源" />
        <el-table-column prop="hpys" label="号牌颜色">
          <template slot-scope="scope">
            {{ dict.label.ColorType[scope.row.hpys] }}
          </template>
        </el-table-column>
        <el-table-column prop="hpzl" label="号牌种类">
          <template slot-scope="scope">
            {{ dict.label.plate_type[scope.row.hpzl] }}
          </template>
        </el-table-column>
        <el-table-column prop="cdbh" label="车道编号" />
        <el-table-column prop="ishp" label="是否识别" />
        <el-table-column prop="gxsj" label="更新时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.gxsj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bz" label="备注" />
        <el-table-column prop="csys" label="车身颜色">
          <template slot-scope="scope">
            {{ dict.label.ColorType[scope.row.csys] }}
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','passcar:edit','passcar:del']" label="操作" width="150px" align="center">
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
import crudPasscar from '@/api/passcar'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { xh: null, clsd: null, cllx: null, cjjg: null, gwsj: null, bj: null, kkid: null, hphm: null, cshm: null, fxbh: null, tpbj: null, jllx: null, ddbh: null, sjly: null, hpys: null, hpzl: null, cdbh: null, ishp: null, gxsj: null, bz: null, csys: null }
export default {
  name: 'Passcar',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['vehicle_type_xiangtan', 'ColorType', 'plate_type', 'ColorType'],
  cruds() {
    return CRUD({ title: 'v1/api/data/pass_car', url: 'api/passcar', sort: 'xh,desc', crudMethod: { ...crudPasscar }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'passcar:add'],
        edit: ['admin', 'passcar:edit'],
        del: ['admin', 'passcar:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'cllx', display_name: '车辆类型' },
        { key: 'cjjg', display_name: '采集机关' },
        { key: 'hphm', display_name: '号牌号码' },
        { key: 'ddbh', display_name: '地点编号' },
        { key: 'hpys', display_name: '号牌颜色' },
        { key: 'hpzl', display_name: '号牌种类' },
        { key: 'cdbh', display_name: '车道编号' },
        { key: 'csys', display_name: '车身颜色' }
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
