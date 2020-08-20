<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission">
        <template slot='right'>
          <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus">生成</el-button>
        </template>
      </crudOperation>
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="警员ID" prop="policeid">
            <treeselect :load-options="loadOptions" :options="departoption" :flatten-search-results="true"
              :disable-branch-nodes="true" placeholder="请选择" style="width: 370px;" v-model="form.policeid" />
          </el-form-item>
          <el-form-item label="出警时长评分" prop="dutytimeMark">
            <el-select v-model="form.dutytimeMark" filterable placeholder="请选择">
              <el-option v-for="item in dict.mark" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="巡逻里程评分" prop="patorllengthMark">
            <el-select v-model="form.patorllengthMark" filterable placeholder="请选择">
              <el-option v-for="item in dict.mark" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="主动勤务评分" prop="volunteerMark">
            <el-select v-model="form.volunteerMark" filterable placeholder="请选择">
              <el-option v-for="item in dict.mark" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="执法总量评分" prop="totalprocessMark">
            <el-select v-model="form.totalprocessMark" filterable placeholder="请选择">
              <el-option v-for="item in dict.mark" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="结警时长评分" prop="processtimeMark">
            <el-select v-model="form.processtimeMark" filterable placeholder="请选择">
              <el-option v-for="item in dict.mark" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="评分日期" prop="markdate">
            <el-date-picker v-model="form.markdate" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="评语">
            <el-input v-model="form.leadercomment" style="width: 370px;" />
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
        <el-table-column prop="policeid" label="警员ID" />
        <el-table-column prop="dutytimeMark" label="出警时长评分">
          <template slot-scope="scope">
            {{ dict.label.mark[scope.row.dutytimeMark] }}
          </template>
        </el-table-column>
        <el-table-column prop="patorllengthMark" label="巡逻里程评分">
          <template slot-scope="scope">
            {{ dict.label.mark[scope.row.patorllengthMark] }}
          </template>
        </el-table-column>
        <el-table-column prop="volunteerMark" label="主动勤务评分">
          <template slot-scope="scope">
            {{ dict.label.mark[scope.row.volunteerMark] }}
          </template>
        </el-table-column>
        <el-table-column prop="totalprocessMark" label="执法总量评分">
          <template slot-scope="scope">
            {{ dict.label.mark[scope.row.totalprocessMark] }}
          </template>
        </el-table-column>
        <el-table-column prop="processtimeMark" label="结警时长评分">
          <template slot-scope="scope">
            {{ dict.label.mark[scope.row.processtimeMark] }}
          </template>
        </el-table-column>
        <el-table-column prop="markdate" label="评分日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.markdate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalmark" label="总分" />
        <el-table-column prop="leadercomment" label="评语" />
        <el-table-column v-permission="['admin','evaluationMark:edit','evaluationMark:del']" label="操作" width="150px"
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
import crudEvaluationMark from '@/api/duty/evaluationMark'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import crudTCfgDepartment from '@/api/duty/tCfgDepartment'
import crudtSerPerson from '@/api/duty/tSerPerson'
import Treeselect, { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


const defaultForm = { recordid: null, policeid: null, dutytimeMark: null, patorllengthMark: null, volunteerMark: null, totalprocessMark: null, processtimeMark: null, markdate: null, totalmark: null, leadercomment: null }
export default {
  name: 'EvaluationMark',
  components: { Treeselect, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['mark'],
  cruds() {
    return CRUD({ title: '大队评价', url: 'api/duty/evaluationMark', sort: 'recordid,desc', crudMethod: { ...crudEvaluationMark }, idField: 'recordid' })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'evaluationMark:add'],
        edit: ['admin', 'evaluationMark:edit'],
        del: ['admin', 'evaluationMark:del']
      },
      rules: {
        policeid: [
          { required: true, message: '警员ID不能为空', trigger: 'blur' }
        ],
        dutytimeMark: [
          { required: true, message: '出警时长评分不能为空', trigger: 'blur' }
        ],
        patorllengthMark: [
          { required: true, message: '巡逻里程评分不能为空', trigger: 'blur' }
        ],
        volunteerMark: [
          { required: true, message: '主动勤务评分不能为空', trigger: 'blur' }
        ],
        totalprocessMark: [
          { required: true, message: '执法总量评分不能为空', trigger: 'blur' }
        ],
        processtimeMark: [
          { required: true, message: '结警时长评分不能为空', trigger: 'blur' }
        ],
        markdate: [
          { required: true, message: '评分日期不能为空', trigger: 'blur' }
        ],

      },
      depart: [],
      // departoption: [],
      departments: [],
      person: [],
    }

  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    [CRUD.HOOK.beforeSubmit]() {
      this.form.totalmark = 2 * this.form.dutytimeMark + 2 * this.form.patorllengthMark + 2 * this.form.volunteerMark + 2 * this.form.totalprocessMark + 2 * this.form.processtimeMark
    },

    // getDepartAll() {
    //   crudTCfgDepartment.getAll().then(res => {
    //     this.depart = res.content
    //     for (var val of this.depart) {
    //       if (val.departid === '430300000000') {
    //         this.departoption.push({ label: val.departname, id: val.departid, children: null })
    //       }
    //     }
    //   })
    // },
    getPersonAll() {
      crudtSerPerson.getAll().then(res => {
        this.person = res.content
        console.log(this.person.length)
      })
    },
    // loadOptions({ action, parentNode, callback }) {
    //   if (action === LOAD_CHILDREN_OPTIONS) {
    //     parentNode.children = []
    //     for (var val of this.person) {
    //       if (val.departid === parentNode.id) {
    //         parentNode.children.push({ label: val.name, id: val.usercode, children: true })
    //       }
    //     }
    //     for (var val of this.depart) {
    //       if (val.classcode === parentNode.id) {
    //         parentNode.children.push({ label: val.departname, id: val.departid, children: null })
    //       }
    //     }
    //     callback()
    //   }
    // },
  },
  created() {
    // this.getPersonAll()
    this.getDepartAll()
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
