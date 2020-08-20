<template>
  <div id="MapBox">
    <baidu-map class="map" :center="mapCenter" :zoom="mapZoom" :scrollWheelZoom="true">
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!-- 图层显示控制图层 -->
      <bm-control anchor="BMAP_ANCHOR_BOTTOM_LEFT" :offset="{width: 200, height:10}">
        <el-popover placement="top" width="250" style="margin-left: 20px;">
          <el-checkbox-group v-model="daoLuJianKongCheckBoxGroup" @change="handleDaoLuJianKongCheckBoxGroupChange"
            size="small">
            <el-checkbox label="CCTV"> 监控 </el-checkbox>
            <el-checkbox label="TGS"> 卡口 </el-checkbox>
            <el-checkbox label="TMS"> 电警 </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" slot="reference" round size="medium ">
            监控设备
          </el-button>
        </el-popover>

        <el-popover placement="top" width="560" style="margin-left: 20px;" trigger="manual"
          v-model="luKuangPopoverVisible">
          <el-checkbox-group v-model="roadConditionCheckList" @change="handleRoadConditionCheckBoxGroupChange"
            size="small">
            <el-checkbox label="roadCondition" :checked="true"> 监视路况 </el-checkbox>
            <el-checkbox label="selectCamera" :checked="false"> 选择相机 </el-checkbox>
            <el-checkbox label="selectVms" :checked="false"> 选择诱导屏 </el-checkbox>
            <el-checkbox label="selectJt" :checked="false"> 选择信号灯 </el-checkbox>
            <el-checkbox label="handleMark" :checked="false"> 操作 </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" slot="reference" round @click="getRoadLinkInfo()" size="medium ">
            路况监控
          </el-button>
        </el-popover>
        <el-popover placement="top" width="190" style="margin-left: 20px;">
          <el-checkbox-group v-model="xinHaoSheBeiCheckBoxGroup" @change="handleDaoLuJianKongCheckBoxGroupChange"
            size="small" style="text-align: center;">
            <el-checkbox label="VMS"> 诱导屏 </el-checkbox>
            <el-checkbox label="JT"> 信号灯 </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" slot="reference" round size="medium ">
            信号设备
          </el-button>
        </el-popover>
        <el-popover placement="top" width="580" style="margin-left: 20px;">
          <el-checkbox-group v-model="boundaryCountyCheckList" @change="handleBoundaryCountyChange">
            <el-checkbox v-for="(item, index) in boundaryButtonValues" :key="index" :label="item.key">
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" slot="reference" round @click="getBoundaryPoints()">
            行政区划
          </el-button>
        </el-popover>
        <el-popover placement="top" width="880" style="margin-left: 20px;">
          <el-checkbox-group v-model="boundaryAdministrativeCheckList" @change="handleBoundaryAdministrativeChange">
            <el-checkbox v-for="(item, index) in administratives" :key="index" :label="item.key">
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" slot="reference" round>
            警务辖区
          </el-button>
        </el-popover>
        <el-popover placement="top" width="160" style="margin-left: 20px;">
          <el-checkbox-group v-model="policeCheckList" @change="handlePoliceChange">
            <el-checkbox v-for="(item, index) in policeType" :key="index" :label="item.key">
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" slot="reference" round size="medium ">
            路面警力
          </el-button>
        </el-popover>
      </bm-control>
      <bm-point-collection v-for="(item,index) in cameraPointCollections" :key="index" :points="item.points"
        :show="item.visable" shape="BMAP_POINT_SHAPE_CIRCLE" :color="item.color" size="BMAP_POINT_SIZE_BIG"
        @click="clickHandler" />
      <bm-polyline v-for="(item) in boundaryPoints" :key="item.key" :path="item.path" stroke-color="red"
        :show="item.visable" :stroke-opacity="0.5" :stroke-weight="6"></bm-polyline>
      <bm-polyline v-for="(item) in boundaryAdministrative" :key="item.key" :path="item.path" stroke-color="#FF7F27"
        :show="item.visable" :stroke-opacity="0.5" :stroke-weight="6"></bm-polyline>
      <bm-polyline v-for="(item) in roadLinks.paths" :key="item.key" :ref="item.key" :path="item.locations"
        :stroke-color="item.color" :stroke-opacity="0.4" :stroke-weight="4" :show="roadLinksShow" />
      <bm-polyline v-for="(item) in roadLinkStatus" :key="item.key" :ref="item.key" :path="item.locations"
        :stroke-color="item.color" :stroke-opacity="1" :stroke-weight="4" :show="roadLinksShow" />

      <bm-info-window :position="infoWindowCamera.position" :autoPan="true" :width="240" :height="240"
        title="实时视频" :show="infoWindowCamera.show" @close="infoWindowCameraClose"
        @open="infoWindowCameraOpen">
        <!-- <p v-text="infoWindowCamera.contents"></p> -->
        <div style="width:240px; height:180px;">
          <viss-video ref="videoRef" width="240" height="180" :autoStart="false"
            :cameraId="infoWindowCamera.cameraid" />
        </div>
        <el-button @click="startVideo">startVideo</el-button>
      </bm-info-window>
      <bm-info-window :position="infoWindowVMS.position" :autoPan="true" :width="560" :height="510" title="诱导屏实况"
        :show="infoWindowVMS.show" @close="infoWindowVMSClose" @open="infoWindowVMSOpen">
        <el-image @dblclick="configGuidanceScreen(infoWindowVMS)" style="zoom: 0.8; width:700px;height:600px"
          :src="infoWindowVMS.ydImageUrl" />
      </bm-info-window>

      <bm-point-collection :points="gpsPoliceVehiclePoints" shape="BMAP_POINT_SHAPE_CIRCLE" color="#fa937e"
        size="BMAP_POINT_SIZE_BIG" @click="clickGpsPointHandler" :show="gpsPoliceVehiclePointsShow" />

      <bm-point-collection :points="gpsPolicemanPoints" shape="BMAP_POINT_SHAPE_CIRCLE" color="#fa937e"
        size="BMAP_POINT_SIZE_BIG" @click="clickGpsPointHandler" :show="gpsPolicemanPointsShow" />
      <!-- <bm-marker v-for="(item, index) in gpsPoliceVehiclePoints" :key="index"
        :position="{lng: item.lng, lat: item.lat }" :icon="policeVehicleIcon" :show="gpsPoliceVehiclePointsShow">
      </bm-marker>

      <bm-marker v-for="(item,index) in gpsPolicemanPoints" :key="index" :position="{ lng: item.lng, lat: item.lat }"
        :icon="policemanIcon" :show="gpsPolicemanPointsShow">
      </bm-marker> -->
      <!-- 
      <bml-marker-clusterer :markers="gpsPolicemanMarkersForMarkerClusterer" />

      <bml-marker-clusterer :markers="gpsPoliceVehicleMarkersForMarkerClusterer" />

      <bml-marker-clusterer :markers="cameraMarkersForMarkerClusterer" :minClusterSize=5 :maxZoom="15" /> -->
      <bml-drawing-manger ref="refDrawingManger" :isOpen="drawingEnable" :drawingType="drawingType"
        :overlaycomplete="handleOverlaycomplete" />
      <bm-marker v-for="(item) in selectedPoints" :key="item.key" :position="item.position" :show="true"
        :icon="item.icon" :onClick="handleCameraMarkClick" :onMouseover="handleCameraMarkOnMouseover" :data="item.data">
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
// import { BaiduMap, BmOverviewMap, BmNavigation, BmMapType, BmScale, BmControl, BmlLushu } from '@/components/MapBaidu/index.js'
import car from '@/assets/images/car.png'
import policeVehicleImage from '@/assets/images/icons/police_vehicle.png'
import policemanImage from '@/assets/images/icons/policeman.png'
import cctvImage from '@/assets/images/icons/cctv.png'
import tgsImage from '@/assets/images/icons/tgs.png'
import tmsImage from '@/assets/images/icons/tms.png'
import vmsImage from '@/assets/images/icons/vms.png'
import jtImage from '@/assets/images/icons/jt.png'
import { getAllMarks } from '@/api/gis/gisMark'
import { getBoundary, getBoundaryCounty } from '@/api/gis/boundary'
import { getRoadLinkInfo, getRoadLinkInfoColorCode, getGuidanceScreens } from '@/api/gis/trafficSignal'
import dutyGpsCurrentApi from '@/api/duty/gpsCurrent'
import trafficLights from '@/api/assetsInfo/trafficLights'
import pointTypeEnum from '@/api/gis/gisPointType'
import departmentJsonApi from '@/api/gis/departmentJson'
import gitBoundaryCounty from '@/api/gis/gitBoundaryCounty'
import VissVideo from '@/components/VissVideo'
import moment from 'moment'
// import DrawingManager from '@/components/MapBaidu/lib/DrawingManager.js'


export default {
  name: "composite",
  components: { VissVideo },
  data() {
    return {
      mapZoom: 14,
      mapCenter: { lng: 112.94, lat: 27.86 },
      play: true,
      path: [{ lng: 112.93, lat: 27.83 }, { lng: 112.94, lat: 27.83 }, { lng: 112.95, lat: 27.83 }, { lng: 112.95, lat: 27.93 }, { lng: 112.94, lat: 27.93 }, { lng: 112.93, lat: 27.83 }],
      /** 警车图标 */
      policeVehicleIcon: {
        url: policeVehicleImage,
        size: { width: 32, height: 32 },
        opts: { anchor: { width: 16, height: 16 } }
      },
      /** 警员图标 */
      policemanIcon: {
        url: policemanImage,
        size: { width: 32, height: 32 },
        opts: { anchor: { width: 16, height: 16 } }
      },
      cctvIcon: {
        url: cctvImage,
        size: { width: 32, height: 32 },
        opts: { anchor: { width: 16, height: 16 } }
      },
      tgsIcon: {
        url: tgsImage,
        size: { width: 32, height: 32 },
        opts: { anchor: { width: 16, height: 16 } }
      },
      tmsIcon: {
        url: tmsImage,
        size: { width: 32, height: 32 },
        opts: { anchor: { width: 16, height: 16 } }
      },
      vmsIcon: {
        url: vmsImage,
        size: { width: 32, height: 32 },
        opts: { anchor: { width: 16, height: 16 } }
      },
      jtIcon: {
        url: jtImage,
        size: { width: 32, height: 32 },
        opts: { anchor: { width: 16, height: 16 } }
      },
      gpsPolicemanPoints: [],//警员定位信息
      gpsPoliceVehiclePoints: [],//警车定位信息
      gpsPolicemanPointsShow: false,//警员点位是否显示
      gpsPoliceVehiclePointsShow: false, // 警车点位是否显示
      gpsPolicemanMarkersForMarkerClusterer: [],
      gpsPoliceVehicleMarkersForMarkerClusterer: [],
      cameraPointCollections: [{ pointsType: '', points: [], color: '', visable: true }],
      cameraMarkersForMarkerClusterer: [],
      pointsType: '',
      boundaryPoints: [], // 行政区划线数据
      boundaryButtonValues: gitBoundaryCounty.BOUNDARY_BUTTON_VALUES, // 行政区划按钮数据
      boundaryCountyCheckList: [], // 行政区划checklist 选择值绑定
      boundaryAdministrativeCheckList: [], // 辖区checklist 数据
      boundaryAdministrative: [], // 辖区点位数据
      administratives: [], // 辖区数据
      roadConditionCheckList: [], // 路况监视check选择数据
      infoWindowCamera: {
        show: false,
        position: {},
        cameraid: ''
      },
      infoWindowVMS: {
        show: false,
        position: {},
        /** 诱导屏编号 */
        ydId: '',
        /** 诱导屏现状图片 */
        ydImageUrl: ''
      },
      roadLinks: {},
      roadLinkStatus: [],
      timer: 0,
      timerGps: 0,
      roadLinksShow: true,
      daoLuJianKongCheckBoxGroup: [],// 道路监控 控制按钮选中值
      xinHaoSheBeiCheckBoxGroup: [], // 信号设备选中值
      daoLuJianKongCheckBoxGroupData: [],
      policeType: [{ key: 'policeman', label: '警员' }, { key: 'police_vehicle', label: '警车' }],
      policeCheckList: [],
      drawingEnable: false,
      drawingType: 'circle',
      selectedPoints: [],
      toSelectPointsType: [],
      drawingLayer: {},// 画图工具添加的图层
      luKuangPopoverVisible: false// 路况弹窗是否显示
    }
  },
  watch: {
  },
  mounted() {
    this.getBoundaryAdministrative()
    this.initPoints()
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
    window.clearInterval(this.timerGps);
  },
  beforeRouteLeave() {
    window.clearInterval(this.timer);
    window.clearInterval(this.timerGps);
  },
  methods: {
    addZoom(level) {
      this.zoom = level
    },
    reset() {
      this.play = false
    },
    initPoints() {
      this.getAllMarks(pointTypeEnum.POINT_TYPE_CCTV)
      this.getAllMarks(pointTypeEnum.POINT_TYPE_TGS)
      this.getAllMarks(pointTypeEnum.POINT_TYPE_TMS)
      this.getTrafficLightsPoints()
      this.getGuidanceScreens()
    },
    /**
     * 摄像机点位控制条改变选中事件
     */
    handleDaoLuJianKongCheckBoxGroupChange(val) {
      const self = this
      /** 遍历数组，判断是否已经存在数据，否则获取点位数据 */
      val.forEach(type => {
        if (self.cameraPointCollections.findIndex(collection => {
          return collection["pointsType"] === type
        }) === -1) {
          if (type === pointTypeEnum.POINT_TYPE_CCTV || type === pointTypeEnum.POINT_TYPE_TGS || type === pointTypeEnum.POINT_TYPE_TMS) {
            this.getAllMarks(type)
          } else if (type === pointTypeEnum.POINT_TYPE_JT) {
            this.getTrafficLightsPoints()
          } else if (type === pointTypeEnum.POINT_TYPE_VMS) {
            this.getGuidanceScreens()
          }
        }
      })
      /** 遍历点位数组，如果不存在与参数集合中，则不显示 */
      self.cameraPointCollections.forEach(item => {
        if (val.indexOf(item['pointsType']) === -1) {
          item.visable = false
        } else {
          item.visable = true
        }
      })
      self.mapZoom = 14
      self.mapCenter = { lng: 112.94, lat: 27.86 }
    },
    /**
     * 获取相机设备点位信息，
     */
    getAllMarks(type) {
      const self = this
      const param = { marktype: type }
      const cameraPointCollection = { pointsType: type, points: [], color: pointTypeEnum.getPointColor(type), visable: false }
      getAllMarks(param).then(res => {
        // self.points = res
        cameraPointCollection.points = res
        self.cameraPointCollections.push(cameraPointCollection)


        // self.cameraMarkersForMarkerClusterer = res
        // this.points.push({lng: res[0].lng, lat: res[0].lat, data: {'id':'ids'}})
        // res.map(item => {
        //   this.points.push(item)
        // })
        // self.pointsType = type
        // self.mapZoom = 14
        // self.mapCenter = { lng: 112.94, lat: 27.86 }
      }).catch(e => {
        console.error(e)
      })
    },
    clickHandler(target, point) {
      const self = this
      if (self.pointsType === pointTypeEnum.POINT_TYPE_VMS) {
        self.infoWindowVMS.show = true
        self.infoWindowVMS.position = point.point
        self.infoWindowVMS.ydId = point.point.data.YDId,
          /** 诱导屏现状图片 */
          self.infoWindowVMS.ydImageUrl = point.point.data.YDImageUrl
      } else if (self.pointsType === pointTypeEnum.POINT_TYPE_TGS || self.pointsType === pointTypeEnum.POINT_TYPE_TMS || self.pointsType === pointTypeEnum.POINT_TYPE_CCTV) {
        self.infoWindowCamera.show = true
        // this.infoWindowCamera.contents = point.point.data
        self.infoWindowCamera.position = point.point
        // this.infoWindowCameraid = '731000519100101'
      } else if (self.pointsType === pointTypeEnum.POINT_TYPE_JT) {

      }
    },
    infoWindowCameraClose(e) {
      this.$refs["videoRef"].dinit()
    },
    infoWindowCameraOpen(e) {

    },
    infoWindowVMSClose(e) {
      this.$refs["videoRef"].dinit()
    },
    infoWindowVMSOpen(e) {

    },
    clear(e) {

    },
    startVideo() {
      this.$refs["videoRef"].init()
      // this.$refs["videoRef"].startVideo('731000519100101')
      this.$refs["videoRef"].startVideo(this.infoWindowCamera.cameraid)
    },
    /** 获取路段信息 */
    getRoadLinkInfo() {
      this.luKuangPopoverVisible = !this.luKuangPopoverVisible
      if (this.roadLinks.paths) {
        return
      }
      getRoadLinkInfo().then(res => {
        this.roadLinks.paths = res
        this.roadLinksShow = true
        this.mapZoom = 14
        this.mapCenter = { lng: 112.94, lat: 27.86 }
        this.$nextTick(o => {
          this.getRoadLinkInfoColorCode()
        })
      })
    },
    /** 获取线路颜色，即拥堵情况 */
    getRoadLinkInfoColorCode() {
      getRoadLinkInfoColorCode().then(res => {
        const self = this
        self.roadLinkStatus = res
        // res.forEach(element => {
        //   self.$refs[element.key][0].originInstance.setStrokeColor(element.color)
        //   return
        // });
        this.timer = setInterval(this.getRoadLinkInfoColorCode, 60 * 1000);
      })
    },
    /** 获取诱导屏点位信息 */
    getGuidanceScreens() {
      const self = this
      getGuidanceScreens().then(res => {
        // console.log(res)
        // this.points = res
        // this.pointsType = pointTypeEnum.POINT_TYPE_VMS
        // this.mapZoom = 14
        // this.mapCenter = { lng: 112.94, lat: 27.86 }
        const cameraPointCollection = { pointsType: pointTypeEnum.POINT_TYPE_VMS, points: [], color: pointTypeEnum.getPointColor(pointTypeEnum.POINT_TYPE_VMS), visable: false }
        cameraPointCollection.points = res
        self.cameraPointCollections.push(cameraPointCollection)
      }).catch(err => {
        console.log(err)
      })
    },
    configGuidanceScreen() {

    },
    handleBoundaryCountyChange(val) {
      this.boundaryPoints.forEach(item => {
        if (val.indexOf(item.key) !== -1) {
          item.visable = true
        } else {
          item.visable = false
        }
      })
      this.mapZoom = 11
      this.mapCenter = { lng: 112.73, lat: 27.74 }
    },
    /** 获取行政区划 */
    getBoundaryPoints() {
      getBoundary().then(res => {
        const boundaryPoint = { key: gitBoundaryCounty.BOUNDARY_POINTS_XIANG_TANS_SHI, path: res, visable: false }
        this.boundaryPoints.push(boundaryPoint)
      })
      getBoundaryCounty().then(res => {
        this.boundaryPoints.push({ key: gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_SHAO_SHAN_SHI, path: res[gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_SHAO_SHAN_SHI], visable: false })
        this.boundaryPoints.push({ key: gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_XIANG_TAN_XIAN, path: res[gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_XIANG_TAN_XIAN], visable: false })
        this.boundaryPoints.push({ key: gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_XIANG_TAN_XIAN2, path: res[gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_XIANG_TAN_XIAN2], visable: false })
        this.boundaryPoints.push({ key: gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_XIANG_XIANG_SHI, path: res[gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_XIANG_XIANG_SHI], visable: false })
        this.boundaryPoints.push({ key: gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_YUE_TANG_QU, path: res[gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_YUE_TANG_QU], visable: false })
        this.boundaryPoints.push({ key: gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_YU_HU_QU, path: res[gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_YU_HU_QU], visable: false })
        this.boundaryPoints.push({ key: gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_YU_HU_QU2, path: res[gitBoundaryCounty.BOUNDARY_COUNTY_POINTS_YU_HU_QU2], visable: false })
      })
    },
    /** 辖区选择事件 */
    handleBoundaryAdministrativeChange(val) {
      const self = this
      self.boundaryAdministrative.forEach(item => {
        if (val.indexOf(item.key) !== -1) {
          item.visable = true
        } else {
          item.visable = false
        }
      })
      self.mapZoom = 14
      self.mapCenter = { lng: 112.94, lat: 27.86 }
    },
    /** 辖区数据获取 */
    getBoundaryAdministrative() {
      departmentJsonApi.getAll().then(res => {
        res.forEach(item => {
          this.administratives.push({ key: item.department.departid, label: item.department.departname })
          this.boundaryAdministrative.push({ key: item.department.departid, path: item.path, visable: false })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    /** 获取信号灯的位置信息 */
    getTrafficLightsPoints() {
      const self = this
      trafficLights.getAllForGis().then(res => {
        // this.points = res
        // this.pointsType = pointTypeEnum.POINT_TYPE_JT
        // this.mapZoom = 14
        // this.mapCenter = { lng: 112.94, lat: 27.86 }
        const cameraPointCollection = { pointsType: pointTypeEnum.POINT_TYPE_JT, points: [], color: pointTypeEnum.getPointColor(pointTypeEnum.POINT_TYPE_JT), visable: false }
        cameraPointCollection.points = res
        self.cameraPointCollections.push(cameraPointCollection)
      })
    },
    // /** 获取警车数据 */
    // getPoliceVehiclePoints() {
    //   window.clearInterval(this.timerGps)
    //   // this.gpsPoliceVehiclePointsShow = true
    //   this.getGPSPoint()
    //   // this.$nextTick(o => {
    //   //   this.timerGps = setInterval(this.getGPSPoint("policeman"), 60 * 1000);
    //   // })
    // },
    // /** 获取警员位置 */
    // getPolicemanPoints() {
    //   window.clearInterval(this.timerGps)
    //   // this.gpsPolicemanPoints = true
    //   this.getGPSPoint()
    //   // this.$nextTick(o => {
    //   //   this.timerGps = setInterval(this.getGPSPoint("police_vehicle"), 60 * 1000);
    //   // })
    // },
    /** 获取警员和警车的实时定位信息 */
    getGPSPoint() {
      const self = this
      const endTime = new Date();
      const startTime = this.getPassMinuteTime(500000)
      const updateTime = [startTime, endTime]
      const param = { updateTime: updateTime }
      dutyGpsCurrentApi.queryAllForGis(param).then(res => {
        self.gpsPolicemanPoints = res["policeman"]//警员定位信息
        self.gpsPoliceVehiclePoints = res["police_vehicle"]//警车定位信息
        // self.gpsPolicemanMarkersForMarkerClusterer = res["policeman"]
        // self.gpsPoliceVehicleMarkersForMarkerClusterer = res["police_vehicle"]
        // if (objectType === "policeman") {
        //   this.gpsPoints = res["policeman"]
        // } else if (objectType === "police_vehicle") {
        //   this.gpsPoints = res["police_vehicle"]
        // }

      })
    },
    /** 路面警力 控制按钮选择事件 */
    handlePoliceChange(val) {
      /** 如果警车和警员都不监视，则停止监视请求 */
      if (val.indexOf('policeman') === -1 && val.indexOf('police_vehicle') === -1) {
        window.clearInterval(this.timerGps)
      }
      else {
        // if (this.timerGps === 0) {
        //   this.getGPSPoint()
        // }        
        if (this.timerGps === null || this.timerGps === 0) {
          this.getGPSPoint()
          this.timerGps = setInterval(this.getGPSPoint, 60 * 1000);
        }
      }
      /** 如果存在警员监视，则开始警员点位显示功能 */
      if (val.indexOf('policeman') !== -1) {
        this.gpsPolicemanPointsShow = true
      } else {
        this.gpsPolicemanPointsShow = false
      }
      /** 如果存在警车点位监视，则开启警车点位显示功能 */
      // debugger
      if (val.indexOf('police_vehicle') !== -1) {
        this.gpsPoliceVehiclePointsShow = true
      } else {
        this.gpsPoliceVehiclePointsShow = false
      }
    },
    clickGpsPointHandler(target, point) {
      console.log(point)
    },
    getPassMinuteTime(value) {
      var date = new Date();     //1. js获取当前时间
      var min = date.getMinutes();  //2. 获取当前分钟
      date.setMinutes(min - value);  //3. 设置当前时间+10分钟：把当前分钟数+10后的值重新设置为date对象的分钟数
      var y = date.getFullYear();
      var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
      var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      var s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      var formatdate = y + '-' + m + '-' + d + " " + h + ":" + f + ":" + s;
      return new Date(formatdate)
    },
    /** 路况监视check group 选择事件 */
    handleRoadConditionCheckBoxGroupChange(val) {
      // roadLinkShow roadCondition
      // if (val.indexOf('roadLinkShow') === -1) {
      //   this.roadLinks.show = false
      // } else {
      //   this.roadLinks.show = true
      // }
      this.toSelectPointsType = val

      if (val.indexOf('roadCondition') === -1) {
        window.clearInterval(this.timer);
        this.roadLinksShow = false
      } else {
        this.roadLinksShow = true
        this.timer = setInterval(this.getRoadLinkInfoColorCode, 60 * 1000);
      }

      if (val.indexOf('selectCamera') !== -1 || val.indexOf('selectVms') !== -1 || val.indexOf('selectJt') !== -1) {
        this.drawingEnable = true
      } else {
        this.drawingEnable = false
        this.doClearDrawingLayer()
      }
      if (val.indexOf('handleMark') !== -1) {
        this.drawingEnable = false
      } else {
        this.drawingEnable = true
      }
      // selectVms selectJt
    },
    handleOverlaycomplete(e) {
      const self = this
      // if (!self.drawingLayer) {
      this.doClearDrawingLayer()
      // }
      self.drawingLayer = e.overlay
      const radius = e.overlay.getRadius()
      const center = e.overlay.getCenter()

      self.cameraPointCollections.forEach(item => {
        // if (val.indexOf('selectCamera') !== -1 || val.indexOf('selectVms') !== -1 || val.indexOf('selectJt') !== -1) {
        if (this.toSelectPointsType.indexOf('selectCamera') === -1) {
          if (item.pointsType === pointTypeEnum.POINT_TYPE_CCTV
            || item.pointsType === pointTypeEnum.POINT_TYPE_TGS
            || item.pointsType === pointTypeEnum.POINT_TYPE_TMS) {
            return
          }
        }
        if (this.toSelectPointsType.indexOf('selectVms') === -1) {
          if (item.pointsType === pointTypeEnum.POINT_TYPE_VMS) {
            return
          }
        }
        if (this.toSelectPointsType.indexOf('selectJt') === -1) {
          if (item.pointsType === pointTypeEnum.POINT_TYPE_JT) {
            return
          }
        }
        let icon = {}
        if (item.pointsType === pointTypeEnum.POINT_TYPE_CCTV) {
          icon = self.cctvIcon
        } else if (item.pointsType === pointTypeEnum.POINT_TYPE_TGS) {
          icon = self.tgsIcon
        } else if (item.pointsType === pointTypeEnum.POINT_TYPE_TMS) {
          icon = self.tmsIcon
        } else if (item.pointsType === pointTypeEnum.POINT_TYPE_VMS) {
          icon = self.vmsIcon
        } else if (item.pointsType === pointTypeEnum.POINT_TYPE_JT) {
          icon = self.jtIcon
        }

        item.points.forEach(o => {
          let pointo = new BMap.Point(o.lng, o.lat)
          if (BMapLib.GeoUtils.getDistance(pointo, center) < radius) {
            // selectedPoints: [{ position: { lng: item.lng, lat: item.lat }, icon: Object }]
            self.selectedPoints.push({ key: o.data.markid, position: { lng: o.lng, lat: o.lat }, data: { data: o.data, pointType: item.pointsType }, icon: icon })
          } else {
          }
          pointo = null
        })
      })
    },
    /** 清除之前的图层 */
    doClearDrawingLayer() {
      let self = this
      self.selectedPoints = []
      if (self.drawingLayer instanceof BMap.Circle) {
        self.$refs['refDrawingManger'].map.removeOverlay(self.drawingLayer)
      }
    },
    /** camera mark 点击事件 */
    handleCameraMarkClick(e, data, position) {
      const self = this
      if (data.pointType === pointTypeEnum.POINT_TYPE_CCTV
        || data.pointType === pointTypeEnum.POINT_TYPE_TGS
        || data.pointType === pointTypeEnum.POINT_TYPE_TMS) {
        self.infoWindowCamera = {
          show: true,
          position: position,
          cameraid: data.data.deviceInfo.username === null ? '' : data.data.deviceInfo.username
        }
      }
      else if (data.pointType === pointTypeEnum.POINT_TYPE_VMS) {
        self.infoWindowVMS.show = true
        self.infoWindowVMS.position = position
        self.infoWindowVMS.ydId = data.data.YDId
        self.infoWindowVMS.ydImageUrl = data.data.YDImageUrl
      }
    },
    handleCameraMarkOnMouseover(e, data) {
      console.log(e)
      console.log(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#MapBox {
  width: 100%;
  height: 100%;
  padding: 0px;
  position: absolute;
  // bottom: 80px;
  // top: 80px;
}
.map {
  width: 100%;
  height: 100%;
}
</style>

