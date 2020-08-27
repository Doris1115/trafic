<template>
  <div class="app-container">
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <label class="el-form-item-label">名称:</label>
        <el-input
          v-model="query.speedLimitName"
          clearable
          placeholder="名称"
          style="width:180px"
          class="filger-item"
          @keyup.13.native="crud.toQuery"
        />
        <label class="el-form-item-label">起止时间:</label>
        <el-date-picker
          v-model="query.indate"
          class="filter-item"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          clearable
          format="yyyy-MM-dd"
          style="width:280px;overflow: hidden"
          @change="changeDataRangeValueHandler"
        />
        <label class="el-form-item-label">号牌号码:</label>
        <el-input
          v-model="query.hphm"
          clearable
          placeholder="号牌号码"
          class="filter-item"
          style="width:160px"
          @keyup.enter.native="crud.toQuery"
        />
        <label class="el-form-item-label">号牌种类:</label>
        <el-select
          v-model="query.hpzl"
          clearable
          filterable
          class="filter-item"
          style="width:160px"
        >
          <el-option
            v-for="item in dict.plate_class"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <crudOperation :permission="permission" />
      <!-- 表单组件 -->
      <el-dialog
        :visible.sync="crud.status.cu > 0"
        :close-on-click-modal="false"
        :before-close="crud.cancelCU"
        :title="crud.status.title"
        width="860px"
        top="5vh"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          :inline="true"
          size="small"
          label-width="100px"
        >
          <el-form-item label="名称" prop="speedLimitName">
            <el-input v-model="form.speedLimitName" type="String" style="width:280px" clearable />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!-- 表格渲染 -->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width:100%"
        max-height="600"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column prop="speedLimitName" label="名称" width="200" fixed />
        <el-table-column prop="originName" label="起点" />
        <el-table-column prop="targetName" label="终点" />
        <el-table-column prop="distance" label="距离" />
        <el-table-column prop="speedLimit" label="限速值" />
        <el-table-column prop="speedLimitReverse" label="反向限速值" />
      </el-table>
      <pagination />
    </div>
  </div>
</template>
<script>
// import crudSite from '@/api/site'
import crudRoadLinksSpeedLimit from '@/api/roadLinksSpeedLimit'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import siteApi from '@/api/site'

const defaultForm = {
  speedLimitId: null,
  speedLimitName: null,
  speedLimitReverse: null,
  sameAsPositive: '1',
  target: null,
  origin: null,
  speedLimit: null,
  distance: null
}

export default {
  name: 'TestMenu',
  components: {
    rrOperation, crudOperation, pagination
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['yes_or_no'],
  cruds() {
    return CRUD({
      idField: 'speedLimitId',
      title: '',
      url: 'api/roadLinksSpeedLimit',
      sort: 'updatedBy,desc',
      crudMethod: { ...crudRoadLinksSpeedLimit }
    })
  },
  data() {
    return {
      departments: [],
      checkedDevice: [],
      rules: {
        hphm: [
          { required: true, message: '号牌号码不能为空', trigger: 'blur' }
        ],
        hpzl: [
          { required: true, message: '号牌种类不能为空', trigger: 'blur' }
        ]
      },
      permission: {
        add: ['admin', 'roadLinksSpeedLimit:add'],
        edit: ['admin', 'roadLinksSpeedLimit:edit'],
        del: ['admin', 'roadLinksSpeedLimit:del']
      },
      queryTypeOptions: [
        { key: 'speedLimitName', display_name: '名称' },
        { key: 'target', display_name: '终点监控点设备编码' },
        { key: 'origin', display_name: '起点监控设备编号' }
      ],
      sites: []
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scope>
.vue-treeselect__control {
  height: 26px;
  font-size: 13px;
  overflow: hidden;
}
.el-range-editor--small .el-range-separator {
  z-index: 999;
}
</style>
