<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!-- <label class="el-form-item-label">车牌号码</label> -->
        <el-input v-model="query.cphm" clearable placeholder="车牌号码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <label class="el-form-item-label">违法地点</label> -->
        <!-- <el-input v-model="query.wfdd" clearable placeholder="违法地点" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        
        <el-select v-model="query.wfdd" filterable :clearable="true" placeholder="违法地点" class="filter-item">
          <el-option
            v-for="item in sites "
            :key="item.sitenum"
            :label="item.sitename"
            :value="item.locationSection"
          />
        </el-select>
        <!-- <label class="el-form-item-label">设备编号</label> -->
        <!-- <el-input v-model="query.sbbh" clearable placeholder="设备编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <!-- <label class="el-form-item-label">采集方式</label> -->
        <!-- <el-input v-model="query.cjfs" clearable placeholder="采集方式" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <!-- <label class="el-form-item-label">违法行为</label> -->
        <!-- <el-input v-model="query.wfxw" clearable placeholder="违法行为" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-select v-model="query.wfxw" filterable placeholder="违法行为" :clearable="true" style="width: 270px;" class="filter-item">              
            <el-option
              v-for="item in dict.illegal_type"
              :key="item.id"
              :label="formatIllegalTypeValue(item.label)"
              :value="item.value"
            >
              <el-tooltip :content="item.label" :enterable="true" placement="right-start" effect="light">
                <!-- <div slot="content">{{ item.label }}</div> -->
                <span>{{ formatIllegalTypeValue(item.label) }}</span>
              </el-tooltip>
            </el-option>
        </el-select>
        <!-- <label class="el-form-item-label">违法时间</label> -->
        <el-date-picker
          v-model="query.wfsj"
          type="daterange"
          class="filter-item"
          :clearable="true"
          @change="changeDataRangeValueHandler"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 270px;"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="950px">
        <el-form ref="form" :model="form" :inline="true" size="small" label-width="110px" style="width: 700px">
          <!-- <el-form-item label="ID">
            <el-input v-model="form.gcid" style="width: 370px;" />
          </el-form-item> -->
          <el-form-item label="车牌号码" prop="cphm">
            <span>{{ form.cphm }}</span>
          </el-form-item>
          <el-form-item label="违法时间" prop="wfsj">
            <span>{{ form.wfsj }}</span>
          </el-form-item>
          <el-form-item label="违法地址">
            <!-- <el-input v-model="form.wfdz" style="width: 370px;" /> -->
            <span class="fullItem">{{ form.wfdz }}</span>
          </el-form-item>
          <el-form-item label="违法行为" prop="wfxw">
            <span>{{ dict.label.illegal_type[form.wfxw] }}</span>
          </el-form-item>          
          <el-form-item label="车牌种类" prop="cpzl">
            <span>{{ dict.label.plate_class[form.cpzl] }}</span>
          </el-form-item>          
          <el-form-item label="采集人" prop="cjr">
            <span>{{ form.cjr }}</span>
          </el-form-item>
          <el-form-item label="车道方向">
            <span>{{ dict.label.lane_direction_num[form.fxbh] }}</span>
          </el-form-item>         
          <el-form-item label="车道编号">
            <span>{{ form.cdbh }}</span>
          </el-form-item>          
          <el-form-item label="车辆类型">
            <span>{{ form.cllx === null? '--': dict.label.vehicle_type[form.cllx] }}</span>
          </el-form-item>
          <el-form-item label="车辆速度">
            <span>{{ form.clsd }}</span>
          </el-form-item>
          <el-form-item label="设备编号" prop="sbbh">
            <span>{{ form.sbbh }}</span>
          </el-form-item>          
          <el-form-item label="红灯亮起时间">
            <span>{{ form.hdlqsj }}</span>
          </el-form-item>
          <el-form-item label="红灯持续时间">
            <span style="width: 370px;">{{ form.hdcxsj }}</span>
          </el-form-item>    
          <el-form-item label="采集方式">
            <span>{{ dict.label.gather_way[form.cjfs] }}</span>
          </el-form-item>          
          <el-form-item label="限速">
            <span>{{ form.xs }}</span>
          </el-form-item>
          <el-form-item label="图片">
            
          </el-form-item>
        </el-form>
        <div style="width: 700px; display: inline-grid;">
              <el-image class="carImage" :src="'data:image/jpg;base64,' + form.pic1" :preview-src-list="imageList" />
              <el-image class="carImage" :src="'data:image/jpg;base64,' + form.pic2" :preview-src-list="imageList" />
              <el-image v-if="!haveRepetitiveImage" class="carImage" :src="'data:image/jpg;base64,' + form.pic3" :preview-src-list="imageList" />
        </div>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div> -->
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="wfdz" label="违法地址" width="150"/>
        <!-- <el-table-column prop="hdcxsj" label="红灯持续时间" /> -->
        <!-- <el-table-column prop="cjr" label="采集人" /> -->
        <el-table-column prop="fxbh" label="车道方向" width="70">
          <template slot-scope="scope">
            {{ dict.label.lane_direction_num[scope.row.fxbh] }}
          </template>
        </el-table-column>
        <el-table-column prop="cphm" label="车牌号码" width="90" />
        <!-- <el-table-column prop="cdbh" label="车道编号" /> -->
        <el-table-column prop="cpzl" label="车牌种类" width="100">
          <template slot-scope="scope">
            {{ dict.label.plate_class[scope.row.cpzl] }}
          </template>
        </el-table-column>
        <el-table-column prop="cllx" label="车辆类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.cllx === null? '--': dict.label.vehicle_type[scope.row.cllx] }}
          </template>
        </el-table-column>
        <el-table-column prop="clsd" label="车辆速度" width="70" />
        <!-- <el-table-column prop="pic3" label="图片3" /> -->
        <!-- <el-table-column prop="wfdd" label="违法地点" /> -->
        <!-- <el-table-column prop="sbbh" label="设备编号" /> -->
        <el-table-column prop="wfsj" label="违法时间" width="120" />
        <!-- <el-table-column prop="hdlqsj" label="红灯亮起时间" /> -->
        <!-- <el-table-column prop="pic1" label="图片1" /> -->
        <!-- <el-table-column prop="cjfs" label="采集方式">
          <template slot-scope="scope">
            {{ dict.label.gather_way[scope.row.cjfs] }}
          </template>
        </el-table-column> -->
        <el-table-column prop="wfxw" label="违法行为">
          <template slot-scope="scope">
            {{ dict.label.illegal_type[scope.row.wfxw] }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="xs" label="限速" /> -->
        <el-table-column prop="pic1" label="图片1" width="120" >
          <template slot-scope="scope">
            <el-image style="height: 50px;" :src="'data:image/jpg;base64,' + scope.row.pic1" :preview-src-list="getTableImageList(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="pic2" label="图片2" width="120" >
          <template slot-scope="scope">
            <el-image style="height: 50px;" :src="'data:image/jpg;base64,' + scope.row.pic2" :preview-src-list="getTableImageList(scope.row)" />
          </template>
        </el-table-column>
        <!-- <el-table-column prop="pic3" label="图片3" width="120" >
          <template slot-scope="scope">
            <el-image style="height: 50px;" :src="'data:image/jpg;base64,' + scope.row.pic3" />
          </template>
        </el-table-column> -->
        <el-table-column v-permission="['admin','vehiclealarm:edit','vehiclealarm:del']" label="操作" width="150px" align="center">
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
import crudVehiclealarm from '@/api/vehiclealarm'
import siteApi from '@/api/site'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { changeDataRangeValue } from '@/utils/datePickerFormat'

const defaultForm = { gcid: null, wfdz: null, hdcxsj: null, cjr: null, fxbh: null, cphm: null, cdbh: null, cpzl: null, cllx: null, clsd: null, pic3: null, wfdd: null, sbbh: null, wfsj: null, hdlqsj: null, pic1: null, cjfs: null, wfxw: null, xs: null, pic2: null }
export default {
  name: 'Vehiclealarm',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['lane_direction_num', 'plate_class', 'vehicle_type', 'gather_way', 'illegal_type'],
  cruds() {
    return CRUD({ title: '', url: 'api/vehiclealarm', sort: 'wfsj,desc', crudMethod: { ...crudVehiclealarm }, optShow: {add: false,edit: false, del: false, download: true, reset: true, check: true }})
  },
  data() {
    return {
      permission: {
        // add: ['admin', 'vehiclealarm:add'],
        check: ['admin', 'vehiclealarm:check']
      },
      queryTypeOptions: [
        { key: 'cphm', display_name: '车牌号码' },
        { key: 'wfdd', display_name: '违法地点' },
        { key: 'sbbh', display_name: '设备编号' },
        { key: 'cjfs', display_name: '采集方式' },
        { key: 'wfxw', display_name: '违法行为' }
      ],
      sites: [],
      imageList: [],
      haveRepetitiveImage: false
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
    },
    // 打开编辑弹窗前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.imageList.push('data:image/jpg;base64,' + form.pic1)
      if (form.pic3 === form.pic2) {
        this.haveRepetitiveImage = true
        this.imageList.push('data:image/jpg;base64,' + form.pic2)
      } else {
        this.imageList.push('data:image/jpg;base64,' + form.pic2)
        this.imageList.push('data:image/jpg;base64,' + form.pic3)
      }      
    },
    getTableImageList(row) {
      const imageListTemp = []
      imageListTemp.push('data:image/jpg;base64,' + row.pic1)
      if (form.pic3 === form.pic2) {
        // this.haveRepetitiveImage = true
        imageListTemp.push('data:image/jpg;base64,' + row.pic2)
      } else {
        imageListTemp.push('data:image/jpg;base64,' + row.pic2)
        imageListTemp.push('data:image/jpg;base64,' + row.pic3)
      }
      return imageListTemp
    },
    formatIllegalTypeValue(value) {
      if (value.length > 19) {
        return value.substring(0,19) + '...'
      }
      else {
        return value
      }
    },
    // 区间时间控件时间修改
    changeDataRangeValueHandler(values) {
      changeDataRangeValue(values)
    }
  }
}
</script>

<style scoped>
  /deep/ .el-form-item__content{
    width: 220px;
  }
  /deep/ .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
  /deep/ .el-dialog__body {
    display: inline-flex;
  }
  .carImage {
    margin-top: 5px;
    width: 150px;
  }
</style>

