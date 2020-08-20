<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">组织ID</label> -->
        <!-- <el-input v-model="query.id" clearable placeholder="组织ID" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <!-- <el-select v-model="query.departid" filterable placeholder="请选择">
          <el-option v-for="item in departoption" :key=item.value :label=item.label :value=item.value />
        </el-select> -->
        
        <treeselect class="filter-item" v-model="query.classcode" :options="departments" :deleteRemoves="false"
          noChildrenText="无节点" style="width: 270px" placeholder="管辖部门" />
        <!-- </el-select> -->
        <!-- <label class="el-form-item-label">部门ID</label> -->
        <el-input v-model="query.departid" clearable placeholder="部门ID" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">部门名称</label> -->
        <el-input v-model="query.departname" clearable placeholder="部门名称" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">负责人姓名</label> -->
        <el-input v-model="query.manager" clearable placeholder="负责人姓名" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="840px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
          <!-- <el-form-item label="组织ID" prop="id">
            <el-input v-model="form.id" style="width: 270px;" />
          </el-form-item> -->
          <el-form-item label="部门ID" prop="departid">
            <el-input v-model="form.departid" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="部门名称" prop="departname">
            <el-input v-model="form.departname" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="上级部门" prop="classcode">
            <treeselect class="filter-item" v-model="form.classcode" :options="departments" :deleteRemoves="false"
              noChildrenText="无节点" style="width: 270px" placeholder="管辖部门" />
          </el-form-item>
          <el-form-item label="负责人姓名">
            <el-input v-model="form.manager" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="负责人手机">
            <el-input v-model="form.managermobile" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="负责人电话">
            <el-input v-model="form.managerphone" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="办公室电话">
            <el-input v-model="form.officephone" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="办公室电话2">
            <el-input v-model="form.officephone2" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="办公室电话3">
            <el-input v-model="form.officephone3" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="办公室传真">
            <el-input v-model="form.officefax" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="邮编">
            <el-input v-model="form.postcode" style="width: 270px;" />
          </el-form-item>

          <el-form-item label="工作地点">
            <el-input v-model="form.workaddress" style="width: 270px;" />
          </el-form-item>
          <!-- <el-form-item label="创建时间">
            <el-date-picker v-model="form.createdate" type="datetime" style="width: 270px;" />
          </el-form-item> -->
          <el-form-item label="工作内容">
            <el-input type="textarea" v-model="form.workcontent" :autosize="{ minRows: 2, maxRows: 4}"
              style="width: 650px;" />
          </el-form-item>
          <!-- <el-form-item label="是否被使用">
            <el-input v-model="form.isuse" style="width: 270px;" />
          </el-form-item> -->
          <!-- <el-form-item label="管辖区域">
            <el-input v-model="form.gisarea" style="width: 270px;" />
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;"
        @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column prop="id" label="组织ID" /> -->
        <el-table-column prop="departid" label="部门ID" width="110px" />
        <el-table-column prop="departname" label="部门名称" width="230px" />
        <el-table-column prop="parentName" label="上级部门" width="230px" />
        <el-table-column prop="manager" label="负责人姓名" width="80px" />
        <!-- <el-table-column prop="managermobile" label="负责人手机号码" />
        <el-table-column prop="managerphone" label="负责人电话号码" /> -->
        <el-table-column prop="officephone" label="办公室电话" width="80px" />
        <el-table-column prop="officephone2" label="办公室电话2" width="90px" />
        <el-table-column prop="workaddress" label="工作地点" width="300px" />
        <el-table-column prop="workcontent" label="工作内容" />
        <!-- <el-table-column prop="officephone3" label="办公室电话3" />
        <el-table-column prop="officefax" label="办公室传真" />
        <el-table-column prop="postcode" label="邮编" />
        <el-table-column prop="createdate" label="创建时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createdate) }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="isuse" label="是否被使用" />
        <el-table-column prop="gisarea" label="管辖区域" /> -->
        <el-table-column v-permission="['admin','tCfgDepartment:edit','tCfgDepartment:del']" label="操作" width="150px"
          align="center">
          <template slot-scope="scope">
            <udOperation :data="scope.row" :permission="permission" />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudTCfgDepartment from '@/api/duty/tCfgDepartment'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'

const defaultForm = { id: null, departid: null, departname: null, classcode: null, workcontent: null, workaddress: null, manager: null, managermobile: null, managerphone: null, officephone: null, officephone2: null, officephone3: null, officefax: null, postcode: null, systemid: null, createdate: null, isuse: null, gisarea: null, flag: null, theclass: null }
export default {
  name: 'TCfgDepartment',
  components: { Treeselect, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '单位', url: 'api/tCfgDepartment', sort: 'departid,asc', crudMethod: { ...crudTCfgDepartment } })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'tCfgDepartment:add'],
        edit: ['admin', 'tCfgDepartment:edit'],
        del: ['admin', 'tCfgDepartment:del']
      },
      rules: {
        departid: [
          { required: true, message: '部门ID不能为空', trigger: 'blur' }
        ],
        departname: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'id', display_name: '组织ID' },
        { key: 'departid', display_name: '部门ID' },
        { key: 'departname', display_name: '部门名称' },
        { key: 'manager', display_name: '负责人姓名' }
      ],
      depart: [],
      departments: [],
      // departoption: [],
      // department: [],
      // departoption: []
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },/** 丢弃 */
    getAlldepart() {
      crudTCfgDepartment.getAll().then(res => {
        this.depart = res.content
        for (var val of this.depart) {
          this.departoption.push({ label: val.departname, value: val.departid })
        }
      })
    },
  },
  created() {
    crudTCfgDepartment.getTree().then(res => {
      this.departments = res
    }).catch(e => {
      console.error(e)
    })
  }
}
</script>

<style scoped>
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .vue-treeselect__control,
/deep/ .vue-treeselect__placeholder,
/deep/ .vue-treeselect__single-value {
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
