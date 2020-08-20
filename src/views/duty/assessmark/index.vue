<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">警号</label> -->
        <treeselect class="filter-item" v-model="query.departId" :options="departments" :deleteRemoves="false"
          noChildrenText="无节点" style="width: 270px" placeholder="管辖部门" />
        <el-date-picker v-model="query.jssj" placeholder="结束时间" type="date" style="width: 185px;" class="filter-item" />
        <el-input v-model="query.policeId" clearable placeholder="警号" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission">

      </crudOperation>
      <!--表单组件-->
      <!-- <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="警号" prop="policeId">
            <treeselect class="filter-item" v-model="form.policeId" :options="departments" :deleteRemoves="false"
              noChildrenText="无节点" style="width: 270px" placeholder="警员" />
          </el-form-item>
          <el-form-item label="平均出警时长（分钟）">
            <el-input v-model="form.dutytimeMark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="平均巡逻里程（公里）">
            <el-input v-model="form.patorllengthMark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="平均结警时长（分钟）">
            <el-input v-model="form.processtimeMark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="主动勤务次数（次）">
            <el-input v-model="form.volunteerMark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="执法总量（次）">
            <el-input v-model="form.totalProcessMark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="月份">
            <el-date-picker v-model="form.period" type="month" placeholder="选择日期" value-format="yyyy-MM">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog> -->
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;"
        @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="person.name" label="警员" width="80" />
        <el-table-column prop="department.departname" label="部门" width="220" />
        <el-table-column prop="dutyTimeMark" label="出警时长评分" width="100" />
        <el-table-column prop="patorlLengthMark" label="巡逻里程评分" width="100" />
        <el-table-column prop="processTimeMark" label="结警时长评分" width="100" />
        <el-table-column prop="volunteerMark" label="主动勤务评分" width="100" />
        <el-table-column prop="totalProcessMark" label="执法总量评分" width="100" />
        <el-table-column prop="evaluationMark" label="评价得分" width="80" />
        <el-table-column prop="totalMark" label="总得分" width="80" />
        <el-table-column prop="period" label="月份" width="120" />
        <el-table-column prop="markDate" label="得分日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.markDate) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column v-permission="['admin','assessMark:edit','assessMark:del']" label="操作" width="150px"
          align="center">
          <template slot-scope="scope">
            <udOperation :data="scope.row" :permission="permission" />
          </template>
        </el-table-column> -->
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudAssessMark from '@/api/duty/assessMark'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import crudAssess from '@/api/duty/assess'
import Treeselect, { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import crudtSerPerson from '@/api/duty/tSerPerson'
import crudTCfgDepartment from '@/api/duty/tCfgDepartment'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import crudEvaluationMark from '@/api/duty/evaluationMark'
import reportApi from '@/api/duty/report'


const defaultForm = { recordId: null, policeId: null, dutyTimeMark: null, patorlLengthMark: null, processTimeMark: null, volunteerMark: null, totalProcessMark: null, evaluationMark: null, markDate: null, totalMark: null, organId: null }
export default {
  name: 'AssessMark',
  components: { Treeselect, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '评分结果', url: 'api/duty/assessMark', sort: 'recordId,desc', crudMethod: { ...crudAssessMark }, idField: "recordId" })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'assessMark:add']
      },
      rules: {
        policeId: [
          { required: true, message: '警员ID不能为空', trigger: 'blur' }
        ],
        markDate: [
          { required: true, message: '评分日期不能为空', trigger: 'blur' }
        ],
      },
      queryTypeOptions: [
        { key: 'policeId', display_name: '警号' }
      ],
      item1: [],
      item2: [],
      item3: [],
      item4: [],
      item5: [],
      depart: [],
      departoption: [],
      person: [],
      evaluation: [],
      departments: [],
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    getAllitem() {
      // crudAssess.getAll().then(res => {
      //   for (var val of res.content) {
      //     if (val.assessItem === "平均出警时长") {
      //       this.item1.push({
      //         weight: val.itemWeight,
      //         standardmark: val.itemStandardMark,
      //         max: val.itemMaxMark,
      //         plus: val.maxPlus,
      //         sub: val.maxSub,
      //         boundary: val.boundary,
      //         plusstep: val.plusstepmark,
      //         substep: val.substepmark,
      //       })
      //     }
      //     if (val.assessItem === "警务通主动勤务") {
      //       this.item2.push({
      //         weight: val.itemWeight,
      //         standardmark: val.itemStandardMark,
      //         max: val.itemMaxMark,
      //         plus: val.maxPlus,
      //         sub: val.maxSub,
      //         boundary: val.boundary,
      //         plusstep: val.plusstepmark,
      //         substep: val.substepmark,
      //       })
      //     }
      //     if (val.assessItem === "平均结警时长") {
      //       this.item3.push({
      //         weight: val.itemWeight,
      //         standardmark: val.itemStandardMark,
      //         max: val.itemMaxMark,
      //         plus: val.maxPlus,
      //         sub: val.maxSub,
      //         boundary: val.boundary,
      //         plusstep: val.plusstepmark,
      //         substep: val.substepmark,
      //       })
      //     }
      //     if (val.assessItem === "执法总量") {
      //       this.item4.push({
      //         weight: val.itemWeight,
      //         standardmark: val.itemStandardMark,
      //         max: val.itemMaxMark,
      //         plus: val.maxPlus,
      //         sub: val.maxSub,
      //         boundary: val.boundary,
      //         plusstep: val.plusstepmark,
      //         substep: val.substepmark,
      //       })
      //     }
      //     if (val.assessItem === "勤务巡逻里程") {
      //       this.item5.push({
      //         weight: val.itemWeight,
      //         standardmark: val.itemStandardMark,
      //         max: val.itemMaxMark,
      //         plus: val.maxPlus,
      //         sub: val.maxSub,
      //         boundary: val.boundary,
      //         plusstep: val.plusstepmark,
      //         substep: val.substepmark
      //       })
      //     }
      //   }
      // })
    },
    [CRUD.HOOK.beforeSubmit]() {
      // const val1 = parseFloat(this.form.dutytimeMark) - parseFloat(this.item1[0].boundary)
      // if (val1 > 0) {
      //   this.form.dutytimeMark = parseFloat(this.item1[0].standardmark) - parseFloat(val1 * this.item1[0].substep)
      //   if (parseFloat(this.form.dutytimeMark) < 0) {
      //     this.form.dutytimeMark = 0
      //   }
      // } else {
      //   this.form.dutytimeMark = parseFloat(this.item1[0].standardmark) - parseFloat(val1 * this.item1[0].plusstep)
      //   if (parseFloat(this.form.dutytimeMark) > parseFloat(this.item1[0].max)) {
      //     this.form.dutytimeMark = parseFloat(this.item1[0].max)
      //   }
      // }
      // const val2 = parseFloat(this.form.patorllengthMark) - parseFloat(this.item5[0].boundary)
      // if (val2 > 0) {
      //   this.form.patorllengthMark = parseFloat(this.item5[0].standardmark) + parseFloat(val2 * this.item5[0].plusstep)
      //   if (parseFloat(this.form.patorllengthMark) > parseFloat(this.item5[0].max)) {
      //     this.form.patorllengthMark = parseFloat(this.item5[0].max)
      //   }
      // } else {
      //   this.form.patorllengthMark = parseFloat(this.item5[0].standardmark) + parseFloat(val2 * this.item5[0].substep)
      //   if (parseFloat(this.form.patorllengthMark) < 0) {
      //     this.form.patorllengthMark = 0
      //   }
      // }
      // const val3 = parseFloat(this.form.processtimeMark) - parseFloat(this.item3[0].boundary)
      // if (val3 > 0) {
      //   this.form.processtimeMark = parseFloat(this.item3[0].standardmark) - parseFloat(val3 * this.item3[0].substep)
      //   if (parseFloat(this.form.processtimeMark) < 0) {
      //     this.form.processtimeMark = 0
      //   }
      // } else {
      //   this.form.processtimeMark = parseFloat(this.item3[0].standardmark) - parseFloat(val3 * this.item3[0].plusstep)
      //   if (parseFloat(this.form.processtimeMark) > parseFloat(this.item3[0].max)) {
      //     this.form.processtimeMark = parseFloat(this.item3[0].max)
      //   }
      // }
      // const val4 = parseFloat(this.form.volunteerMark) - parseFloat(this.item2[0].boundary)
      // if (val4 > 0) {
      //   this.form.volunteerMark = parseFloat(this.item2[0].standardmark) + parseFloat(val4 * this.item2[0].plusstep)
      //   if (parseFloat(this.form.volunteerMark) > parseFloat(this.item2[0].max)) {
      //     this.form.volunteerMark = parseFloat(this.item2[0].max)
      //   }
      // } else {
      //   this.form.volunteerMark = parseFloat(this.item2[0].standardmark) + parseFloat(val4 * this.item2[0].substep)
      //   if (parseFloat(this.form.volunteerMark) < 0) {
      //     this.form.volunteerMark = 0
      //   }
      // }
      // const val5 = parseFloat(this.form.totalProcessMark) - parseFloat(this.item4[0].boundary)
      // if (parseFloat(val5) > 0) {
      //   this.form.totalProcessMark = parseFloat(this.item4[0].standardmark) + parseFloat(val5 * this.item4[0].plusstep)
      //   if (parseFloat(this.form.totalProcessMark) > parseFloat(this.item4[0].max)) {
      //     this.form.totalProcessMark = parseFloat(this.item4[0].max)
      //   }
      // } else {
      //   this.form.totalProcessMark = parseFloat(this.item4[0].standardmark) + parseFloat(val5 * this.item4[0].substep)
      //   if (parseFloat(this.form.totalProcessMark) < 0) {
      //     this.form.totalProcessMark = 0
      //   }
      // }

      // for (var val of this.person) {
      //   if (this.form.policeId === val.usercode) {
      //     this.form.organid = val.departid
      //   }
      // }
      // let alertDate = new Date(this.form.markDate);

      // for (var val of this.evaluation) {
      //   if (this.form.policeId == val.policeid) {
      //     let evaldate = new Date(val.markDate)
      //     if (alertDate.getFullYear() == evaldate.getFullYear()) {
      //       if (alertDate.getMonth() == evaldate.getMonth()) {
      //         this.form.evaluationMark = val.totalmark
      //       }
      //     }
      //   }
      // }

      // this.form.totalMark = parseFloat(this.form.totalProcessMark) * parseFloat(this.item4[0].weight)
      //   + parseFloat(this.form.volunteerMark) * parseFloat(this.item2[0].weight)
      //   + parseFloat(this.form.processtimeMark) * parseFloat(this.item3[0].weight)
      //   + parseFloat(this.form.patorllengthMark) * parseFloat(this.item5[0].weight)
      //   + parseFloat(this.form.dutytimeMark) * parseFloat(this.item1[0].weight)
      //   + parseFloat(this.form.evaluationMark) * 0.3


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
      })
    },
    getEvaluationAll() {
      crudEvaluationMark.getAll().then(res => {
        this.evaluation = res.content
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
    this.getAllitem()
    this.getPersonAll()
    // this.getDepartAll()
    this.getEvaluationAll()
    crudTCfgDepartment.getTree(false).then(res => {
      this.departments = res
    }).catch(e => {
      console.error(e)
    })

    const policeUserCode = '051928'
    const rankType = '1'
    reportApi.queryInfo(policeUserCode)
    reportApi.queryPhoto(policeUserCode)
    reportApi.peccencyDynamic(policeUserCode, rankType)
    reportApi.compositeScoreRank(policeUserCode, rankType)
    reportApi.singleScoreRank(policeUserCode)
    reportApi.compositeInfo(policeUserCode)
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