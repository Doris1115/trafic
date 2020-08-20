<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">用户编号</label> -->
        <el-input v-model="query.usercode" clearable placeholder="用户编号" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">姓名</label> -->
        <el-input v-model="query.name" clearable placeholder="姓名" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">现任职务</label> -->
        <!-- <el-input v-model="query.profession" clearable placeholder="现任职务" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <el-select v-model="query.profession" clearable filterable placeholder="现任职务" class="filter-item">
          <el-option v-for="item in dict.profession" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
        <!-- <label class="el-form-item-label">所属单位</label> -->
        <!-- <el-input v-model="query.departid" clearable placeholder="所属单位" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" /> -->
        <treeselect class="filter-item" v-model="query.departid" :options="departments" :deleteRemoves="false"
          noChildrenText="无节点" style="width: 370px" placeholder="管辖部门" />
        <!-- <label class="el-form-item-label">警号</label> -->
        <el-input v-model="query.siren" clearable placeholder="警号" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="880px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
          <el-form-item label="用户编号" prop="usercode">
            <el-input v-model="form.usercode" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="现任职务" prop="profession">
            <el-select v-model="form.profession" filterable placeholder="请选择" style="width: 300px;">
              <el-option v-for="item in dict.profession" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属单位" prop="departid">
              <treeselect class="filter-item" v-model="form.departid" :options="departments" :deleteRemoves="false"
              noChildrenText="无节点" style="width: 300px" placeholder="管辖部门" />
          </el-form-item>
          <el-form-item label="警号" prop="siren">
            <el-input v-model="form.siren" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="手台">
            <el-input v-model="form.handsets" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="手台呼/代号">
            <el-input v-model="form.handsetscode" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="特勤级别">
            <el-select v-model="form.secretlevel" filterable placeholder="请选择" style="width: 300px;">
              <el-option v-for="item in dict.secret_level" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="移动电话">
            <el-input v-model="form.mobilephone" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" filterable placeholder="请选择" style="width: 300px;">
              <el-option v-for="item in dict.gender" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker v-model="form.birthday" type="datetime" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="证件类型" prop="idtype">
            <el-select v-model="form.idtype" filterable placeholder="请选择" style="width: 300px;">
              <el-option v-for="item in dict.credentialType" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="idno">
            <el-input v-model="form.idno" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="省">
            <el-input v-model="form.province" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="地区">
            <el-input v-model="form.region" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="县">
            <el-input v-model="form.country" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.address" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="form.qq" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="办公电话">
            <el-input v-model="form.officephone" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="手台组号">
            <el-input v-model="form.handsetsgroup" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="警衔">
            <el-select v-model="form.ranks" filterable placeholder="请选择" style="width: 300px;">
              <el-option v-for="item in dict.rank" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="编制类型">
            <el-select v-model="form.preparationtype" filterable placeholder="请选择" style="width: 300px;">
              <el-option v-for="item in dict.prepation_type" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="警用装备">
            <el-input v-model="form.policeequipment" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width: 300px;" />
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
        <!-- <el-table-column prop="usercode" label="用户编号" /> -->
        <el-table-column prop="name" label="姓名" width="100px" />
        <el-table-column prop="siren" label="警号" width="100px" />
        <el-table-column prop="profession" label="现任职务">
          <template slot-scope="scope">
            {{ dict.label.profession[scope.row.profession] }}
          </template>
        </el-table-column>
        <el-table-column prop="department.departname" label="所属单位" />
        <!-- <el-table-column prop="handsets" label="手台" /> -->
        <el-table-column prop="handsetscode" label="手台呼/代号" />
        <!-- <el-table-column prop="secretlevel" label="特勤级别" /> -->
        <el-table-column prop="mobilephone" label="移动电话" />
        <!-- <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            {{ dict.label.gender[scope.row.sex] }}
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="birthday" label="生日">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.birthday) }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="idtype" label="证件类型">
          <template slot-scope="scope">
            {{ dict.label.credentialType[scope.row.idtype] }}
          </template>
        </el-table-column> -->
        <el-table-column prop="idno" label="证件号码" />
        <!-- <el-table-column prop="province" label="省" />
        <el-table-column prop="region" label="地区" />
        <el-table-column prop="country" label="县" />
        <el-table-column prop="address" label="详细地址" /> -->
        <!-- <el-table-column prop="email" label="电子邮箱" /> -->
        <!-- <el-table-column prop="qq" label="QQ" />
        <el-table-column prop="phone" label="电话" /> -->
        <!-- <el-table-column prop="officephone" label="办公电话" />
        <el-table-column prop="handsetsgroup" label="手台组号" />
        <el-table-column prop="ranks" label="警衔" />
        <el-table-column prop="preparationtype" label="编制类型" />
        <el-table-column prop="policeequipment" label="警用装备" /> -->
        <!-- <el-table-column prop="remark" label="备注" /> -->
        <el-table-column v-permission="['admin','tSerPerson:edit','tSerPerson:del']" label="操作" width="150px"
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
import crudTSerPerson from '@/api/duty/tSerPerson'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import crudTCfgDepartment from '@/api/duty/tCfgDepartment'
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'


const defaultForm = { usercode: null, name: null, profession: null, departid: null, siren: null, handsets: null, handsetscode: null, secretlevel: null, mobilephone: null, sex: null, birthday: null, idtype: null, idno: null, province: null, region: null, country: null, address: null, email: null, qq: null, phone: null, officephone: null, handsetsgroup: null, ranks: null, preparationtype: null, policeequipment: null, remark: null }
export default {
  name: 'TSerPerson',
  components: { Treeselect, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['gender', 'credentialType', 'rank', 'prepation_type', 'secret_level', 'profession'],
  cruds() {
    return CRUD({ title: '警员', url: 'api/tSerPerson', sort: 'name,desc', crudMethod: { ...crudTSerPerson }, idField: "usercode" })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'tSerPerson:add'],
        edit: ['admin', 'tSerPerson:edit'],
        del: ['admin', 'tSerPerson:del']
      },
      rules: {
        usercode: [
          { required: true, message: '用户编号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        profession: [
          { required: true, message: '现任职务不能为空', trigger: 'blur' }
        ],
        departid: [
          { required: true, message: '所属单位不能为空', trigger: 'blur' }
        ],
        siren: [
          { required: true, message: '警号不能为空', trigger: 'blur' }
        ],
        idtype: [
          { required: true, message: '证件类型不能为空', trigger: 'blur' }
        ],
        idno: [
          { required: true, message: '证件号码不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'usercode', display_name: '用户编号' },
        { key: 'name', display_name: '姓名' },
        { key: 'profession', display_name: '现任职务' },
        { key: 'departid', display_name: '所属单位' },
        { key: 'siren', display_name: '警号' }
      ],
      departments: [],
      // department: [],
      // departoption: []
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    // getDepartAll() {
    //   crudTCfgDepartment.getAll().then(res => {
    //     this.department = res.content
    //     for (var val of this.department) {
    //       if (val.departid === '430300000000') {
    //         this.departoption.push({ label: val.departname, id: val.departid, children: null })
    //       }
    //     }
    //   })
    // },
    // loadOptions({ action, parentNode, callback }) {
    //   if (action === LOAD_CHILDREN_OPTIONS) {
    //     parentNode.children = []
    //     for (var val of this.department) {
    //       if (val.classcode === parentNode.id) {
    //         var count = "0"
    //         for (var va of this.department) {
    //           if (va.classcode === val.departid)
    //             count = "1"
    //         }
    //         if (count === "0") {
    //           parentNode.children.push({ label: val.departname, id: val.departid, children: true })
    //         }
    //         else
    //           parentNode.children.push({ label: val.departname, id: val.departid, children: null })
    //       }
    //     }
    //     callback()
    //   }
    // },
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
