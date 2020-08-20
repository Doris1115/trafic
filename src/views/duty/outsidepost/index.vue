<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">执勤岗位编号</label> -->
        <!-- <el-input v-model="query.zqgwbh" clearable placeholder="执勤岗位编号" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <!-- <label class="el-form-item-label">执勤岗位名称</label> -->
        <treeselect class="filter-item" v-model="query.ssjg" :options="departments" :deleteRemoves="false"
          noChildrenText="无节点" style="width: 270px" placeholder="管辖部门" />
        <el-select v-model="query.fzxs" clearable filterable placeholder="分组" style="width: 185px;" class="filter-item">
          <el-option v-for="item in dict.grouping" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="query.zqgwmc" clearable placeholder="岗位名称" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">执勤岗位类型</label> -->
        <!-- <el-input v-model="query.zqgwlx" clearable placeholder="执勤岗位类型" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <el-select v-model="query.zqgwlx" filterable placeholder="类型" style="width: 185px;" class="filter-item">
          <el-option v-for="item in dict.outsiteJobType" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="1000px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
          <!-- <el-form-item label="执勤岗位编号" prop="zqgwbh">
            <el-input v-model="form.zqgwbh" style="width: 370px;" />
          </el-form-item> -->
          <el-form-item label="岗位名称" prop="zqgwmc">
            <el-input v-model="form.zqgwmc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="所属机构" prop="ssjg">
            <treeselect class="filter-item" v-model="form.ssjg" :options="departments" :deleteRemoves="false"
              noChildrenText="无节点" style="width: 270px" placeholder="管辖部门" />
          </el-form-item>
          <el-form-item label="岗位类型">
            <el-select v-model="form.zqgwlx" filterable placeholder="请选择" style="width: 370px;">
              <el-option v-for="item in dict.outsiteJobType" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位状态">
            <el-select v-model="form.kjslx" filterable placeholder="岗位状态" style="width: 370px;">
              <el-option v-for="item in dict.outsideJob" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="当前规则">
            <el-input v-model="form.dqsyhz" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="所属分组">
            <el-select v-model="form.fzxs" filterable placeholder="请选择" style="width: 370px;">
              <el-option v-for="item in dict.grouping" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="岗位序号">
            <el-input v-model="form.gwxh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="岗位职能">
            <el-input v-model="form.zqgwzn" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.bz" style="width: 834px;" />
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
        <!-- <el-table-column prop="zqgwbh" label="执勤岗位编号" /> -->
        <el-table-column prop="zqgwmc" label="执勤岗位名称" width="120" />
        <el-table-column prop="zqgwlx" label="执勤岗位类型" width="100">
          <template slot-scope="scope">
            {{ dict.label.outsiteJobType[scope.row.zqgwlx] }}
          </template>
        </el-table-column>
        <el-table-column prop="kjslx" label="岗位状态" width="100">
          <template slot-scope="scope">
            {{ dict.label.outsideJob[scope.row.kjslx] }}
          </template>
        </el-table-column>
        <el-table-column prop="department.departname" label="所属机构" width="190" />
        <!-- <el-table-column prop="bzbj" label="标注标记（0未标记 1标记）" /> -->
        <el-table-column prop="gwxh" label="岗位序号" width="80" />
        <el-table-column prop="rule.gzmc" label="当前使用规则" width="190" />
        <el-table-column prop="fzxs" label="分组显示" width="80">
          <template slot-scope="scope">
            {{ dict.label.grouping[scope.row.fzxs] }}
          </template>
        </el-table-column>
        <el-table-column prop="zqgwzn" label="执勤岗位职能" />
        <el-table-column prop="spbh" label="视频编号" />
        <el-table-column prop="spyzw" label="视频预置位" />
        <el-table-column prop="bz" label="备注" />
        <el-table-column v-permission="['admin','tSevOutsidePost:edit','tSevOutsidePost:del']" label="操作" width="150px"
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
import crudTSevOutsidePost from '@/api/duty/tSevOutsidePost'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import crudTCfgDepartment from '@/api/duty/tCfgDepartment'
import Treeselect, { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect"
import '@riophae/vue-treeselect/dist/vue-treeselect.css'



const defaultForm = { zqgwbh: null, zqgwmc: null, zqgwzn: null, zqgwlx: null, kjslx: null, ssjg: null, bzbj: '1', gwxh: null, dqsyhz: null, fzxs: null, spbh: null, spyzw: null, bz: null }
export default {
  name: 'TSevOutsidePost',
  components: { Treeselect, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['outsideJob', 'grouping', 'outsiteJobType'],
  cruds() {
    return CRUD({ idField: 'zqgwbh', title: '室外岗位', url: 'api/tSevOutsidePost', sort: 'zqgwbh,desc', crudMethod: { ...crudTSevOutsidePost } })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'tSevOutsidePost:add'],
        edit: ['admin', 'tSevOutsidePost:edit'],
        del: ['admin', 'tSevOutsidePost:del']
      },
      rules: {
        zqgwmc: [
          { required: true, message: '执勤岗位名称不能为空', trigger: 'blur' }
        ],
        ssjg: [
          { required: true, message: '所属机构不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'zqgwbh', display_name: '执勤岗位编号' },
        { key: 'zqgwmc', display_name: '执勤岗位名称' },
        { key: 'zqgwlx', display_name: '执勤岗位类型' }
      ],
      depart: [],
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