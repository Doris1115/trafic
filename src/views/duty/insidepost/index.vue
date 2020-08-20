<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">值班岗位编码</label> -->
        <!-- <el-input v-model="query.zbgwbh" clearable placeholder="值班岗位编码" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <!-- <label class="el-form-item-label">所属机构</label> -->
        <!-- <el-input v-model="query.ssjg" clearable placeholder="所属机构" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <treeselect class="filter-item" v-model="query.ssjg" :options="departments" :deleteRemoves="false"
          noChildrenText="无节点" style="width: 270px" placeholder="管辖部门" />
        <el-select v-model="query.fzxs" clearable filterable placeholder="分组" style="width: 185px;" class="filter-item">
          <el-option v-for="item in dict.grouping" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
        <!-- <label class="el-form-item-label">值班电话1</label> -->
        <!-- <el-input v-model="query.zbdh1" clearable placeholder="值班电话1" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <!-- <label class="el-form-item-label">内勤岗位类型</label> -->
        <!-- <el-input v-model="query.nqgwlx" clearable placeholder="内勤岗位类型" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <el-select v-model="query.nqgwlx" filterable placeholder="内勤岗位类型" style="width: 270px;" class="filter-item">
          <el-option v-for="item in dict.insideJob" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
        <!-- <label class="el-form-item-label">内勤岗位职能</label> -->
        <!-- <el-input v-model="query.nqgwzn" clearable placeholder="内勤岗位职能" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="870px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
          <!-- <el-form-item label="值班岗位编码" prop="zbgwbh" label-width="100">
            <el-input v-model="form.zbgwbh" style="width: 370px;" />
          </el-form-item> -->
          <el-form-item label="岗位名称" prop="zqgwmc">
            <el-input v-model="form.zqgwmc" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="所属机构" prop="ssjg">
            <treeselect class="filter-item" v-model="form.ssjg" :options="departments" :deleteRemoves="false"
              noChildrenText="无节点" style="width: 270px" placeholder="管辖部门" />
          </el-form-item>
          <el-form-item label="值班电话1">
            <el-input v-model="form.zbdh1" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="值班电话2">
            <el-input v-model="form.zbdh2" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="内勤岗位类型">
            <el-select v-model="form.nqgwlx" filterable placeholder="请选择" style="width: 270px;">
              <el-option v-for="item in dict.insideJob" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="内勤岗位职能">
            <el-input v-model="form.nqgwzn" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="当前使用规则">
            <el-input v-model="form.dqsygz" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="所属分组">
            <el-select v-model="form.fzxs" filterable placeholder="请选择" style="width: 270px;">
              <el-option v-for="item in dict.grouping" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.bz" style="width: 270px;" />
          </el-form-item>
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
        <!-- <el-table-column prop="zbgwbh" label="值班岗位编码" width="150px" /> -->
        <el-table-column prop="zqgwmc" label="执勤岗位名称" width="120" />
        <el-table-column prop="department.departname" label="所属机构" width="180px" />
        <el-table-column prop="zbdh1" label="值班电话1" width="120px" />
        <el-table-column prop="zbdh2" label="值班电话2" width="120px" />
        <el-table-column prop="nqgwlx" label="内勤岗位类型" width="120px">
          <template slot-scope="scope">
            {{ dict.label.insideJob[scope.row.nqgwlx] }}
          </template>
        </el-table-column>
        <el-table-column prop="nqgwzn" label="内勤岗位职能" width="120px" />
        <el-table-column prop="rule.gzmc" label="当前使用规则" width="120px" />
        <el-table-column prop="fzxs" label="分组">
          <template slot-scope="scope">
            {{ dict.label.grouping[scope.row.fzxs] }}
          </template>
        </el-table-column>
        <el-table-column prop="bz" label="备注" />
        <el-table-column v-permission="['admin','tSevInsidePost:edit','tSevInsidePost:del']" label="操作" width="150px"
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
import crudTSevInsidePost from '@/api/duty/tSevInsidePost'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import crudTCfgDepartment from '@/api/duty/tCfgDepartment'
import Treeselect, { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


const defaultForm = { zbgwbh: null, ssjg: null, zbdh1: null, zbdh2: null, nqgwlx: null, nqgwzn: null, dqsygz: null, fzxs: null, bz: null }
export default {
  name: 'TSevInsidePost',
  components: { Treeselect, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['insideJob', 'grouping'],
  cruds() {
    return CRUD({ idField: 'zbgwbh', title: '室内岗位管理', url: 'api/tSevInsidePost', sort: 'ssjg,desc', crudMethod: { ...crudTSevInsidePost } })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'tSevInsidePost:add'],
        edit: ['admin', 'tSevInsidePost:edit'],
        del: ['admin', 'tSevInsidePost:del']
      },
      rules: {
        ssjg: [
          { required: true, message: '所属机构不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'zbgwbh', display_name: '值班岗位编码' },
        { key: 'ssjg', display_name: '所属机构' },
        { key: 'zbdh1', display_name: '值班电话1' },
        { key: 'nqgwlx', display_name: '内勤岗位类型' },
        { key: 'nqgwzn', display_name: '内勤岗位职能' }
      ],
      // departoption: [],
      departments: [],
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
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