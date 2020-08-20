<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">规则名称</label> -->
        <el-input v-model="query.gzmc" clearable placeholder="规则名称" style="width: 185px;" class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <el-date-picker v-model="query.kssj" placeholder="开始时间" type="date" style="width: 185px;" class="filter-item" />

        <el-date-picker v-model="query.jssj" placeholder="结束时间" type="date" style="width: 185px;" class="filter-item" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission">
        
      </crudOperation>
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
          <!-- <el-form-item label="规则编号">
            <el-input v-model="form.gzbh" style="width: 370px;" />
          </el-form-item> -->
          <el-form-item label="规则名称">
            <el-input v-model="form.gzmc" style="width: 270px;" />
          </el-form-item>
          <!-- <el-form-item label="规则编号">
            <el-input v-model="form.gwbh" style="width: 270px;" />
          </el-form-item> -->
          <el-form-item label="开始时间">
            <el-date-picker v-model="form.kssj" type="date" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="form.jssj" type="date" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="勤务开始时间">
            <el-time-select v-model="form.postStartTime" :picker-options="{start: '00:00',step: '00:15', end: '23:59' }"
              style="width: 270px;" />
          </el-form-item>
          <el-form-item label="勤务结束时间">
            <el-time-select v-model="form.postEndTime"
              :picker-options="{start: '00:00',step: '00:15', end: '23:59', minTime: form.postStartTime }"
              style="width: 270px;" />
          </el-form-item>
          <el-form-item label="勤务类型">
            <!-- <el-input v-model="form.qwlx" style="width: 370px;" /> -->
            <el-select v-model="form.qwlx" filterable placeholder="勤务类型" style="width: 270px;">
              <el-option v-for="item in dict.duty_job_type" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="室内勤务" v-if="form.qwlx === '360501'">
            <el-select v-model="form.gwbh" multiple collapse-tags filterable placeholder="室内勤务" style="width: 270px;">
              <el-option v-for="item in insidePosts" :key="item.zbgwbh" :label="item.zqgwmc" :value="item.zbgwbh" />
            </el-select>
          </el-form-item>
          <el-form-item label="室外勤务" v-if="form.qwlx === '360502'">
            <el-select v-model="form.gwbh" multiple collapse-tags filterable placeholder="室外勤务" style="width: 270px;">
              <el-option v-for="item in outsidePosts" :key="item.zqgwbh" :label="item.zqgwmc" :value="item.zqgwbh" />
            </el-select>
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
        <!-- <el-table-column prop="gzbh" label="规则编号" /> -->
        <el-table-column prop="gzmc" label="规则名称" />
        <!-- <el-table-column prop="gwbh" label="岗位编号" /> -->
        <el-table-column prop="kssj" label="开始时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.kssj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="jssj" label="结束时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.jssj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="postStartTime" label="勤务开始时间">
        </el-table-column>
        <el-table-column prop="postEndTime" label="勤务结束时间">
        </el-table-column>
        <el-table-column prop="qwlx" label="勤务类型">
          <template slot-scope="scope">
            {{ dict.label.duty_job_type[scope.row.qwlx] }}
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','tSevRule:edit','tSevRule:del']" label="操作" width="150px"
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
import crudTSevRule from '@/api/duty/tSevRule'
import insidePostApi from '@/api/duty/tSevInsidePost'
import outsidePostApi from '@/api/duty/tSevOutsidePost'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { gzbh: null, gzmc: null, gwbh: null, kssj: null, jssj: null, qwlx: null }
export default {
  name: 'TSevRule',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['duty_job_type'],
  cruds() {
    return CRUD({ idField: 'gzbh', title: '排班规则', url: 'api/tSevRule', sort: 'gzbh,desc', crudMethod: { ...crudTSevRule } })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'tSevRule:add'],
        edit: ['admin', 'tSevRule:edit'],
        del: ['admin', 'tSevRule:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'gzmc', display_name: '规则名称' }
      ],
      outsidePosts: [],
      insidePosts: []
    }
  },
  created() {
    insidePostApi.getAll().then(res => {
      this.insidePosts = res.content
    }).catch(err => {
      console.log(err)
    })
    outsidePostApi.getAll().then(res => {
      this.outsidePosts = res.content
    }).catch(err => {
      console.log(err)
    })

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
