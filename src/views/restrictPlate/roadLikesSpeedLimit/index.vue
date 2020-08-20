<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">名称</label> -->
        <el-input v-model="query.speedLimitName" clearable placeholder="名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">终点监控点设备编码</label> -->
        <!-- <el-input v-model="query.target" clearable placeholder="终点" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-select v-model="query.origin" filterable :clearable="true" placeholder="起点" class="filter-item">
          <el-option
            v-for="item in sites "
            :key="item.sitenum"
            :label="item.sitename"
            :value="item.sitenum"
          />
        </el-select>
        <el-select v-model="query.target" filterable :clearable="true" placeholder="终点" class="filter-item">
          <el-option
            v-for="item in sites "
            :key="item.sitenum"
            :label="item.sitename"
            :value="item.sitenum"
          />
        </el-select>
        <!-- <label class="el-form-item-label">起点监控设备编号</label> -->
        <!-- <el-input v-model="query.origin" clearable placeholder="起点" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="440px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
          <el-form-item label="名称" prop="speedLimitName">
            <el-input type="String" v-model="form.speedLimitName" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="起点" prop="origin">
            <!-- <el-input type="String" v-model="form.origin" style="width: 370px;" /> -->
            <el-select v-model="form.origin" filterable :clearable="true" placeholder="起点" class="filter-item">
              <el-option
                v-for="item in sites "
                :key="item.sitenum"
                :label="item.sitename"
                :value="item.sitenum"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="终点" prop="target">
            <!-- <el-input type="String" v-model="form.target" style="width: 370px;" /> -->
            <el-select v-model="form.target" filterable :clearable="true" placeholder="起点" class="filter-item">
              <el-option
                v-for="item in sites "
                :key="item.sitenum"
                :label="item.sitename"
                :value="item.sitenum"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="距离(KM)" prop="distance">
            <el-input type="String" v-model="form.distance" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="限速(KM/时)" prop="speedLimit">
            <el-input type="String" v-model="form.speedLimit" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="反向限速相同" prop="sameAsPositive">
            <el-radio-group v-model="form.sameAsPositive" style="width: 200px;">
              <el-radio v-for="item in dict.yes_or_no" :key="item.id" :value="parseInt(item.value)" :label="parseInt(item.value)">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.sameAsPositive === '0' || form.sameAsPositive === 0" label="反向限速(KM/时)" prop="speedLimitReverse">
            <el-input type="String" v-model="form.speedLimitReverse" style="width: 200px;" />
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
        <!-- <el-table-column prop="speedLimitId" label="序号" /> -->
        <el-table-column prop="speedLimitName" label="名称" />        
        <!-- <el-table-column prop="origin" label="起点" /> -->
        <el-table-column prop="originName" label="起点" />
        <!-- <el-table-column prop="target" label="终点" /> -->
        <el-table-column prop="targetName" label="终点" />       
        <el-table-column prop="distance" label="距离" />
        <el-table-column prop="speedLimit" label="限速值" />
        <el-table-column prop="speedLimitReverse" label="反向限速值" />
        <!-- <el-table-column prop="sameAsPositive" label="双方向限速相同">
          <template slot-scope="scope">
            {{ dict.label.yes_or_no[scope.row.sameAsPositive] }}
          </template>
        </el-table-column> -->
        <el-table-column v-permission="['admin','roadLinksSpeedLimit:edit','roadLinksSpeedLimit:del']" label="操作" width="150px" align="center">
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
import crudRoadLinksSpeedLimit from '@/api/roadLinksSpeedLimit'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import siteApi from '@/api/site'

const defaultForm = { speedLimitId: null, speedLimitName: null, speedLimitReverse: null, sameAsPositive: '1', target: null, origin: null, speedLimit: null, distance: null }
export default {
  name: 'RoadLinksSpeedLimit',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['yes_or_no'],
  cruds() {
    return CRUD({ idField: 'speedLimitId', title: '', url: 'api/roadLinksSpeedLimit', sort: 'updatedBy,desc', crudMethod: { ...crudRoadLinksSpeedLimit }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'roadLinksSpeedLimit:add'],
        edit: ['admin', 'roadLinksSpeedLimit:edit'],
        del: ['admin', 'roadLinksSpeedLimit:del']
      },
      rules: {
        speedLimitName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        target: [
          { required: true, message: '终点不能为空', trigger: 'blur' }
        ],
        origin: [
          { required: true, message: '起点不能为空', trigger: 'blur' }
        ],
        speedLimit: [
          { required: true, message: '限速值不能为空', trigger: 'blur' }
        ],
        distance: [
          { required: true, message: '距离不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'speedLimitName', display_name: '名称' },
        { key: 'target', display_name: '终点监控点设备编码' },
        { key: 'origin', display_name: '起点监控设备编号' }
      ],
      sites: []
    }
  },  
  beforeCreate() {    
    siteApi.getAll().then(res => {
      this.sites = res.content
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
