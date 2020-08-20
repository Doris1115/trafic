<template>
  <div id="amap" class="map" tabindex="0">
    <el-button />
  </div>
</template>

<script>

// import aaa from '@/components/amap/components/amap.vue'

export default {
  data() {
    return {
      map: {}
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
  },
  methods: {
    init() {
      this.map = new AMap.Map('amap', {
        viewMode: '3D',
        center: [113.439071, 23.155438],
        zoom: 3,
        pitch: 0,
        zooms: [3, 20],
        expandZoomRange: true,
        doubleClickZoom: false,
        resizeEnable: true,
        showIndoorMap: false, //隐藏地图自带的室内地图图层
        features: ['bg', 'road', 'point'],//隐藏默认楼块
        layers: [
          new AMap.TileLayer({
            tileUrl: function (x, y, z) {
              // 本地存储时，从磁盘加载瓦片
              return offlineMap.baseUrl + '/tiles/' + z + '/' + x + '/' + y + '.png';
              // mongo存储时，从mongo加装瓦片
              // return '/tile-loader/map/viewTile/amap?zoom='+z+'&x='+x+'&y='+y;
            },
            zIndex: 0
          })
        ]
      });
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        this.map.addControl(new AMap.ToolBar());

      // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        // this.map.addControl(new AMap.Scale());

      // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        this.map.addControl(new AMap.OverView({ isOpen: true }));

      // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
      //   this.map.addControl(new AMap.MapType());

      // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        // this.map.addControl(new AMap.Geolocation());
    }
  }
}
</script>
<style type="text/css">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  overflow: hidden;
}
.map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}
</style>