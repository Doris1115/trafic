<template>
  <div id="MapBox">
    <baidu-map class="map" :center="mapCenter" :zoom="mapZoom" :scrollWheelZoom="true">
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-control anchor="BMAP_ANCHOR_BOTTOM_LEFT" :offset="{width: 200, height:10}">
        
        <!-- <el-button type="primary" @click="addZoom(19)" round>缩放至最大</el-button>
        <el-button type="primary" @click="addZoom(12)" round>还原</el-button>
        <el-button type="primary" @click="addZoom(3)" round>缩放至最小</el-button> -->
        <el-button type="primary" @click="getAllMarks('CCTV')" round>监控</el-button>
        <el-button type="primary" @click="getAllMarks('TGS')" round>卡口</el-button>
        <el-button type="primary" @click="getAllMarks('TMS')" round>电警</el-button>
        <el-button type="primary" @click="getRoadLinkInfo()" round>{{ roadLinkButtonText }}</el-button>
        <el-button type="primary" @click="getGuidanceScreens()" round>诱导屏</el-button>
        <el-button type="primary" @click="getBoundaryPoints()" round>行政区划</el-button>
        <el-button type="primary" @click="getTrafficLightsPoints()" round>信号灯</el-button>
        <el-button type="primary" @click="getPoliceVehiclePoints()" round>警员</el-button>
        <el-button type="primary" @click="getPolicemanPoints()" round>警车</el-button>
      </bm-control>
      <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_CIRCLE" color="#fa937e" size="BMAP_POINT_SIZE_BIG"  @click="clickHandler" />
      <!-- <bm-polyline :path="boundaryPoints" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="6"></bm-polyline> -->
      <bm-polyline :path="boundaryCountyPointsShaoShanShi" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="4"></bm-polyline>
      <bm-polyline :path="boundaryCountyPointsXiangTanXian" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="4"></bm-polyline>
      <bm-polyline :path="boundaryCountyPointsXiangTanXian2" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="4"></bm-polyline>
      <bm-polyline :path="boundaryCountyPointsXiangXiangShi" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="4"></bm-polyline>
      <bm-polyline :path="boundaryCountyPointsYueTangQu" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="4"></bm-polyline>
      <bm-polyline :path="boundaryCountyPointsYuHuQu" stroke-color="red" :stroke-opacity="0.5" :stroke-weight="4"></bm-polyline>
      <bm-polyline v-for="(item) in roadLinks" :key="item.key" :ref="item.key" :path="item.locations" :stroke-color="item.color" :stroke-opacity="0.5" :stroke-weight="4"/>
      <bm-info-window :position="infoWindowCamera.position" :autoPan="true" :width="240" :height="240" title="Info Window Title" :show="infoWindowCamera.show" @close="infoWindowCameraClose" @open="infoWindowCameraOpen">
        <!-- <p v-text="infoWindowCamera.contents"></p> -->
        <div style="width:240px; height:180px;">
          <viss-video ref="videoRef" width="240" height="180" :autoStart="false" :cameraId="infoWindowCamera.cameraid"/>
        </div>        
        <el-button @click="startVideo">startVideo</el-button>  
      </bm-info-window>
      <bm-info-window :position="infoWindowVMS.position" :autoPan="true" :width="560" :height="510" title="诱导屏实况" :show="infoWindowVMS.show" @close="infoWindowVMSClose" @open="infoWindowVMSOpen">
        <el-image @dblclick="configGuidanceScreen(infoWindowVMS)"  style="zoom: 0.8; width:700px;height:600px" :src="infoWindowVMS.ydImageUrl"/>
      </bm-info-window>

      <bm-point-collection :points="gpsPoints" shape="BMAP_POINT_SHAPE_CIRCLE" color="#fa937e" size="BMAP_POINT_SIZE_BIG"  @click="clickGpsPointHandler" />
    </baidu-map>
  </div>
</template>

<script>
// import { BaiduMap, BmOverviewMap, BmNavigation, BmMapType, BmScale, BmControl, BmlLushu } from '@/components/MapBaidu/index.js'
import car from '@/assets/images/car.png'
import { getAllMarks } from '@/api/gis/gisMark'
import { getBoundary, getBoundaryCounty } from '@/api/gis/boundary'
import { getRoadLinkInfo, getRoadLinkInfoColorCode, getGuidanceScreens } from '@/api/gis/trafficSignal'
import dutyGpsCurrentApi from '@/api/duty/gpsCurrent'
import trafficLights from '@/api/assetsInfo/trafficLights'
import pointTypeEnum from '@/api/gis/gisPointType'
import VissVideo from '@/components/VissVideo'
import moment  from 'moment'


export default {
  components: { VissVideo },
  data() {
    return {
      mapZoom: 14,
      mapCenter: {lng: 112.94, lat: 27.86},
      play: true,
      path: [{lng: 112.93, lat: 27.83}, {lng: 112.94, lat: 27.83}, {lng: 112.95, lat: 27.83}, {lng: 112.95, lat: 27.93}, {lng: 112.94, lat: 27.93}, {lng: 112.93, lat: 27.83}],
      icon: {
        url: car,
        size: {width: 52, height: 26},
        opts: {anchor: {width: 27, height:13}}
      },
      points: [],
      pointsType: "",
      boundaryPoints: [],
      boundaryCountyPoints: [],
      boundaryCountyPointsShaoShanShi: [],
      boundaryCountyPointsXiangTanXian: [],
      boundaryCountyPointsXiangTanXian2: [],
      boundaryCountyPointsXiangXiangShi: [],
      boundaryCountyPointsYueTangQu: [],
      boundaryCountyPointsYuHuQu: [],     
      
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
      roadLinks: [],
      gpsPoints: [],
      timer: '',
      timerGps: '',
      roadLinkButtonStatus: "inMonitoring",
      roadLinkButtonText: "监视路况",
    }
  },
  mounted() {
    
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
    window.clearInterval(this.timerGps);    
  },
  methods: {
    addZoom (level) {
      this.zoom = level
    },
    reset () {
      this.play = false
    },
    /**
     * 获取相机设备点位信息，
     */
    getAllMarks(type){
      const self = this
      const param = {marktype: type}
      getAllMarks(param).then(res => {
        self.points = res
        // this.points.push({lng: res[0].lng, lat: res[0].lat, data: {'id':'ids'}})
        // res.map(item => {
        //   this.points.push(item)
        // })
        self.pointsType = type
        self.mapZoom = 14
        self.mapCenter = {lng: 112.94, lat: 27.86}
      }).catch(e => {
        console.error(e)
      })
    },
    clickHandler(target, point) {
      const self = this
      if(self.pointsType === pointTypeEnum.POINT_TYPE_VMS) {
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
      this.$refs["videoRef"].startVideo('731000519100101')
      // this.$refs["videoRef"].startVideo(this.infoWindowCameraid)
    },
    /** 获取路段信息 */
    getRoadLinkInfo() {
      if (this.roadLinkButtonStatus === "inMonitoring") {
        this.roadLinkButtonStatus = "outMonitoring"
        this.roadLinkButtonText = "监视路况"
        this.roadLinks = []
      }
      else {
        getRoadLinkInfo().then(res => {
          this.roadLinkButtonStatus = "inMonitoring"
          this.roadLinkButtonText = "停止监视"
          this.roadLinks = res
          this.mapZoom = 14
          this.mapCenter = {lng: 112.94, lat: 27.86}
          this.$nextTick(o => {
            this.timer = setInterval(this.getRoadLinkInfoColorCode, 60 * 1000);
          })          
        })
      }
      
    },
    getRoadLinkInfoColorCode() {
      getRoadLinkInfoColorCode().then(res => {
        // this.roadLinks = res
        const self = this
        res.forEach(element => {
          self.$refs[element.key][0].originInstance.setStrokeColor(element.color)
          return
        });
        console.log(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
      })
    },
    /** 获取诱导屏点位信息 */
    getGuidanceScreens() {
      getGuidanceScreens().then(res => {
        console.log(res)
        this.points = res
        this.pointsType = pointTypeEnum.POINT_TYPE_VMS
        this.mapZoom = 14
        this.mapCenter = {lng: 112.94, lat: 27.86}
      })
    },
    configGuidanceScreen() {

    },
    /** 获取行政区划 */
    getBoundaryPoints() {
      getBoundary().then(res => {
        this.boundaryPoints = res
      })

      getBoundaryCounty().then(res => {
        // this.boundaryCountyPoints = res
        this.boundaryCountyPointsShaoShanShi = res["shaoShanShi"]
        this.boundaryCountyPointsXiangTanXian = res["xiangTanXian"]
        this.boundaryCountyPointsXiangTanXian2 = res["xiangTanXian2"]
        this.boundaryCountyPointsXiangXiangShi = res["xiangXiangShi"]
        this.boundaryCountyPointsYueTangQu = res["yueTangQu"]
        this.boundaryCountyPointsYuHuQu = res["yuHuQu"]
      })
      this.mapZoom = 11
      this.mapCenter = {lng: 112.73, lat: 27.74}
    },
    /** 获取信号灯的位置信息 */
    getTrafficLightsPoints() {
      trafficLights.getAllForGis().then(res => {
        this.points = res
        this.pointsType = pointTypeEnum.POINT_TYPE_JT
        this.mapZoom = 14
        this.mapCenter = {lng: 112.94, lat: 27.86}
      })
    },
    /** 获取警车数据 */
    getPoliceVehiclePoints() { 
      window.clearInterval(this.timerGps);     
      this.$nextTick(o => {
        this.timerGps = setInterval(this.getGPSPoint("policeman"), 60 * 1000);
      }) 
    },
    /** 获取警员位置 */
    getPolicemanPoints() {
      window.clearInterval(this.timerGps);
      this.$nextTick(o => {
        this.timerGps = setInterval(this.getGPSPoint("police_vehicle"), 60 * 1000);
      }) 
      
    },
    getGPSPoint(objectType) {
      const endTime = new Date();
      const startTime = this.getPassMinuteTime(5)
      const updateTime = [startTime, endTime]
      const param = { updateTime: updateTime }
      dutyGpsCurrentApi.queryAllForGis(param).then(res => {
        if (objectType === "policeman") {
          this.gpsPoints = res["policeman"]
        } else if (objectType === "police_vehicle") {
          this.gpsPoints = res["police_vehicle"]
        }
      })
    },
    clickGpsPointHandler(target, point) {
      console.log(point)
    },
    getPassMinuteTime(value) {
      var date=new Date();     //1. js获取当前时间
      var min=date.getMinutes();  //2. 获取当前分钟
      date.setMinutes(min - value);  //3. 设置当前时间+10分钟：把当前分钟数+10后的值重新设置为date对象的分钟数
      var y = date.getFullYear();
      var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
      var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      var s = date.getSeconds() < 10 ? ('0' + date.getseconds()) : date.getSeconds()
      var formatdate = y+'-'+m+'-'+d + " " + h + ":" + f + ":" + s;
      return new Date(formatdate)
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
  ;
}
.map {
  width: 100%;
  height: 100%;
}
</style>
