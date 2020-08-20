<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">设备编码</label>
        <el-input v-model="query.deviceNum" clearable placeholder="设备编码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">组织编号</label>
        <el-input v-model="query.groupNum" clearable placeholder="组织编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">设备名称</label>
        <el-input v-model="query.deviceName" clearable placeholder="设备名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">地点编号</label>
        <el-input v-model="query.siteNum" clearable placeholder="地点编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">IP</label>
        <el-input v-model="query.ip" clearable placeholder="IP" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">设备类型</label>
        <el-input v-model="query.deviceType" clearable placeholder="设备类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="设备编码" prop="deviceNum">
            <el-input v-model="form.deviceNum" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="端口号">
            <el-input v-model="form.ports" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="组织编号" prop="groupNum">
            <el-input v-model="form.groupNum" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="对接名称">
            <el-input v-model="form.extname" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="form.deviceName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新时间" prop="updateTime">
            <el-date-picker v-model="form.updateTime" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="硬件编号">
            <el-input v-model="form.hardwarever" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="地点编号" prop="siteNum">
            <el-input v-model="form.siteNum" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="form.longitude" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="IP" prop="ip">
            <el-input v-model="form.ip" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="软件版本">
            <el-input v-model="form.softwarever" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="维度" prop="latitude">
            <el-input v-model="form.latitude" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="设备类型" prop="deviceType">
            <el-select v-model="form.deviceType" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.device_type"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="对接编号">
            <el-input v-model="form.extnum" style="width: 370px;" />
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
        <el-table-column prop="deviceNum" label="设备编码" />
        <el-table-column prop="ports" label="端口号" />
        <el-table-column prop="groupNum" label="组织编号" />
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="extname" label="对接名称" />
        <el-table-column prop="deviceName" label="设备名称" />
        <el-table-column prop="updateTime" label="更新时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hardwarever" label="硬件编号" />
        <el-table-column prop="siteNum" label="地点编号" />
        <el-table-column prop="longitude" label="经度" />
        <el-table-column prop="ip" label="IP" />
        <el-table-column prop="softwarever" label="软件版本" />
        <el-table-column prop="latitude" label="维度" />
        <el-table-column prop="deviceType" label="设备类型">
          <template slot-scope="scope">
            {{ dict.label.device_type[scope.row.deviceType] }}
          </template>
        </el-table-column>
        <el-table-column prop="extnum" label="对接编号" />
        <el-table-column v-permission="['admin','device:edit','device:del']" label="操作" width="150px" align="center">
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
import crudDevice from '@/api/device'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { deviceNum: null, ports: null, groupNum: null, createTime: null, remark: null, extname: null, deviceName: null, updateTime: null, hardwarever: null, siteNum: null, longitude: null, ip: null, softwarever: null, latitude: null, deviceType: null, extnum: null }
export default {
  name: 'Device',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['device_type'],
  cruds() {
    return CRUD({ title: 'v1/api/back/device', url: 'api/device', sort: 'deviceNum,desc', crudMethod: { ...crudDevice }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'device:add'],
        edit: ['admin', 'device:edit'],
        del: ['admin', 'device:del']
      },
      rules: {
        deviceNum: [
          { required: true, message: '设备编码不能为空', trigger: 'blur' }
        ],
        groupNum: [
          { required: true, message: '组织编号不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '更新时间不能为空', trigger: 'blur' }
        ],
        siteNum: [
          { required: true, message: '地点编号不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '经度不能为空', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: 'IP不能为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '维度不能为空', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '设备类型不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'deviceNum', display_name: '设备编码' },
        { key: 'groupNum', display_name: '组织编号' },
        { key: 'deviceName', display_name: '设备名称' },
        { key: 'siteNum', display_name: '地点编号' },
        { key: 'ip', display_name: 'IP' },
        { key: 'deviceType', display_name: '设备类型' }
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
