import request from '@/utils/request'
import { initData, download } from '@/api/data'

/** 拥堵指数分析统计 */
export function congestionIndex(param)
{
  //   return initData('/api/big_data/road_condition/congestionIndex', param)
  // return initData(' webapi/Alarm/IndexTime', param)
  return initData('/webapi/Alarm/IndexTime', param)
}
/** 高发路段分析 */
export function highFrequencyRoadLink(param)
{
  // return initData('/api/big_data/road_condition/highFrequencyRoadLink', param)
  return initData('/webapi/Alarm/TopRoad', param)
}
/** 高发时段分析 */
export function highFrequencyTimeFrame(param)
{
  //   return initData('/api/big_data/road_condition/highFrequencyTimeFrame', param)
  return initData('/webapi/Alarm/TopTime', param)
}

export default { congestionIndex, highFrequencyRoadLink, highFrequencyTimeFrame }