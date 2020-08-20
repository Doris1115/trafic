<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.hphm" clearable placeholder="号牌号码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-input v-model="query.ddbh" clearable placeholder="地点编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <el-input v-model="query.bjsj" clearable placeholder="报警时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-date-picker
          v-model="query.bjsj"
          type="daterange"
          class="filter-item"
          @change="changeDataRangeValueHandler"
          :clearable="true"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 270px;"
        />
        <!-- <el-input v-model="query.clrq" clearable placeholder="处理日期" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-input v-model="query.bjlx" clearable placeholder="报警类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <el-input v-model="query.cdbh" clearable placeholder="车道编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <el-input v-model="query.hpzl" clearable placeholder="号牌种类" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-input v-model="query.clry" clearable placeholder="处理人员" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!-- <el-input v-model="query.kkid" clearable placeholder="卡口编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" /> -->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="序号">
            <el-input v-model="form.xh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处理日期">
            <el-input v-model="form.clrq" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="报警类型">
            <el-input v-model="form.bjlx" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="车道编号">
            <el-input v-model="form.cdbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="号牌种类" prop="hpzl">
            <el-input v-model="form.hpzl" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="号牌号码" prop="hphm">
            <el-input v-model="form.hphm" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="报警时间" prop="bjsj">
            <el-input v-model="form.bjsj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="报警原因">
            <el-input v-model="form.bjyy" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处理人员">
            <el-input v-model="form.clry" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-input v-model="form.gxsj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="方向编号">
            <el-input v-model="form.fxbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="卡口编号" prop="kkid">
            <el-input v-model="form.kkid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="地点编号">
            <el-input v-model="form.ddbh" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.bz" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处理意见">
            <el-input v-model="form.clyj" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="采集机关">
            <el-input v-model="form.cjjg" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处理标记">
            <el-input v-model="form.clbj" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        top="5vh"
        :visible.sync="mapDialogVisible"
        @closed="mapDoalogClosedHandler"
        width="80%"
        center>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span class="role-span">详细信息</span>
              </div>
              <baidu-map class="map" :center="mapCenter" :zoom="zoom" :scrollWheelZoom="true">
                <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
                <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
                <bm-marker v-for="(item, index) in points" :key="index" :position="item" :dragging="true" :icon="iconCar">
                  <bm-label :content="getMarkerLable(item, index)" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -1, height: 1}"/>
                </bm-marker>
                <!-- <bm-marker :position="{lng: 112.93, lat: 27.83}" :dragging="true" :icon="iconCar">
                </bm-marker> -->
                <bm-polyline :path="points" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="2"></bm-polyline>
              </baidu-map>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="7" style="margin-bottom: 10px">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span class="role-span">过车信息</span>
              </div>
              <el-form ref="form1" :model="form" :rules="rules" size="small" label-width="80px">
                <el-form-item label="时间">
                  <el-date-picker
                    v-model="queryPassCar.gwsj"
                    type="daterange"
                    class="filter-item"
                    :clearable="false"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 270px;"
                  />
                </el-form-item>
                <el-form-item label="号牌">
                  <el-input v-model="queryPassCar.hphm" clearable placeholder="号牌号码" style="width: 270px;" class="filter-item"/>
                </el-form-item>
              </el-form>              
              <el-button style="float: right;" type="primary" @click="getPassCarHandler" size="mini">查询</el-button>
              <el-table ref="table1" max-height="350" :data="passcarDatas" size="small" style="width: 100%;" @row-click="pointChangeHandler">
                <el-table-column prop="siteName" label="经过地点" />
                <el-table-column prop="gwsj" label="过往时间">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.gxsj) }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
        
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="mapDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="mapDialogVisible = false">确 定</el-button>
        </span> -->
      </el-dialog>

      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler" @row-dblclick="pointDataChangeHandler">
        <el-table-column type="selection" width="55" />
        <!-- <el-table-column prop="xh" label="序号" /> -->
        <el-table-column prop="hphm" label="号牌号码" />
        <el-table-column prop="bjsj" label="报警时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.bjsj) }}</span>
          </template>
        </el-table-column>        
        <el-table-column prop="siteName" label="地点名称" width="200"/>
        <el-table-column prop="bjyy" label="报警原因" width="300" />
        <el-table-column prop="clry" label="处理人员" />
        <el-table-column prop="gxsj" label="更新时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.gxsj) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="fxbh" label="方向编号" /> -->
        <!-- <el-table-column prop="kkid" label="卡口编号" /> -->
        <!-- <el-table-column prop="ddbh" label="地点编号" /> -->        
        <el-table-column prop="bjlx" label="报警类型" />
        <!-- <el-table-column prop="cdbh" label="车道编号" /> -->
        <el-table-column prop="hpzl" label="号牌种类">
          <template slot-scope="scope">
            {{ dict.label.plate_class[scope.row.hpzl] }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="bz" label="备注" /> -->
        <!-- <el-table-column prop="clyj" label="处理意见" />        
        <el-table-column prop="clrq" label="处理日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.clrq) }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="cjjg" label="采集机关" /> -->
        <!-- <el-table-column prop="clbj" label="处理标记" /> -->
        <el-table-column v-permission="['admin','alarmed:edit','alarmed:del']" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <el-button style="float: right;" type="primary" @click="pointDataChangeHandler(scope.row)" size="mini">当日轨迹</el-button>
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
import crudAlarmed from '@/api/alarmed'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
// import { BaiduMap, BmOverviewMap, BmNavigation, BmMapType, BmScale, BmControl, BmlLushu } from '@/components/MapBaidu/index.js'
import car from '@/assets/images/car.png'
import passCarApi from '@/api/passcar'
import moment  from 'moment'
import Date from '@/utils/datetime'
import { changeDataRangeValue } from '@/utils/datePickerFormat'

const defaultForm = { xh: null, clrq: null, bjlx: null, cdbh: null, hpzl: null, hphm: null, bjsj: null, bjyy: null, clry: null, gxsj: null, fxbh: null, kkid: null, ddbh: null, bz: null, clyj: null, cjjg: null, clbj: null }
export default {
  name: 'Alarmed',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['lane_direction_num', 'plate_class', 'vehicle_type', 'gather_way', 'illegal_type'],
  cruds() {
    return CRUD({ title: 'v1/api/data/alarmed', url: 'api/alarmed', sort: 'bjsj,desc', crudMethod: { ...crudAlarmed }, optShow: {add: false,edit: false, del: false, download: true, reset: true, check: false }})
  },
  data() {
    return {
      permission: {
        // add: ['admin', 'alarmed:add'],
        // edit: ['admin', 'alarmed:edit'],
        // del: ['admin', 'alarmed:del']
        check:['admin', 'alarmed:check']
      },
      rules: {},
      queryTypeOptions: [
        { key: 'clrq', display_name: '处理日期' },
        { key: 'bjlx', display_name: '报警类型' },
        { key: 'cdbh', display_name: '车道编号' },
        { key: 'hpzl', display_name: '号牌种类' },
        { key: 'hphm', display_name: '号牌号码' },
        { key: 'bjsj', display_name: '报警时间' },
        { key: 'clry', display_name: '处理人员' },
        { key: 'kkid', display_name: '卡口编号' },
        { key: 'ddbh', display_name: '地点编号' }
      ],
      mapDialogVisible: false,// 是否显示地图弹窗
      zoom: 15,
      play: false,
      path: [{lng: 112.93, lat: 27.83}, {lng: 112.94, lat: 27.83}, {lng: 112.95, lat: 27.83}, {lng: 112.95, lat: 27.93}, {lng: 112.94, lat: 27.93}, {lng: 112.93, lat: 27.83}],
      points: [],
      mapCenter: {lng: 112.93, lat: 27.83},
      passcarDatas: [],
      resetCenter: false,
      iconCar: {
        url: car,
        size: {width: 24, height: 24}
      },
      queryPassCar: {
        hphm:"",
        gwsj: []
      }
    }
  },
  mounted() {
    // this.addPoints()
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    addZoom (level) {
      this.zoom = level
    },
    reset () {
      this.play = false
    },
    clickHandler (e) {
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
    },
    // 地图弹窗关闭事件
    mapDoalogClosedHandler() {
      this.mapDialogVisible = false
      this.queryPassCar = {
        hphm:"",
        gwsj: []
      }
      this.mapCenter = {lng: 112.93, lat: 27.83}
      this.points = []
      this.passcarDatas = []
    },
    addPoints () {
      const points = [];
      for (var i = 0; i < 1000; i++) {
        const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21}
        points.push(position)
      }
      // debugger
      this.points = points
    },
    getPassCarHandler() {
      // const hphm= '湘C00055'      
      const self = this  
      const gwsjParam = [
        moment(self.queryPassCar.gwsj[0]).format("YYYY-MM-DD HH:mm:ss"),
        moment(self.queryPassCar.gwsj[1]).format("YYYY-MM-DD HH:mm:ss"),
      ]
      const param = {
        needMap: true,
        hphm: self.queryPassCar.hphm,
        gwsj: gwsjParam
      }
      self.doGetPassCarData(param)
    },
    doGetPassCarData(param) {      
      const self = this
      self.points = []
      self.resetCenter = true
      passCarApi.get(param).then(re => {
        self.passcarDatas = re.content
        self.passcarDatas.map(item => {
          if (item.longitude !== null && item.latitude !== null) {
            self.points.push({lng: item.longitude, lat: item.latitude})
            if(self.resetCenter) {
              self.mapCenter = {lng: item.longitude, lat: item.latitude}
              self.resetCenter = false
            }
          }
        })
        self.mapDialogVisible = true
      }).catch(error => {

      })
    },
    getMarkerLable(val, index) {
      return index + 1
    },
    //地图点位数据改变
    pointChangeHandler(val){
      console.log("change point data")
    },
    //地图弹窗显示数据改变
    pointDataChangeHandler(row, column, event){
      self = this
      self.queryPassCar.gwsj = [new Date(row.bjsj).toMidnight(), new Date(row.bjsj).daysAgo(-1)]
      self.queryPassCar.hphm = row.hphm
      self.getPassCarHandler()      
    },
    // 区间时间控件时间修改
    changeDataRangeValueHandler(values) {
      changeDataRangeValue(values)
    }
  }
}
</script>

<style scoped>

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
#MapBox {
  width: 100%;
  height: 100%;
  padding: 0px;
  position: absolute;
  // bottom: 80px;
  // top: 80px;
  ;
}
/* 去除地图上，左下字体标注 */
/deep/ .anchorBL{
  display:none;
}
.map {
  width: 100%;
  height: 500px;
}
</style>
