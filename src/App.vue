<template>
  <div id="app">
    <router-view />
  </div>
</template>

<!--<script type="text/javascript" src="./utils/offline_baidu_map.js" >
</script> -->
<script>
// import { BaiduMap, BmOverviewMap, BmNavigation, BmMapType, BmScale, BmControl, BmlLushu } from '@/components/MapBaidu/index.js'

export default {
  name: 'App',
  // components: { BaiduMap, BmOverviewMap, BmNavigation, BmMapType, BmScale, BmControl, BmlLushu }
  // ,
  // mounted() {
  //   const oScript = document.createElement('script');
  //   oScript.id = 'map_api_js'
  //   oScript.type = 'text/javascript'
  //   oScript.src = '../utils/map/bmap_offline_api_v3.0_min.js'
  //   document.body.appendChild(oScript)
  // }
  created() {
    // // 在页面加载时读取sessionStorage
    // if (sessionStorage.getItem('subsystem')) {
    //   // this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    //   this.$store.dispatch('ChangeSubsystem', sessionStorage.getItem('subsystem')).then(() => {})
    //   // debugger
    // }
    // // 在页面刷新时将store保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('subsystem', this.$store.state.subsystem.subsystemId)
    // })
  }
}
</script>

