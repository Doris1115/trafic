<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">地点名称</label>
        <el-input v-model="query.sitename" clearable placeholder="地点名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">地点编号</label>
        <el-input v-model="query.sitenum" clearable placeholder="地点编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">组织编码</label>
        <el-input v-model="query.orgcode" clearable placeholder="组织编码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.ddms"
          start-placeholder="ddmsStart"
          end-placeholder="ddmsStart"
          class="date-item"
        />
        <date-range-picker
          v-model="query.longitude"
          start-placeholder="longitudeStart"
          end-placeholder="longitudeStart"
          class="date-item"
        />
        <date-range-picker
          v-model="query.latituutyde"
          start-placeholder="latituutydeStart"
          end-placeholder="latituutydeStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="地点名称" prop="sitename">
            <el-input v-model="form.sitename" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="地点米数">
            <el-input v-model="form.ddms" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="form.longitude" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="不知道">
            <el-input v-model="form.lddm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="地点编号" prop="sitenum">
            <el-input v-model="form.sitenum" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="维度" prop="latituutyde">
            <el-input v-model="form.latituutyde" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="组织编码" prop="orgcode">
            <el-input v-model="form.orgcode" style="width: 370px;" />
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
        <el-table-column prop="sitename" label="地点名称" />
        <el-table-column prop="ddms" label="地点米数" />
        <el-table-column prop="longitude" label="经度" />
        <el-table-column prop="lddm" label="不知道" />
        <el-table-column prop="sitenum" label="地点编号" />
        <el-table-column prop="latituutyde" label="维度" />
        <el-table-column prop="orgcode" label="组织编码" />
        <el-table-column v-permission="['admin','site:edit','site:del']" label="操作" width="150px" align="center">
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
import crudSite from '@/api/site'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { sitename: null, ddms: null, longitude: null, lddm: null, sitenum: null, latituutyde: null, orgcode: null }
export default {
  name: 'Site',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/back/site', url: 'api/site', sort: 'sitenum,desc', crudMethod: { ...crudSite }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'site:add'],
        edit: ['admin', 'site:edit'],
        del: ['admin', 'site:del']
      },
      rules: {
        sitename: [
          { required: true, message: '地点名称不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '经度不能为空', trigger: 'blur' }
        ],
        sitenum: [
          { required: true, message: '地点编号不能为空', trigger: 'blur' }
        ],
        latituutyde: [
          { required: true, message: '维度不能为空', trigger: 'blur' }
        ],
        orgcode: [
          { required: true, message: '组织编码不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'sitename', display_name: '地点名称' },
        { key: 'sitenum', display_name: '地点编号' },
        { key: 'orgcode', display_name: '组织编码' }
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
