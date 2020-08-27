<template>
  <div class="app-container">
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <label class="el-form-item-label">限行规则名称:</label>
        <el-input
          v-model="query.restrictionName"
          clearable
          placeholder="限行规则名称"
          class="filter-item"
          style="width:200px"
        />
        <rrOperation :crud="crud" />
      </div>
      <crudOperation :permission="permission" />
      <!-- 表格渲染 -->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width:100%"
      >
        <el-table-column fixed label="图表" width="60">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="showChart(scope.row)">
              <svg-icon icon-class="chart" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="restrictionName" label="限行规则名称" />
        <el-table-column prop="indateStart" label="有效期" :formatter="formatterIndate" />
        <el-table-column prop="cause" label="布控原因">
          <template slot-scope="scope">{{ dict.label.restriction_cause[scope.row.cause] }}</template>
        </el-table-column>
        <el-table-column prop="trafficPermit" label="通行证类型">
          <template
            slot-scope="scope"
          >{{ dict.label.restriction_traffic_permit [scope.row.trafficPermit] }}</template>
        </el-table-column>
      </el-table>
      <pagination />
    </div>
  </div>
</template>
<script>
// import crudSite from '@/api/site'
import crudRestriction from '@/api/restriction'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

export default {
  name: 'TestMenu',
  components: {
    rrOperation, crudOperation, pagination
  },
  mixins: [presenter(), header(), form(), crud()],
  dicts: ['restriction_cause', 'vehicle_type', 'restriction_traffic_permit', 'restriction_cycle_type', 'restriction_type', 'illegal_type', 'vehicle_type_xiangtan'],
  cruds() {
    return CRUD({
      idField: 'restrictionId',
      title: '',
      url: 'api/restriction',
      sort: 'restrictionId,desc',
      crudMethod: { ...crudRestriction }
    })
  },
  data() {
    return {
      key: 'this is a test Menu',
      name: '',
      permission: {
        add: ['admin', 'restriction:add'],
        edit: ['admin', 'restriction:edit'],
        del: ['admin', 'restriction:del']
      }
    }
  },
  mounted() {
    console.log('crud', this.crud)
  },
  methods: {
    showChart(row) {
      console.log('row', row)
    },
    formatterIndate(row, column) {
      return this.parseTime(row.indateStart, '{y}-{m}-{d}')
    }
  }
}
</script>
