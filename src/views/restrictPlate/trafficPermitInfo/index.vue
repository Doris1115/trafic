<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- <el-input v-model="query.departmentId" style="width: 200px;" /> -->
        <treeselect
          class="filter-item"
          v-model="query.departmentId"
          :options="departments"          
          :deleteRemoves="false"
          noChildrenText="无节点"
          style="width: 370px"
          placeholder="管辖部门"
        />
        <!-- @deselect="siteDeviceTreeDeselectedHandle"
          @select="siteDeviceTreeSelectedHandle" -->
        <!-- 搜索 -->
        <el-date-picker
          v-model="query.indate"
          class="filter-item" 
          type="daterange"
          :clearable="true"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 270px;"
          @change="changeDataRangeValueHandler"
        />
        <!-- <el-input v-model="query.permitSiteNums" clearable placeholder="通行地点" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-input v-model="query.hphm" clearable placeholder="号牌号码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> 
        <!-- <el-input v-model="query.hpzl" clearable placeholder="号牌种类" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-select v-model="query.hpzl" class="filter-item" >
          <el-option            
            v-for="item in dict.plate_class"
            :key="item.id"
            :label="item.label"
            :value="item.value" />
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="860px" top="5vh">
        <el-form ref="form" :model="form" :rules="rules" :inline="true" size="small" label-width="100px">
          <!-- <el-form-item label="通行证记录标识">
            <el-input v-model="form.trafficPermitId" style="width: 370px;" />
          </el-form-item> -->
          <el-form-item label="管辖部门" prop="departmentId">
            <!-- <el-input v-model="form.departmentId" style="width: 510px;" /> -->
            <treeselect
              class="filter-item"
              v-model="form.departmentId"
              :options="departments"          
              :deleteRemoves="false"
              noChildrenText="无节点"
              style="width: 675px"
              placeholder="管辖部门"
            />
          </el-form-item>
          <el-form-item label="号牌号码" prop="hphm">
            <el-input v-model="form.hphm" style="width: 280px;" />
          </el-form-item>
          <el-form-item label="号牌种类" prop="hpzl">
            <el-select v-model="form.hpzl" filterable placeholder="请选择" style="width: 280px;">
              <el-option
                v-for="item in dict.plate_class"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="indateStart">
            <el-date-picker v-model="form.indateStart" placeholder="开始时间" value-format="yyyy-MM-dd 00:00:00" type="date" style="width: 280px;" />
          </el-form-item>
          <el-form-item label="结束时间" prop="indateEnd">
            <el-date-picker v-model="form.indateEnd" placeholder="结束时间" value-format="yyyy-MM-dd 23:59:59" type="date" style="width: 280px;" />
          </el-form-item>
          <el-form-item label="通行时间段1">
            <el-time-picker v-model="form.timeInterval1" is-range value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 280px;" />
          </el-form-item>
          <el-form-item label="通行时间段2">
            <el-time-picker v-model="form.timeInterval2" is-range value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 280px;" />
          </el-form-item>
          <el-form-item label="通行时间段3">
            <el-time-picker v-model="form.timeInterval3" is-range value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 280px;" />
          </el-form-item>
          <el-form-item label="通行时间段4">
            <el-time-picker v-model="form.timeInterval4" is-range value-format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 280px;" />
          </el-form-item>
          <el-form-item label="通行地点" prop="permitSiteNums">
            <!-- <el-input v-model="form.permitSiteNums" style="width: 370px;" /> -->
            <!-- <site-tree-transfer ref="siteTreeTransferRef" :defaultCheckedSites="checkedSites" @addBtn='addSiteHandle' @removeBtn='removeSiteHandle' width="775px" height="340px"/> -->
            <site-device-tree-transfer ref="siteTreeTransferRef" :defaultCheckedDevices="checkedDevice" @addBtn='addSiteDeviceHandle' @removeBtn='removeSiteDeviceHandle' width="775px" height="340px"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width: 370px;" />
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
        <el-table-column prop="departmentName" label="管辖部门" />
        <el-table-column prop="hphm" label="号牌号码" />
        <el-table-column prop="hpzl" label="号牌种类">
          <template slot-scope="scope">
            {{ dict.label.plate_class[scope.row.hpzl] }}
          </template>
        </el-table-column>
        <el-table-column label="有效期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.indateStart, '{y}-{m}-{d}') + '~' + parseTime(scope.row.indateEnd,'{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="timeInterval1" label="通行时间段1"/>
        <el-table-column prop="timeInterval2" label="通行时间段2"/>
        <el-table-column prop="timeInterval3" label="通行时间段3"/>
        <el-table-column prop="timeInterval4" label="通行时间段4"/>
        <!-- <el-table-column prop="permitSiteNums" label="通行地点" /> -->
        <!-- <el-table-column prop="remark" label="备注" /> -->
        <el-table-column v-permission="['admin','trafficPermitInfo:edit','trafficPermitInfo:del']" label="操作" width="150px" align="center">
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
import crudTrafficPermitInfo from '@/api/trafficPermitInfo'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { changeDataRangeValue } from '@/utils/datePickerFormat'
import { getTree } from '@/api/duty/tCfgDepartment'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// import SiteTreeTransfer from '../../components/SiteTreeTransfer.vue'
import SiteDeviceTreeTransfer from '../../components/SiteDeviceTreeTransfer.vue'

const defaultForm = { trafficPermitId: null,departmentId: null, hphm: null, timeInterval3: null, timeInterval4: null, timeInterval1: null, permitSiteNums: null, indateEnd: null, remark: null, indateStart: null, hpzl: null, timeInterval2: null }
export default {
  name: 'TrafficPermitInfo',
  components: { pagination, crudOperation, rrOperation, udOperation, Treeselect, SiteDeviceTreeTransfer },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['plate_class'],
  cruds() {
    return CRUD({ title: '', url: 'api/trafficPermitInfo', sort: 'hphm,desc', crudMethod: { ...crudTrafficPermitInfo }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'trafficPermitInfo:add'],
        edit: ['admin', 'trafficPermitInfo:edit'],
        del: ['admin', 'trafficPermitInfo:del']
      },
      rules: {
        hphm: [
          { required: true, message: '号牌号码不能为空', trigger: 'blur' }
        ],
        indateEnd: [
          { required: true, message: '有效期结束时间不能为空', trigger: 'blur' }
        ],
        indateStart: [
          { required: true, message: '有效期开始时间不能为空', trigger: 'blur' }
        ],
        hpzl: [
          { required: true, message: '号牌种类不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'hphm', display_name: '号牌号码' },
        { key: 'permitSiteNums', display_name: '通行地点，多个逗号分隔' },
        { key: 'indateEnd', display_name: '有效期结束时间' },
        { key: 'indateStart', display_name: '有效期开始时间' },
        { key: 'hpzl', display_name: '号牌种类' }
      ],
      departments: [],
      checkedDevice: [],
      selectedDevice: []
    }
  },
  watch: {
  },
  beforeCreate () {
    getTree().then(res => {
      this.departments = res
    }).catch(e => {
      console.error(e)
    })
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh](crud) {
      if (crud.query.indate) {
        crud.query.indateEnd = crud.query.indate[1]
        crud.query.indateStart = crud.query.indate[0]
      } else {
        crud.query.indateEnd = null
        crud.query.indateStart = null
      }
      return true
    },
    // 提交之前
    [CRUD.HOOK.afterValidateCU](crud, form) {
      crud.form.permitSiteNums = this.selectedDevice.join(',')
      crud.form.timeInterval1 = this.setTimeInterval(crud.form.timeInterval1)
      crud.form.timeInterval2 = this.setTimeInterval(crud.form.timeInterval2)
      crud.form.timeInterval3 = this.setTimeInterval(crud.form.timeInterval3)
      crud.form.timeInterval4 = this.setTimeInterval(crud.form.timeInterval4)
    },
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      if (crud.form.trafficPermitId === null) {
        this.checkedDevice = []   
      }
      if (this.$refs["siteTreeTransferRef"]) {
        this.$refs["siteTreeTransferRef"].restoreTree()
      }      
    },
    // 打开编辑弹窗前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.checkedDevice = form.permitSiteNums.split(',')
      this.selectedDevice = this.checkedDevice
      crud.form.timeInterval1 = this.getTimeInterval(crud.form.timeInterval1)
      crud.form.timeInterval2 = this.getTimeInterval(crud.form.timeInterval2)
      crud.form.timeInterval3 = this.getTimeInterval(crud.form.timeInterval3)
      crud.form.timeInterval4 = this.getTimeInterval(crud.form.timeInterval4)
      return true
    },
    // 区间时间控件时间修改
    changeDataRangeValueHandler(values) {
      changeDataRangeValue(values)
      // this.query.indateEnd = values[0]
      // this.query.indateStart = values[1]
      // console.log(this.query)
    },
    addSiteDeviceHandle(fromData, toData, selectedNodes) {
      const slef = this
      selectedNodes.nodes.forEach(item => {
        if (item.type === "device") {
          slef.selectedDevice.push(item.id)
        }
      })
    },
    removeSiteDeviceHandle(fromData, toData, selectedNodes) {
      const self = this
      selectedNodes.nodes.forEach(item => {
        if (item.type === "device") {
          self.selectedDevice = self.selectedDevice.filter(deviceId => {
            return deviceId !== item.id
          })
        }
      })
    },
    setTimeInterval(timeInterval) {
      if (timeInterval && timeInterval instanceof Array && timeInterval.length === 2) {
        return timeInterval[0] + '~' + timeInterval[1]
      }
      else {
        return '-- ~ --'
      }

    },
    getTimeInterval(timeInterval) {
      if (timeInterval !== null && timeInterval.length > 0) {
        return timeInterval.split('~')
      }
      else {
        return ['--', '--']
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
    font-size: 13px;
    // line-height: 30px;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
    font-size: 13px;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .vue-treeselect__menu {
    font-size: 13px;
    font-weight: 100;
    color: #606266;
  }
  /deep/ .vue-treeselect--has-value .vue-treeselect__multi-value {
    margin-bottom: 5px;
    max-height: 70px;
    // overflow-x: hidden;
  }
</style>
