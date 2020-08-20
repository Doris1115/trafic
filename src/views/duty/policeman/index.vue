<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">警号</label>
        <el-input v-model="query.siren" clearable placeholder="警号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">性别</label>
        <el-input v-model="query.sex" clearable placeholder="性别" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">电话</label>
        <el-input v-model="query.phone" clearable placeholder="电话" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">姓名</label>
        <el-input v-model="query.name" clearable placeholder="姓名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">编制类型</label>
        <el-input v-model="query.preparationtype" clearable placeholder="编制类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">所属单位</label>
        <el-input v-model="query.departid" clearable placeholder="所属单位" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">证件类型</label>
        <el-input v-model="query.idtype" clearable placeholder="证件类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">县</label>
        <el-input v-model="query.country" clearable placeholder="县" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">手台组号</label>
        <el-input v-model="query.handsetsgroup" clearable placeholder="手台组号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">地区</label>
        <el-input v-model="query.region" clearable placeholder="地区" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">省</label>
        <el-input v-model="query.province" clearable placeholder="省" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">特勤级别</label>
        <el-input v-model="query.secretlevel" clearable placeholder="特勤级别" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">手台呼/代号</label>
        <el-input v-model="query.handsetscode" clearable placeholder="手台呼/代号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="用户编号">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="移动电话">
            <el-input v-model="form.mobilephone" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警号">
            <el-input v-model="form.siren" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="form.qq" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="form.idno" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="手台">
            <el-input v-model="form.handsets" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="编制类型">
            <el-input v-model="form.preparationtype" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="所属单位">
            <el-input v-model="form.departid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="生日">
            <el-input v-model="form.birthday" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="现任职务">
            <el-input v-model="form.profession" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警用装备">
            <el-input v-model="form.policeequipment" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input v-model="form.idtype" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="县">
            <el-input v-model="form.country" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="办公电话">
            <el-input v-model="form.officephone" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.address" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="手台组号">
            <el-input v-model="form.handsetsgroup" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="地区">
            <el-input v-model="form.region" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="省">
            <el-input v-model="form.province" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="特勤级别">
            <el-input v-model="form.secretlevel" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="手台呼/代号">
            <el-input v-model="form.handsetscode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警衔">
            <el-input v-model="form.ranks" style="width: 370px;" />
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
        <el-table-column prop="usercode" label="用户编号" />
        <el-table-column prop="mobilephone" label="移动电话" />
        <el-table-column prop="siren" label="警号" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="qq" label="QQ" />
        <el-table-column prop="idno" label="证件号码" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="handsets" label="手台" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="preparationtype" label="编制类型" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="departid" label="所属单位" />
        <el-table-column prop="birthday" label="生日">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.birthday) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profession" label="现任职务" />
        <el-table-column prop="policeequipment" label="警用装备" />
        <el-table-column prop="idtype" label="证件类型" />
        <el-table-column prop="country" label="县" />
        <el-table-column prop="officephone" label="办公电话" />
        <el-table-column prop="address" label="详细地址" />
        <el-table-column prop="handsetsgroup" label="手台组号" />
        <el-table-column prop="region" label="地区" />
        <el-table-column prop="province" label="省" />
        <el-table-column prop="secretlevel" label="特勤级别" />
        <el-table-column prop="email" label="电子邮箱" />
        <el-table-column prop="handsetscode" label="手台呼/代号" />
        <el-table-column prop="ranks" label="警衔" />
        <el-table-column v-permission="['admin','person:edit','person:del']" label="操作" width="150px" align="center">
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
import crudPerson from '@/api/duty/policeman'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { usercode: null, mobilephone: null, siren: null, sex: null, qq: null, idno: null, phone: null, handsets: null, name: null, preparationtype: null, remark: null, departid: null, birthday: null, profession: null, policeequipment: null, idtype: null, country: null, officephone: null, address: null, handsetsgroup: null, region: null, province: null, secretlevel: null, email: null, handsetscode: null, ranks: null }
export default {
  name: 'Person',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/policeman', url: 'api/person', sort: 'usercode,desc', crudMethod: { ...crudPerson }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'person:add'],
        edit: ['admin', 'person:edit'],
        del: ['admin', 'person:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'siren', display_name: '警号' },
        { key: 'sex', display_name: '性别' },
        { key: 'phone', display_name: '电话' },
        { key: 'name', display_name: '姓名' },
        { key: 'preparationtype', display_name: '编制类型' },
        { key: 'departid', display_name: '所属单位' },
        { key: 'idtype', display_name: '证件类型' },
        { key: 'country', display_name: '县' },
        { key: 'handsetsgroup', display_name: '手台组号' },
        { key: 'region', display_name: '地区' },
        { key: 'province', display_name: '省' },
        { key: 'secretlevel', display_name: '特勤级别' },
        { key: 'handsetscode', display_name: '手台呼/代号' }
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
