<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">限行规则名称</label>
        <el-input v-model="query.restrictionName" clearable placeholder="限行规则名称" style="width: 185px;"
          class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">有效期开始</label>
        <el-input v-model="query.indateStart" clearable placeholder="有效期开始" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">有效期结束</label>
        <el-input v-model="query.indateEnd" clearable placeholder="有效期结束" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right' 500px-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0"
        :title="crud.status.title" top="3vh" width="1200px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="mini" label-width="90px">
          <el-form-item label="规则名称" prop="restrictionName">
            <el-input v-model="form.restrictionName" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="有效期" prop="indateStart">
            <el-date-picker v-model="indate" type="daterange" :clearable="false" range-separator="~"
              start-placeholder="开始日期" end-placeholder="结束日期" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="限行类型" prop="restrictionType">
            <el-radio-group v-model="form.restrictionType" style="width: 270px;">
              <el-radio v-for="item in dict.restriction_type" :key="item.id" :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="限行规则" prop="vehicleTypes">
            <el-select v-model="form.vehicleTypes" filterable collapse-tags placeholder="请选择" style="width: 270px;">
              <el-option v-for="item in dict.vehicle_type_xiangtan" :key="item.id" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="布控原因" prop="cause">
            <el-select v-model="form.cause" filterable placeholder="请选择" style="width: 270px;">
              <el-option v-for="item in dict.restriction_cause" :key="item.id" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="违法类型" prop="cause">
            <el-select v-model="form.illegalType" filterable placeholder="请选择" style="width: 270px;">
              <el-option v-for="item in dict.illegal_type" :key="item.id" :label="item.label" :value="item.value">
                <el-tooltip :content="item.label" :enterable="true" placement="right-start" effect="light">
                  <!-- <div slot="content">{{ item.label }}</div> -->
                  <span>{{ formatIllegalTypeValue(item.label) }}</span>
                </el-tooltip>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通行证类型" prop="trafficPermit">
            <el-select v-model="form.trafficPermit" filterable placeholder="请选择" style="width: 270px;">
              <el-option v-for="item in dict.restriction_traffic_permit " :key="item.id" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="上报限制" prop="uploadNumber">
            <el-select v-model="form.uploadNumber" placeholder="请选择" style="width: 132px;">
              <el-option v-for="item in uploadNumberOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
            <!-- <el-input v-model="form.uploadNumber" style="width: 132px;" /> -->
            <span style="font-size:8px;">一个工作日内次数限制</span>
          </el-form-item>
          <!-- <el-form-item label="布控区域" prop="trafficPermit">
            <treeselect
              class="filter-item"
              :multiple="true"
              v-model="checkedDevice"
              :options="siteDeviceTree"
              @deselect="siteDeviceTreeDeselectedHandle"
              @select="siteDeviceTreeSelectedHandle"
              :deleteRemoves="false"
              noChildrenText="无节点"
              style="width: 1020px;"
              placeholder="布控区域"
            />
          </el-form-item> -->
          <el-form-item label="布控区域" prop="trafficPermit">
            <site-device-tree-transfer ref="siteTreeTransferRef" :defaultCheckedDevices="checkedDevice"
              @addBtn='addSiteDeviceHandle' @removeBtn='removeSiteDeviceHandle' />
          </el-form-item>
          <el-form-item label="周期模式" prop="cycleType">
            <el-checkbox v-model="form.cycleActive">是否启用</el-checkbox>
            <el-radio-group v-model="form.cycleType" :disabled="!form.cycleActive" style="width: 270px;"
              @change="handleCycleTypeChanged">
              <el-radio v-for="item in dict.restriction_cycle_type" :key="item.value" :label="item.value">
                {{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时段" prop="cause">
            <el-table :data="cycleTimeData" size="mini" style="font-size: 10px; width: 1000px;">
              <el-table-column label="布控时段" prop="title" width="170" align="center">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时段1" width="170" align="center">
                <template slot-scope="scope">
                  <el-time-picker v-model="scope.row.time1" :disabled="!form.cycleActive" is-range :editable="false"
                    range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini"
                    style="width: 160px; padding: 3px;" />
                </template>
              </el-table-column>
              <el-table-column label="时段2" width="170" align="center">
                <template slot-scope="scope">
                  <el-time-picker v-model="scope.row.time2" :disabled="!form.cycleActive" is-range :editable="false"
                    range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini"
                    style="width: 160px; padding: 3px;" />
                </template>
              </el-table-column>
              <el-table-column label="时段3" width="170" align="center">
                <template slot-scope="scope">
                  <el-time-picker v-model="scope.row.time3" :disabled="!form.cycleActive" is-range :editable="false"
                    range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini"
                    style="width: 160px; padding: 3px;" />
                </template>
              </el-table-column>
              <el-table-column label="时段4" width="170" align="center">
                <template slot-scope="scope">
                  <el-time-picker v-model="scope.row.time4" :disabled="!form.cycleActive" is-range :editable="false"
                    range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini"
                    style="width: 160px; padding: 3px;" />
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" style="padding: 3px;" :disabled="!form.cycleActive"
                    @click="handleEdit(scope.$index, scope.row)">复制</el-button>
                  <el-button size="mini" style="padding: 3px;" :disabled="!form.cycleActive" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">粘贴</el-button>
                  <el-button size="mini" style="padding: 3px;" :disabled="!form.cycleActive" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">清除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="通行日期" prop="cycleType">
            <el-checkbox v-model="form.exceptiveActive">是否启用</el-checkbox>
            <el-button size="mini" style="padding: 3px;" type="danger" :disabled="!form.exceptiveActive"
              @click="handleAddExceptiveData()">添加</el-button>
            <el-button size="mini" style="padding: 3px;" type="danger" :disabled="!form.exceptiveActive"
              @click="handleDeleteExceptiveData()">删除</el-button>
          </el-form-item>
          <el-form-item label="布控时段" prop="cause">
            <el-table :data="exceptiveDatas" size="mini" height="240" style="font-size: 10px; width: 1000px;">
              <el-table-column label="日期" width="170" align="center">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.date" :disabled="!form.exceptiveActive" type="date" size="mini"
                    style="width: 160px; padding: 3px;" placeholder="选择日期" />
                </template>
              </el-table-column>
              <el-table-column label="时段1" width="170" align="center">
                <template slot-scope="scope">
                  <el-time-picker v-model="scope.row.time1" :disabled="!form.exceptiveActive" is-range :editable="false"
                    range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini"
                    style="width: 160px; padding: 3px;" />
                </template>
              </el-table-column>
              <el-table-column label="时段2" width="170" align="center">
                <template slot-scope="scope">
                  <el-time-picker v-model="scope.row.time2" :disabled="!form.exceptiveActive" is-range :editable="false"
                    range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini"
                    style="width: 160px; padding: 3px;" />
                </template>
              </el-table-column>
              <el-table-column label="时段3" width="170" align="center">
                <template slot-scope="scope">
                  <el-time-picker v-model="scope.row.time3" :disabled="!form.exceptiveActive" is-range :editable="false"
                    range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini"
                    style="width: 160px; padding: 3px;" />
                </template>
              </el-table-column>
              <el-table-column label="时段4" width="170" align="center">
                <template slot-scope="scope">
                  <el-time-picker v-model="scope.row.time4" :disabled="!form.exceptiveActive" is-range :editable="false"
                    range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini"
                    style="width: 160px; padding: 3px;" />
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" style="padding: 3px;" :disabled="!form.exceptiveActive"
                    @click="handleEdit(scope.$index, scope.row)">复制</el-button>
                  <el-button size="mini" style="padding: 3px;" :disabled="!form.exceptiveActive" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">粘贴</el-button>
                  <el-button size="mini" style="padding: 3px;" :disabled="!form.exceptiveActive" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">清除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <!-- <el-form-item label="限行的车辆">
            <el-input v-model="form.supplementTrue" style="width: 270px;" />
          </el-form-item>
          <el-form-item label="例外车辆">
            <el-input v-model="form.supplementFalse" style="width: 270px;" />
          </el-form-item> -->
          <el-form-item label="布控描述">
            <el-input v-model="form.describe" :rows="3" type="textarea" style="width: 1000px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;"
        @toggleRowExpansion="handlerToggleRowExpansion" @selection-change="crud.selectionChangeHandler">
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ getSite(props.row) }}</span>
              </el-form-item>
              <el-form-item label="限行时段">
                <el-table :data="getCycleTimeData(props.row, this)" style="width: 100%">
                  <el-table-column prop="title" label="时段" width="180">
                  </el-table-column>
                  <el-table-column prop="time1" label="时段1" width="180">
                  </el-table-column>
                  <el-table-column prop="time2" label="时段2" width="180">
                  </el-table-column>
                  <el-table-column prop="time3" label="时段3" width="180">
                  </el-table-column>
                  <el-table-column prop="time4" label="时段4" width="180">
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column prop="restrictionId" label="序号" /> -->
        <el-table-column prop="restrictionName" label="限行规则名称" />
        <el-table-column prop="indateStart" label="有效期" :formatter="HandleFormatterIndate">
          <!-- <template slot-scope="scope">
            <span>{{ parseTime(scope.row.indateStart) }}~{{ parseTime(scope.row.indateEnd) }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="cause" label="布控原因">
          <template slot-scope="scope">
            {{ dict.label.restriction_cause[scope.row.cause] }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="vehicleTypes" label="限行规则">
          <template slot-scope="scope">
            {{ dict.label.vehicle_type[scope.row.vehicleTypes] }}
          </template>
        </el-table-column> -->
        <el-table-column prop="uploadNumber" label="违法上报限制" :formatter="HandleFormatterUploadNumber" />
        <el-table-column prop="trafficPermit" label="通行证类型">
          <template slot-scope="scope">
            {{ dict.label.restriction_traffic_permit [scope.row.trafficPermit] }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="cycleType" label="周期模式">
          <template slot-scope="scope">
            {{ dict.label.restriction_cycle_type[scope.row.cycleType] }}
          </template>
        </el-table-column> -->
        <el-table-column prop="restrictionType" label="限行类型">
          <template slot-scope="scope">
            {{ dict.label.restriction_type[scope.row.restrictionType] }}
          </template>
        </el-table-column>
        <el-table-column label="限行类型">
          <template slot-scope="scope">
            <span :class="getStatus(scope.row).style">{{ getStatus(scope.row).text }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="supplementTrue" label="限行的车辆" />
        <el-table-column prop="supplementFalse" label="例外车辆" />
        <el-table-column prop="describe" label="布控描述" /> -->
        <el-table-column v-permission="['admin','restriction:edit','restriction:del']" label="操作" width="230px"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.inExecuted !== -1" :type="getStatusChangeType(scope.row)"
              :icon="getStatusChangeIcon(scope.row)" size="mini" @click="HandleChangeStatus(scope.row, $event)" />
            <el-button v-if="scope.row.inExecuted !== -1" type="info" icon="el-icon-back" size="mini"
              @click="HandleRevocation(scope.row, $event)" />
            <udOperation :data="scope.row" :permission="permission" style="display: inline; float: right" />
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
import crudRestriction from '@/api/restriction'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { validateNull } from '@/utils/validate'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
import SiteDeviceTreeTransfer from '../../components/SiteDeviceTreeTransfer.vue'
import moment from 'moment'

const defaultForm = { restrictionId: 'new_id', restrictionName: null, indateStart: null, indateEnd: null, cause: 'truck_running_through_restricted_areas', illegalType: '13442', vehicleTypes: 'H11,H12,H13,H14,H15,H16,H17,H18,H21,H22,H23,H24,H25,H26,H27,H28,G11,G12,G13,G14,G15,G16,G21,G22,G23,G24,G25,G26,G31,G32,G33,G34,G35,B11,B12,B13,B14,B15,B16,B17,B21,B22,B23,B24,B25,B26,B27,B31,B32,B33,B34,B35,Z,Z11,Z21,Z31,Z41,Z51,Z71,Q11,Q21,Q31', uploadNumber: 0, trafficPermit: 'truck', cycleType: null, restrictionType: 'motorcycle_type', supplementTrue: null, supplementFalse: null, describe: null, restrictionSites: null, restrictionTimeIntervals: null, inExecuted: 0, discard: 0, cycleActive: false, exceptiveActive: false }
export default {
  name: 'Restriction',
  components: { pagination, crudOperation, rrOperation, udOperation, Treeselect, SiteDeviceTreeTransfer },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['restriction_cause', 'vehicle_type', 'restriction_traffic_permit', 'restriction_cycle_type', 'restriction_type', 'illegal_type', 'vehicle_type_xiangtan'],
  cruds() {
    return CRUD({ idField: 'restrictionId', title: '', url: 'api/restriction', sort: 'restrictionId,desc', crudMethod: { ...crudRestriction } })
  },
  data() {
    return {
      permission: {
        add: ['admin', 'restriction:add'],
        edit: ['admin', 'restriction:edit'],
        del: ['admin', 'restriction:del']
      },
      rules: {
        restrictionName: [
          { validator: validateNull, trigger: 'blur' }
          // { required: true, message: '限行规则名称不能为空', trigger: 'blur' }
        ]
      },
      cycleTimeData: [],
      cycleTimeDataDayTemp: [{ title: '时段', time1: null, time2: null, time3: null, time4: null }],
      cycleTimeDataWeekTemp: [
        { title: '周一', time1: null, time2: null, time3: null, time4: null },
        { title: '周二', time1: null, time2: null, time3: null, time4: null },
        { title: '周三', time1: null, time2: null, time3: null, time4: null },
        { title: '周四', time1: null, time2: null, time3: null, time4: null },
        { title: '周五', time1: null, time2: null, time3: null, time4: null },
        { title: '周六', time1: null, time2: null, time3: null, time4: null },
        { title: '周日', time1: null, time2: null, time3: null, time4: null }
      ],
      exceptiveData: { date: null, time1: null, time2: null, time3: null, time4: null },
      // 例外时间段
      exceptiveDatas: [],
      indate: null,
      value1: [new Date(2018, 9, 10, 18, 40), new Date(2018, 9, 10, 18, 40)],
      queryTypeOptions: [
        { key: 'restrictionName', display_name: '限行规则名称' },
        { key: 'indateStart', display_name: '有效期开始' },
        { key: 'indateEnd', display_name: '有效期结束' }
      ],
      checkedDevice: [],// 编辑的数据中携带的绑定的deviceid 集合
      selectedDevice: [],// 向请求参数中添加的deviceid 集合
      // siteDeviceTree: [],
      uploadNumberOptions: [{ value: 0, label: '无限制' }, { value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }]
    }
  },
  computed: {
    getStatusChangeType() {
      return function (row) {
        if (row.inExecuted === 1) {
          return 'success'
        } else if (row.inExecuted === 0) {
          return 'danger'
        }
      }
    },
    getStatusChangeIcon() {
      return function (row) {
        if (row.inExecuted === 1) {
          return 'el-icon-video-pause'
        } else if (row.inExecuted === 0) {
          return 'el-icon-video-play'
        }
      }
    },
    getStatus() {
      return function (row) {
        const re = { style: '', text: '' }
        if (row.inExecuted === 1) {
          re.style = 'text_green'
          re.text = '已启动'
        } else if (row.inExecuted === 0) {
          re.style = 'text_red'
          re.text = '已暂停'
        } else if (row.inExecuted === -1) {
          re.style = 'text_grey'
          re.text = '已撤控'
        }
        return re
      }
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      if (crud.form.restrictionId === 'new_id') {
        crud.form.restrictionId = Number(Math.random().toString().substr(3, 9) + Date.now()).toString(36)
        this.cycleTimeData = []
        this.exceptiveDatas = []
        this.checkedDevice = []
      }
      if (this.$refs["siteTreeTransferRef"]) {
        this.$refs["siteTreeTransferRef"].restoreTree()
      }
    },
    // 打开编辑弹窗前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      if (form.indateStart && form.indateEnd) {
        this.indate = [new Date(form.indateStart), new Date(form.indateEnd)]
      }
      const self = this
      this.handlerFormatData(form, self)
    },
    addSiteDeviceHandle(fromData, toData, selectedNodes) {
      selectedNodes.nodes.forEach(item => {
        if (item.type === "device") {
          this.selectedDevice.push(item.id)
        }
      })
    },
    removeSiteDeviceHandle(fromData, toData, selectedNodes) {
      const self = this
      selectedNodes.nodes.forEach(item => {
        if (item.type === "device") {
          self.selectedDevice = self.selectedDevice.filter(deviceId => {
            return deviceId !== item.id
          })
        }
      })
    },
    [CRUD.HOOK.afterValidateCU](crud) {
      crud.form.restrictionSites = []
      if (this.selectedDevice.length > 0) {
        for (var i = 0; i < this.selectedDevice.length; i++) {
          const restrictionSite = { siteId: this.selectedDevice[i], restrictionId: crud.form.restrictionId }
          crud.form.restrictionSites.push(restrictionSite)
        }
      }
      crud.form.restrictionTimeIntervals = []
      if (crud.form.cycleActive) {
        this.cycleTimeData.map(function (obj) {
          for (let ci = 1; ci < 5; ci++) {
            if (obj['time' + ci] === null || obj['time' + ci].length === 0) {
              break
            }
            const restrictionTimeInterval = {
              restrictionId: crud.form.restrictionId,
              timeIntervalType: 'true',
              groupName: obj.title,
              timeType: 'time',
              timeStart: moment(obj['time' + ci][0]).format("HH:mm:ss"),
              timeEnd: moment(obj['time' + ci][1]).format("HH:mm:ss")
            }
            crud.form.restrictionTimeIntervals.push(restrictionTimeInterval)
          }
        })
      }
      if (crud.form.exceptiveActive) {
        this.exceptiveDatas.map(function (obj) {
          for (let ci = 1; ci < 5; ci++) {
            if (obj['time' + ci] === null || obj['time' + ci].length === 0) {
              break
            }
            const restrictionTimeInterval = {
              restrictionId: crud.form.restrictionId,
              timeIntervalType: 'false',
              groupName: obj['date'],
              timeType: 'time',
              timeStart: moment(obj['time' + ci][0]).format("HH:mm:ss"),
              timeEnd: moment(obj['time' + ci][1]).format("HH:mm:ss")
            }
            crud.form.restrictionTimeIntervals.push(restrictionTimeInterval)
          }
        })
      }
      crud.form.indateStart = moment(this.indate[0]).format("YYYY-MM-DD")
      crud.form.indateEnd = moment(this.indate[1]).format("YYYY-MM-DD")
      return true
    },
    // 增加例外时间
    handleAddExceptiveData() {
      this.exceptiveDatas.push(this.exceptiveData)
    },
    // 删除例外日期尾部
    handleDeleteExceptiveData() {
      this.exceptiveDatas.splice(this.exceptiveDatas.length - 1)
    },
    // 周期模式更改
    handleCycleTypeChanged(label) {
      if (label === 'day') {
        this.cycleTimeData = this.cycleTimeDataDayTemp
      } else {
        this.cycleTimeData = this.cycleTimeDataWeekTemp
      }
    },
    handlerToggleRowExpansion(row, expanded) {
      const self = this
      this.handlerFormatData(row, self)
    },
    handlerFormatData(form, self) {
      self.checkedDevice = []
      self.selectedDevice = []
      self.exceptiveDatas = []
      if (form.restrictionSites !== null) {
        form.restrictionSites.map(function (obj) {
          self.selectedDevice.push(obj.siteId)
          self.checkedDevice.push(obj.siteId)
        })
      }
      if (form.cycleActive) {
        self.cycleTimeData = self.getCycleTimeData(form, self)
      }
      if (form.exceptiveActive) {
        form.restrictionTimeIntervals.map(function (obj) {
          const titleTemp = obj.groupName
          if (obj.timeIntervalType === 'true') {
            return true
          }
          const index = self.exceptiveDatas.findIndex((item, i) => {
            return item.date === new Date(titleTemp)
          })
          if (index !== -1) {
            for (let dateIndex = 2; dateIndex < 5; dateIndex++) {
              if (self.exceptiveDatas[index]['time' + dateIndex] && self.exceptiveDatas[index]['time' + dateIndex].length === 0) {
                self.exceptiveDatas[index]['time' + self.dateIndex] = []
                self.exceptiveDatas[index]['time' + self.dateIndex] = []
                self.exceptiveDatas[index]['time' + self.dateIndex].push(new Date('2020-01-01 ' + obj.timeStart))
                self.exceptiveDatas[index]['time' + self.dateIndex].push(new Date('2020-01-01 ' + obj.timeEnd))
              }
            }
          } else {
            var temp = {
              date: new Date(titleTemp),
              time1: [new Date('2020-01-01 ' + obj.timeStart), new Date('2020-01-01 ' + obj.timeEnd)],
              time2: [],
              time3: [],
              time4: []
            }
            self.exceptiveDatas.push(temp)
          }
        })
      }
    },
    getSite(row) {
      let sitesTemp = ''
      row.restrictionSites.map(function (obj) {
        sitesTemp += obj.siteId
      })
      return sitesTemp
    },
    getCycleTimeData(form, self) {
      let cycleTimeDataTemp = []
      if (form.cycleType === 'day') {
        const cycleTimeDataDayTempIn = [
          {
            title: '时段',
            time1: null,
            time2: null,
            time3: null,
            time4: null
          }
        ]
        var i = 1
        form.restrictionTimeIntervals.map(function (obj) {
          if (obj.timeIntervalType === 'false') {
            return true
          }
          if (i > 4) {
            return false
          }
          cycleTimeDataDayTempIn[0]['time' + i] = []
          cycleTimeDataDayTempIn[0]['time' + i] = []
          cycleTimeDataDayTempIn[0]['time' + i].push(new Date('2020-01-01 ' + obj.timeStart))
          cycleTimeDataDayTempIn[0]['time' + i].push(new Date('2020-01-01 ' + obj.timeEnd))
          i++
        })
        cycleTimeDataTemp = cycleTimeDataDayTempIn
      } else if (form.cycleType === 'week') {
        const cycleTimeDataWeekTempIn = [
          { title: '周一', time1: null, time2: null, time3: null, time4: null },
          { title: '周二', time1: null, time2: null, time3: null, time4: null },
          { title: '周三', time1: null, time2: null, time3: null, time4: null },
          { title: '周四', time1: null, time2: null, time3: null, time4: null },
          { title: '周五', time1: null, time2: null, time3: null, time4: null },
          { title: '周六', time1: null, time2: null, time3: null, time4: null },
          { title: '周日', time1: null, time2: null, time3: null, time4: null }
        ]
        var mun = 1
        var tues = 1
        var wed = 1
        var thur = 1
        var fri = 1
        var sat = 1
        var sun = 1
        form.restrictionTimeIntervals.map(function (obj) {
          if (obj.timeIntervalType === 'false') {
            return false
          }
          switch (obj.groupName) {
            case '周一':
              if (mun < 5) {
                cycleTimeDataWeekTempIn[0]['time' + mun] = []
                cycleTimeDataWeekTempIn[0]['time' + mun] = []
                cycleTimeDataWeekTempIn[0]['time' + mun].push(new Date('2020-01-01 ' + obj.timeStart))
                cycleTimeDataWeekTempIn[0]['time' + mun].push(new Date('2020-01-01 ' + obj.timeEnd))
                mun++
              }
              break
            case '周二':
              if (tues < 5) {
                cycleTimeDataWeekTempIn[1]['time' + tues] = []
                cycleTimeDataWeekTempIn[1]['time' + tues] = []
                cycleTimeDataWeekTempIn[1]['time' + tues].push(new Date('2020-01-01 ' + obj.timeStart))
                cycleTimeDataWeekTempIn[1]['time' + tues].push(new Date('2020-01-01 ' + obj.timeEnd))
                tues++
              }
              break
            case '周三':
              if (wed < 5) {
                cycleTimeDataWeekTempIn[2]['time' + wed] = []
                cycleTimeDataWeekTempIn[2]['time' + wed] = []
                cycleTimeDataWeekTempIn[2]['time' + wed].push(new Date('2020-01-01 ' + obj.timeStart))
                cycleTimeDataWeekTempIn[2]['time' + wed].push(new Date('2020-01-01 ' + obj.timeEnd))
                wed++
              }
              break
            case '周四':
              if (thur < 5) {
                cycleTimeDataWeekTempIn[3]['time' + thur] = []
                cycleTimeDataWeekTempIn[3]['time' + thur] = []
                cycleTimeDataWeekTempIn[3]['time' + thur].push(new Date('2020-01-01 ' + obj.timeStart))
                cycleTimeDataWeekTempIn[3]['time' + thur].push(new Date('2020-01-01 ' + obj.timeEnd))
                thur++
              }
              break
            case '周五':
              if (fri < 5) {
                cycleTimeDataWeekTempIn[4]['time' + fri] = []
                cycleTimeDataWeekTempIn[4]['time' + fri] = []
                cycleTimeDataWeekTempIn[4]['time' + fri].push(new Date('2020-01-01 ' + obj.timeStart))
                cycleTimeDataWeekTempIn[4]['time' + fri].push(new Date('2020-01-01 ' + obj.timeEnd))
                fri++
              }
              break
            case '周六':
              if (sat < 5) {
                cycleTimeDataWeekTempIn[5]['time' + sat] = []
                cycleTimeDataWeekTempIn[5]['time' + sat] = []
                cycleTimeDataWeekTempIn[5]['time' + sat].push(new Date('2020-01-01 ' + obj.timeStart))
                cycleTimeDataWeekTempIn[5]['time' + sat].push(new Date('2020-01-01 ' + obj.timeEnd))
                sat++
              }
              break
            case '周日':
              if (sun < 5) {
                cycleTimeDataWeekTempIn[6]['time' + sun] = []
                cycleTimeDataWeekTempIn[6]['time' + sun] = []
                cycleTimeDataWeekTempIn[6]['time' + sun].push(new Date('2020-01-01 ' + obj.timeStart))
                cycleTimeDataWeekTempIn[6]['time' + sun].push(new Date('2020-01-01 ' + obj.timeEnd))
                sun++
              }
              break
            default:
              return false
          }
        })
        cycleTimeDataTemp = cycleTimeDataWeekTempIn
      }
      return cycleTimeDataTemp
    },
    HandleFormatterUploadNumber(row, column, cellValue, index) {
      if (cellValue === 0) {
        return '无限制'
      }
    },
    HandleFormatterIndate(row, column, cellValue, index) {
      return this.parseTime(row.indateStart, '{y}-{m}-{d}') + '~' + this.parseTime(row.indateEnd, '{y}-{m}-{d}')
    },
    HandleChangeStatus(row, event) {
      if (row.inExecuted === 1) {
        row.inExecuted = 0
      } else {
        row.inExecuted = 1
      }
      crudRestriction.updateInExecuted(row).then().catch(error => {
        console.log(error)
        if (row.inExecuted === 1) {
          row.inExecuted = 0
        } else {
          row.inExecuted = 1
        }
      })
    },
    HandleRevocation(row, event) {
      const inExecutedTemp = row.inExecuted
      row.inExecuted = -1
      crudRestriction.updateInExecuted(row).then().catch(error => {
        console.log(error)
        row.inExecuted = inExecutedTemp
      })
    },
    formatIllegalTypeValue(value) {
      if (value.length > 19) {
        return value.substring(0, 19) + '...'
      }
      else {
        return value
      }
    }
  }
}
</script>

<style scoped>
/deep/ .el-form-item__label {
  font-size: 12px;
}
/deep/ .el-radio__label {
  font-size: 6px;
  padding-left: 10px;
  font-weight: 300;
}
/deep/ .el-radio {
  margin-right: 10px;
}
.in-table th {
  text-align: center;
}
.text_red {
  color: #ff6d6d;
}
.text_green {
  color: #42d885;
}
.text_grey {
  color: #a6a9ad;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .vue-treeselect__control,
/deep/ .vue-treeselect__placeholder,
/deep/ .vue-treeselect__single-value {
  height: 30px;
  font-size: 13px;
  // line-height: 30px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-input-number .el-input__inner {
  text-align: left;
  font-size: 13px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .vue-treeselect__menu {
  font-size: 13px;
  font-weight: 100;
  color: #606266;
}
/deep/ .vue-treeselect--has-value .vue-treeselect__multi-value {
  margin-bottom: 5px;
  max-height: 70px;
  // overflow-x: hidden;
}
</style>
