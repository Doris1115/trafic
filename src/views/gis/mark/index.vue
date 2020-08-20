<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">标志类型</label>
        <el-input v-model="query.marktype" clearable placeholder="标志类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">标志名称</label>
        <el-input v-model="query.markname" clearable placeholder="标志名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker
          v-model="query.xpoint"
          start-placeholder="xpointStart"
          end-placeholder="xpointStart"
          class="date-item"
        />
        <date-range-picker
          v-model="query.ypoint"
          start-placeholder="ypointStart"
          end-placeholder="ypointStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="标志标识">
            <el-input v-model="form.markid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="关系标识">
            <el-input v-model="form.relationid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标志顺序">
            <el-input v-model="form.markdesc" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="form.xpoint" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否显示">
            <el-radio v-model="form.isshow" v-for="item in dict.yes_or_no" :key="item.id" :label="item.value">{{ item.label }}</el-radio>
          </el-form-item>
          <el-form-item label="维度">
            <el-input v-model="form.ypoint" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="原经度">
            <el-input v-model="form.oldxpoint" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="未知">
            <el-input v-model="form.gxbj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="原维度">
            <el-input v-model="form.oldypoint" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标志类型">
            <el-select v-model="form.marktype" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.mark_type"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="未知数组">
            <el-input v-model="form.markarray" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标志名称">
            <el-input v-model="form.markname" style="width: 370px;" />
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
        <el-table-column prop="markid" label="标志标识" />
        <el-table-column prop="relationid" label="关系标识" />
        <el-table-column prop="markdesc" label="标志顺序" />
        <el-table-column prop="xpoint" label="经度" />
        <el-table-column prop="isshow" label="是否显示">
          <template slot-scope="scope">
            {{ dict.label.yes_or_no[scope.row.isshow] }}
          </template>
        </el-table-column>
        <el-table-column prop="ypoint" label="维度" />
        <el-table-column prop="oldxpoint" label="原经度" />
        <el-table-column prop="gxbj" label="未知" />
        <el-table-column prop="oldypoint" label="原维度" />
        <el-table-column prop="marktype" label="标志类型">
          <template slot-scope="scope">
            {{ dict.label.mark_type[scope.row.marktype] }}
          </template>
        </el-table-column>
        <el-table-column prop="markarray" label="未知数组" />
        <el-table-column prop="markname" label="标志名称" />
        <el-table-column v-permission="['admin','gisMark:edit','gisMark:del']" label="操作" width="150px" align="center">
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
import crudGisMark from '@/api/gis/gisMark'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { markid: null, relationid: null, markdesc: null, xpoint: null, isshow: null, ypoint: null, oldxpoint: null, gxbj: null, oldypoint: null, marktype: null, markarray: null, markname: null }
export default {
  name: 'GisMark',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['yes_or_no', 'mark_type'],
  cruds() {
    return CRUD({ title: 'v1/api/gis/mark', url: 'api/gisMark', sort: 'markid,desc', crudMethod: { ...crudGisMark }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'gisMark:add'],
        edit: ['admin', 'gisMark:edit'],
        del: ['admin', 'gisMark:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'marktype', display_name: '标志类型' },
        { key: 'markname', display_name: '标志名称' }
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
