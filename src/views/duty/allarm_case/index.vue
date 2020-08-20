<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">出动单位</label>
        <el-input v-model="query.cddw" clearable placeholder="出动单位" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">管辖派出所</label>
        <el-input v-model="query.gxpcs" clearable placeholder="管辖派出所" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">报警人姓名</label>
        <el-input v-model="query.bjrxm" clearable placeholder="报警人姓名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">报警人电话</label>
        <el-input v-model="query.bjrdh" clearable placeholder="报警人电话" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="录音号">
            <el-input v-model="form.lyh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="出动单位">
            <el-input v-model="form.cddw" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="管辖派出所">
            <el-input v-model="form.gxpcs" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="报警人姓名">
            <el-input v-model="form.bjrxm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="报警人电话">
            <el-input v-model="form.bjrdh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="发送人工号">
            <el-input v-model="form.fsrgh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否有化危品 '0-无 1-有'">
            <el-input v-model="form.status" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createtime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="签收工号">
            <el-input v-model="form.qsrgh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处置反馈时间">
            <el-input v-model="form.czsj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="到场反馈时间">
            <el-input v-model="form.dcfksj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="接处警照片">
            <el-input v-model="form.jcjzp" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="退单时间">
            <el-input v-model="form.tdsj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="签收时间">
            <el-input v-model="form.qssj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警员编号">
            <el-input v-model="form.usercode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="案由代码">
            <el-input v-model="form.ayCode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="0:强制措施,1:简易执法">
            <el-input v-model="form.methodgroupCode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警情地点">
            <el-input v-model="form.alarmAddress" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处警内容">
            <el-input v-model="form.handleContent" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处置时间">
            <el-input v-model="form.handleTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处置方法">
            <el-input v-model="form.methodCode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="0拥堵处理1:事故处理">
            <el-input v-model="form.eventTypecode" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="警种">
            <el-input v-model="form.jz" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model="form.tid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="手机IMEI号">
            <el-input v-model="form.imei" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="事件单编号">
            <el-input v-model="form.sjdbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处警单编号">
            <el-input v-model="form.cjdbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="指令单编号">
            <el-input v-model="form.zldbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="案发地址">
            <el-input v-model="form.afdz" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="所属分局">
            <el-input v-model="form.ssfj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="事件等级">
            <el-input v-model="form.ajdj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标志物">
            <el-input v-model="form.bzw" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="案件描述">
            <el-input v-model="form.ajms" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="报警时间">
            <el-input v-model="form.bjsj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="联系地址">
            <el-input v-model="form.lxdz" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="指令内容">
            <el-input v-model="form.zlnr" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="发送时间">
            <el-input v-model="form.fssj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车牌类型-122">
            <el-input v-model="form.cplx" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="受伤人数-122">
            <el-input v-model="form.ssrs" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="死亡人数-122">
            <el-input v-model="form.swrs" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="肇事车辆-122">
            <el-input v-model="form.zscl" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="案由">
            <el-input v-model="form.ay" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="form.jd" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="form.wd" style="width: 370px;" />
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
        <el-table-column prop="lyh" label="录音号" />
        <el-table-column prop="cddw" label="出动单位" />
        <el-table-column prop="gxpcs" label="管辖派出所" />
        <el-table-column prop="bjrxm" label="报警人姓名" />
        <el-table-column prop="bjrdh" label="报警人电话" />
        <el-table-column prop="fsrgh" label="发送人工号" />
        <el-table-column prop="status" label="是否有化危品 '0-无 1-有'" />
        <el-table-column prop="createtime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createtime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="qsrgh" label="签收工号" />
        <el-table-column prop="czsj" label="处置反馈时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.czsj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dcfksj" label="到场反馈时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.dcfksj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="jcjzp" label="接处警照片" />
        <el-table-column prop="tdsj" label="退单时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.tdsj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="qssj" label="签收时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.qssj) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="usercode" label="警员编号" />
        <el-table-column prop="ayCode" label="案由代码" />
        <el-table-column prop="methodgroupCode" label="0:强制措施,1:简易执法" />
        <el-table-column prop="alarmAddress" label="警情地点" />
        <el-table-column prop="handleContent" label="处警内容" />
        <el-table-column prop="handleTime" label="处置时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.handleTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="methodCode" label="处置方法" />
        <el-table-column prop="eventTypecode" label="0拥堵处理1:事故处理" />
        <el-table-column prop="jz" label="警种" />
        <el-table-column prop="tid" label="编号" />
        <el-table-column prop="imei" label="手机IMEI号" />
        <el-table-column prop="sjdbh" label="事件单编号" />
        <el-table-column prop="cjdbh" label="处警单编号" />
        <el-table-column prop="zldbh" label="指令单编号" />
        <el-table-column prop="afdz" label="案发地址" />
        <el-table-column prop="ssfj" label="所属分局" />
        <el-table-column prop="ajdj" label="事件等级" />
        <el-table-column prop="bzw" label="标志物" />
        <el-table-column prop="ajms" label="案件描述" />
        <el-table-column prop="bjsj" label="报警时间" />
        <el-table-column prop="lxdz" label="联系地址" />
        <el-table-column prop="zlnr" label="指令内容" />
        <el-table-column prop="fssj" label="发送时间" />
        <el-table-column prop="cplx" label="车牌类型-122" />
        <el-table-column prop="ssrs" label="受伤人数-122" />
        <el-table-column prop="swrs" label="死亡人数-122" />
        <el-table-column prop="zscl" label="肇事车辆-122" />
        <el-table-column prop="ay" label="案由" />
        <el-table-column prop="jd" label="经度" />
        <el-table-column prop="wd" label="纬度" />
        <el-table-column v-permission="['admin','alarmcase:edit','alarmcase:del']" label="操作" width="150px" align="center">
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
import crudAlarmcase from '@/api/alarmcase'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'


const defaultForm = { lyh: null, cddw: null, gxpcs: null, bjrxm: null, bjrdh: null, fsrgh: null, status: null, createtime: null, qsrgh: null, czsj: null, dcfksj: null, jcjzp: null, tdsj: null, qssj: null, usercode: null, ayCode: null, methodgroupCode: null, alarmAddress: null, handleContent: null, handleTime: null, methodCode: null, eventTypecode: null, jz: null, tid: null, imei: null, sjdbh: null, cjdbh: null, zldbh: null, afdz: null, ssfj: null, ajdj: null, bzw: null, ajms: null, bjsj: null, lxdz: null, zlnr: null, fssj: null, cplx: null, ssrs: null, swrs: null, zscl: null, ay: null, jd: null, wd: null }
export default {
  name: 'Alarmcase',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'v1/api/duty/allarm_case', url: 'api/alarmcase', sort: 'tid,desc', crudMethod: { ...crudAlarmcase }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'alarmcase:add'],
        edit: ['admin', 'alarmcase:edit'],
        del: ['admin', 'alarmcase:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'cddw', display_name: '出动单位' },
        { key: 'gxpcs', display_name: '管辖派出所' },
        { key: 'bjrxm', display_name: '报警人姓名' },
        { key: 'bjrdh', display_name: '报警人电话' }
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
