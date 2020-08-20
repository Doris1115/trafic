<template>
  <div id="MapBox">
    <object id="videoActivex_id" ref="videoActivex" style="border:0px"
      classid="CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA" :width="width" :height="height"
      data="data:application/x-oleobject;base64,DK8aPGW+O0SoWbgm9ADz6gAJAACcMQAANSUAAA=="></object>
  </div>
</template>

<script>
import errorCode from './errorCode'


export default {
  // components: { BaiduMap, BmOverviewMap, BmNavigation, BmMapType, BmScale, BmControl, BmlLushu },
  data() {
    return {
      ocxobj: Object,
      userName: 'gkpt',
      passwd: '12345678',
      ccsIP: '43.27.134.20',
      ccsPort: '5060',
      ccsURI: 'viss',
      paramsxml: "<?xml version='1.0' encoding='UTF-8' ?><ExtParams><ConnMethod>0</ConnMethod></ExtParams>"
    }
  },
  props: {
    width: {
      type: String,
      default: '240'
    },
    height: {
      type: String,
      default: '180'
    },
    cameraId: {
      type: String,
      default: ''
    },
    autoStart: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    cameraId(value, oldValue) {
      if (value !== '') {
        this.startVideo(value)
      } else {

      }
    }
  },
  mounted() {
    if (this.autoStart) {
      this.init()
    }

  },
  beforeDestroy() {
    this.dinit()
  },
  created() {

  },
  methods: {
    init() {
      this.ocxobj = this.$refs["videoActivex"]
      let testCreateInstance = this.ocxobj.CreateInstance()
      if (testCreateInstance === 0) {
        console.log("初始化成功")
        window.addEventListener('OnLogin', this.loginHadler)
        // this.ocxobj.attachEvent('OnLogin',this.loginHadler)
        this.$nextTick(() => {
          this.login();
        });
      } else {
        console.log("初始化失败")
        console.log(testCreateInstance)
      }
    },
    dinit() {
      this.logout()
      this.destroyOcx()
    },
    //登陆方法
    login() {
      try {
        // this.ocxobj.Login('43.27.134.20', '5060', 'viss', 'gkpt', '12345678')
        this.ocxobj.Login(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd)
        console.log("登录成功")
      }
      catch (err) {
        console.log(err)
        console.log("登录失败: 失败原因" + err.description)
      }
    },
    //登陆拓展方法
    loginEx() {
      try {
        this.ocxobj.LoginEx(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd, this.paramsxml);
        console.log("登录成功")
      }
      catch (err) {
        console.log("登录失败 " + err.description);
      }
    },
    /**
     * 登录方法事件处理函数
     */
    loginHadler(result) {
      if (result === errorCode.SUCCESSED) {
        console.log("登录成功。");
        this.$emit("onLoginSuccess"); // 发送登录结果事件
      }
      else if (result === errorCode.NEED_UPGRADE) {
        console.log("登录失败," + errorCode.NEED_UPGRADE_MESSAGE)
        this.$emit("onLoginFaile", errorCode.NEED_UPGRADE_MESSAGE); // 发送登录结果事件
      }
      else {
        console.error("登录失败,错误码:" + result);
        this.$emit("onLoginFaile", "登录失败,错误码:" + result); // 发送登录结果事件
      }
    },
    /**
     * 注销登录
     */
    logout() {
      try {
        this.ocxobj.Logout()
        console.log("登出成功")
      }
      catch (err) {
        console.log("登出失败 " + err.description);
      }
    },
    /**
     * 销毁控件
     */
    destroyOcx() {
      try {
        this.ocxobj.DestroyInstance()
        console.log("撤销控件成功");
      }
      catch (err) {
        console.log("撤销控件失败 " + err.description);
      }
    },
    GetCamList() {
      var lResult = "";
      try {
        lResult = this.ocxobj.GetCamList();
        var cameraArr = lResult.split("@");
        for (var i = 0; i < cameraArr.length; i++) {
          var cameraInfo = cameraArr[i];
          console.log(cameraInfo)
        }
      }
      catch (err) {
        console.log("获取摄像机列表失败")
      }
    },
    /**
     * 开始视频方法
     * @param cameraId 摄像机编号
     */
    startVideo(cameraId) {
      try {
        console.log(cameraId)
        this.ocxobj.StartLiveVideo(cameraId, 0)
        console.log("开始实时视频成功")
        //TODO 这里是否需要先关闭已有的视频流 原始demo中没有发现需要消除的功能示例
      }
      catch (err) {
        console.log(err)
        // alert("开始实时视频失败！");
      }
    },
    /**
     * 带拓展方法的开启视频
     * @param  cameraId 相机编号
     * @paramsxml 拓展参数 ，--这里参数待定为xml，后面考虑改变为值参数
     */
    startVideoEx(cameraId, paramsxml) {
      var paramsxml = document.all.streamParams.value;
      try {
        var selectCamera = document.getElementById("camera");
        selectedIndex = selectCamera.selectedIndex;
        if (selectedIndex == -1) {
          // alert("No camera");
          return false;
        }
        cameraID = selectCamera.options(selectedIndex).value;
        cameraName = selectCamera.options(selectedIndex).text;

        VissCtrlImpl.StartLiveVideoEx(cameraID, 0, paramsxml);

        document.all.videoResult.innerHTML = "开始实时视频成功";
      }
      catch (err) {
        alert("开始实时视频失败！");
      }
    },
    /**
     * 停止视频
     */
    stopVideo() {
      try {
        this.ocxobj.StopLiveVideo()
      }
      catch (err) {
        console.err("停止实时视频失败！")
        console.err(err)
      }
    }
  }
}
</script>
