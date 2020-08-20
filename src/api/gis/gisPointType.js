
/** 监控 */
const POINT_TYPE_CCTV = "CCTV"
/** 卡口 */
const POINT_TYPE_TGS = "TGS"
/** 电警 */
const POINT_TYPE_TMS = "TMS"
/** 诱导屏 */
const POINT_TYPE_VMS = "VMS"
/** 交通信号灯 */
const POINT_TYPE_JT = "JT"

function getPointColor(type) {
  switch (type) {
    case POINT_TYPE_CCTV:
      return '#fa937e'
    case POINT_TYPE_TGS:
      return '#fa587e'
    case POINT_TYPE_TMS:
      return '#e1137e'
    case POINT_TYPE_VMS:
      return '#fa237e'
    case POINT_TYPE_JT:
      return '#fa977e'
    default:
      return '#fa937e'
  }
}

export default {
  POINT_TYPE_CCTV,
  POINT_TYPE_TGS,
  POINT_TYPE_TMS,
  POINT_TYPE_VMS,
  POINT_TYPE_JT,
  getPointColor
}
