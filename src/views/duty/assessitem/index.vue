<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">考核项目</label>
        <el-input v-model="query.assessItem" clearable placeholder="考核项目" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="1000px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="考核项目" >
            <el-select v-model="form.assessItem" filterable placeholder="请选择" style="width: 370px;">
              <el-option
                v-for="item in dict.assessItem"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="项目权重">
            <el-input v-model="form.itemWeight" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目标准分" label-width="100">
            <el-input v-model="form.itemStandardMark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目最高分" label-width="100">
            <el-input v-model="form.itemMaxMark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="最大减分">
            <el-input v-model="form.maxSub" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="最大加分">
            <el-input v-model="form.maxPlus" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="临界条件">
            <el-input v-model="form.boundary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="加分步长">
            <el-input v-model="form.plusstepmark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="减分步长">
            <el-input v-model="form.substepmark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input v-model="form.itemDescription" :rows="3" type="textarea" style="width: 800px;" />
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
        <el-table-column prop="assessItem" label="考核项目">
          <template slot-scope="scope">
            {{ dict.label.assessItem[scope.row.assessItem] }}
          </template>
        </el-table-column>
       <!--  <el-table-column label="项目描述" width="100px">
          <template slot-scope="scope">
            <el-button size="middle" type="text"@click="info(scope.row.assessItem)">查看详情</el-button>
          </template>
        </el-table-column>-->
        <el-table-column prop="itemWeight" label="项目权重" />
        <el-table-column prop="itemStandardMark" label="项目标准分" />
        <el-table-column prop="itemMaxMark" label="项目最高分" />
        <el-table-column prop="maxSub" label="最大减分值" />
        <el-table-column prop="maxPlus" label="最大加分值" />
        <el-table-column prop="boundary" label="临界条件" />
        <el-table-column prop="plusstepmark" label="加分步长" />
        <el-table-column prop="substepmark" label="减分步长" />
        <el-table-column v-permission="['admin','assess:edit','assess:del']" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--<el-dialog :visible.sync="dialog" title="项目详情" append-to-body top="300px" width="85%">
        <pre v-highlightjs="detailinfo"><code class="java" /></pre>
      </el-dialog> -->
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudAssess from '@/api/duty/assess'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { assessItem: null, itemDescription: null, itemWeight: null, itemStandardMark: null, itemMaxMark: null, maxSub: null, maxPlus: null, boundary: null, plusstepmark: null, substepmark: null, flag: null }
export default {
  name: 'Assess',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['assessItem'],
  cruds() {
    return CRUD({ title: '考核项目', url: 'api/duty/assess', sort: 'assessItem,desc', crudMethod: { ...crudAssess }})
  },
  data() {
    return {
      detailinfo: '',
      dialog: false,
      permission: {
        add: ['admin', 'assess:add'],
        edit: ['admin', 'assess:edit'],
        del: ['admin', 'assess:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'assessItem', display_name: '考核项目' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },

    info(assessItem) {
      this.dialog = true
      crudAssess.getAll().then(res => {
        for(var val of res.content){
          if(assessItem === val.assessItem){
            this.detailinfo = val.itemDescription
          }
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
