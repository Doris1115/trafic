<template>
  <div id="MapBox">
    <!-- <el-button @click="login">login</el-button>
    <el-button @click="logout">loginOut</el-button>
    <el-button @click="loginEx">loginEx</el-button>
    <el-button @click="GetCamList">GetCamList</el-button> -->
    <el-button @click="startVideo">startVideo</el-button>    
    <viss-video ref="videoRef" width="480" height="360" :cameraId="cameraId"/>
  </div>
</template>

<script>
import VissVideo from '@/components/VissVideo'

export default {
  components: { VissVideo },
  data() {
    return {
      cameraId: ""
    }
  },
  mounted() {
    
  },
  beforeDestroy() {
  },
  created() {
    
  },
  methods: {    
    //开始视频方法
    startVideo() {
        try {
          this.cameraId = '731000519100101'
            // this.ocxobj.StartLiveVideo('731000519100101', 0)
            // this.ocxobj2.StartLiveVideo('731000519110101', 0);
            // this.ocxobj3.StartLiveVideo('731000519120101', 0);
            // this.ocxobj4.StartLiveVideo('731000519130101', 0);
            // this.ocxobj5.StartLiveVideo('731000519070101', 0);
            // this.ocxobj6.StartLiveVideo('731000519140101', 0);
            // console.log("开始实时视频成功")
        }
        catch (err) {
            console.log(err)
            // alert("开始实时视频失败！");
        }
    }
  }
}
</script>
