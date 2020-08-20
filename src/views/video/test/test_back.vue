<template>
  <div id="MapBox">
    <!-- <el-button @click="login">login</el-button>
    <el-button @click="logout">loginOut</el-button>
    <el-button @click="loginEx">loginEx</el-button>
    <el-button @click="GetCamList">GetCamList</el-button>
    <el-button @click="startVideo">startVideo</el-button>    
        <object 
        id="activexid"
        ref="mayActivex"
        style="border:0px"
        classid="CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA"
        width="240"
        height="180"
        data="data:application/x-oleobject;base64,DK8aPGW+O0SoWbgm9ADz6gAJAACcMQAANSUAAA=="
        >
        </object>
        <object 
        id="activexid2"
        ref="mayActivex2"
        style="border:0px"
        classid="CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA"
        width="240"
        height="180"
        data="data:application/x-oleobject;base64,DK8aPGW+O0SoWbgm9ADz6gAJAACcMQAANSUAAA=="
        >
        </object>
        <object 
        id="activexid3"
        ref="mayActivex3"
        style="border:0px"
        classid="CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA"
        width="240"
        height="180"
        data="data:application/x-oleobject;base64,DK8aPGW+O0SoWbgm9ADz6gAJAACcMQAANSUAAA=="
        >
        </object>
        <object 
        id="activexid4"
        ref="mayActivex4"
        style="border:0px"
        classid="CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA"
        width="240"
        height="180"
        data="data:application/x-oleobject;base64,DK8aPGW+O0SoWbgm9ADz6gAJAACcMQAANSUAAA=="
        >
        </object>
        <object 
        id="activexid5"
        ref="mayActivex5"
        style="border:0px"
        classid="CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA"
        width="240"
        height="180"
        data="data:application/x-oleobject;base64,DK8aPGW+O0SoWbgm9ADz6gAJAACcMQAANSUAAA=="
        >
        </object>
        <object 
        id="activexid6"
        ref="mayActivex6"
        style="border:0px"
        classid="CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA"
        width="240"
        height="180"
        data="data:application/x-oleobject;base64,DK8aPGW+O0SoWbgm9ADz6gAJAACcMQAANSUAAA=="
        >
        </object> -->
  </div>
</template>

<script>
// // import { BaiduMap, BmOverviewMap, BmNavigation, BmMapType, BmScale, BmControl, BmlLushu } from '@/components/MapBaidu/index.js'
// import car from '@/assets/images/car.png'


// export default {
//   // components: { BaiduMap, BmOverviewMap, BmNavigation, BmMapType, BmScale, BmControl, BmlLushu },
//   data() {
//     return {
//         ocxobj: Object,
//         ocxobj2: Object,
//         ocxobj3: Object,
//         ocxobj4: Object,
//         ocxobj5: Object,
//         ocxobj6: Object,
//         userName: 'gkpt',
//         passwd: '12345678',
//         ccsIP: '43.27.134.20',
//         ccsPort: '5060',
//         ccsURI: 'viss',
//         paramsxml: "<?xml version='1.0' encoding='UTF-8' ?><ExtParams><ConnMethod>0</ConnMethod></ExtParams>"
//     }
//   },
//   mounted() {
//     // this.ocxobj = document.getElementById('activex')
//     // let testCreateInstance = this.ocxobj.CreateInstance()
    
//     // console.log(testCreateInstance)
//     // console.log("初始化成功")
//     // this.ocxobj.attachEvent('OnClick',this.callBack)
//     // this.ocxobj.attachEvent('OnLogin', this.log)
//     // this.initActiveXObject()
//     // this.ocxobj = document.getElementById('activexid')
//     this.ocxobj = this.$refs["mayActivex"]
//     let testCreateInstance = this.ocxobj.CreateInstance()
//     if (testCreateInstance === 0) {
//         console.log("初始化成功")
//     } else {
//         console.log("初始化失败")
//         console.log(testCreateInstance)
//     }
//     this.ocxobj.attachEvent('OnLogin',this.loginHadler)

//     this.ocxobj2 = this.$refs["mayActivex2"]
//     let testCreateInstance2 = this.ocxobj2.CreateInstance()
//     if (testCreateInstance2 === 0) {
//         console.log("初始化成功")
//     } else {
//         console.log("初始化失败")
//         console.log(testCreateInstance2)
//     }
//     this.ocxobj.attachEvent('OnLogin',this.loginHadler)

//     this.ocxobj3 = this.$refs["mayActivex3"]
//     let testCreateInstance3 = this.ocxobj3.CreateInstance()
//     if (testCreateInstance3 === 0) {
//         console.log("初始化成功")
//     } else {
//         console.log("初始化失败")
//         console.log(testCreateInstance3)
//     }
//     this.ocxobj3.attachEvent('OnLogin',this.loginHadler)

//     this.ocxobj4 = this.$refs["mayActivex4"]
//     let testCreateInstance4 = this.ocxobj4.CreateInstance()
//     if (testCreateInstance4 === 0) {
//         console.log("初始化成功")
//     } else {
//         console.log("初始化失败")
//         console.log(testCreateInstance4)
//     }
//     this.ocxobj4.attachEvent('OnLogin',this.loginHadler)

//     this.ocxobj5 = this.$refs["mayActivex5"]
//     let testCreateInstance5 = this.ocxobj.CreateInstance()
//     if (testCreateInstance5 === 0) {
//         console.log("初始化成功")
//     } else {
//         console.log("初始化失败")
//         console.log(testCreateInstance5)
//     }
//     this.ocxobj.attachEvent('OnLogin',this.loginHadler)

//     this.ocxobj6 = this.$refs["mayActivex6"]
//     let testCreateInstance6 = this.ocxobj6.CreateInstance()
//     if (testCreateInstance6 === 0) {
//         console.log("初始化成功")
//     } else {
//         console.log("初始化失败")
//         console.log(testCreateInstance6)
//     }
//     this.ocxobj6.attachEvent('OnLogin',this.loginHadler)
//   },
//   beforeDestroy() {
//     this.logout()
//     this.destroyOcx()
//   },
//   created() {
    
//   },
//   methods: {
//     // initActiveXObject () {
//     //   let obj = document.createElement('object')
//     //   obj.setAttribute('id', 'activexid')
//     //   obj.setAttribute('classid', 'clsid:{3C1AAF0C-BE65-443b-A859-B826F400F3EA}')
//     //   obj.setAttribute('width', 480)
//     //   obj.setAttribute('height', 360)
//     //   var _obj = document.getElementById("activex_div");
//     //   _obj.appendChild(obj)
//     // },
//     //登陆方法
//     login() {
//       try {
//         // this.ocxobj.Login('43.27.134.20', '5060', 'viss', 'gkpt', '12345678')
//         this.ocxobj.Login(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd)
//         this.ocxobj2.Login(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd)
//         this.ocxobj3.Login(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd)
//         this.ocxobj4.Login(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd)
//         this.ocxobj5.Login(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd)
//         this.ocxobj6.Login(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd)
//         //alert("登录成功");
//         console.log("登录成功")
//       }
//       catch (err) {
//         console.log(err)
//         console.log("登录失败: 失败原因" + err.description)
//       }
//     },
//     //登陆拓展方法
//     loginEx() {
//         try {
//             this.ocxobj.LoginEx(this.ccsIP, this.ccsPort, this.ccsURI, this.userName, this.passwd, this.paramsxml);
//             console.log("登录成功")
//         }
//         catch (err) {
//             console.log("登录失败 " + err.description);
//         }
//     },
//     loginHadler(result) {
//         console.log(result)
//       if (result == "0x00000000")
//         alert("登录成功。");
//       else if (result == "0x00000090") 
//         alert("登录失败,当前控件版本太低，请下载安装最新版本后重试！");
//       else
//         alert("登录失败,错误码:" + result);
//     },
//     // 注销登录
//     logout() {
//       try {
//         this.ocxobj.Logout()
//         this.ocxobj2.Logout()
//         this.ocxobj3.Logout();
//         this.ocxobj4.Logout();
//         this.ocxobj5.Logout();
//         this.ocxobj6.Logout();
//         console.log("登出成功")
//       }
//       catch (err) {
//         console.log("登出失败 " + err.description);
//       }
//     },
//     // 销毁控件
//     destroyOcx() {
//       try {
//         this.ocxobj.DestroyInstance()
//         this.ocxobj2.DestroyInstance()
//         this.ocxobj3.DestroyInstance()
//         this.ocxobj4.DestroyInstance()
//         this.ocxobj5.DestroyInstance()
//         this.ocxobj6.DestroyInstance()
//         console.log("撤销控件成功");
//       }
//       catch (err) {
//         console.log("撤销控件失败 " + err.description);
//       }
//     },
//     GetCamList() {
//       var lResult="";
//       try {
//         lResult = this.ocxobj.GetCamList();
//         var cameraArr = lResult.split("@");
//                 for (var i = 0; i < cameraArr.length; i++) 
//                 {
//                     var cameraInfo = cameraArr[i];
//                     console.log(cameraInfo)
//                 }
//       }
//       catch (err) {
//         console.log("获取摄像机列表失败")
//       }
//     },
//     //开始视频方法
//     startVideo() {
//         try {           
//             this.ocxobj.StartLiveVideo('731000519100101', 0)
//             this.ocxobj2.StartLiveVideo('731000519110101', 0);
//             this.ocxobj3.StartLiveVideo('731000519120101', 0);
//             this.ocxobj4.StartLiveVideo('731000519130101', 0);
//             // this.ocxobj5.StartLiveVideo('731000519070101', 0);
//             // this.ocxobj6.StartLiveVideo('731000519140101', 0);
//             console.log("开始实时视频成功")
//         }
//         catch (err) {
//             console.log(err)
//             alert("开始实时视频失败！");
//         }
//     }
//   }
// }
</script>
