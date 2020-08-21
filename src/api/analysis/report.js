import request from '@/utils/request'
import { initData, download } from '@/api/data'

/** 查询警员个人信息 */
export function queryInfo(policeUserCode)
{
  const param = { policeUserCode: policeUserCode }
  return initData('/api/duty/rpt/info', param)
}

/** 查询警员巡逻照片 */
export function queryPhoto(policeUserCode)
{
  const param = { policeUserCode: policeUserCode }
  return initData('/api/duty/rpt/photo', param)
}

// 执法动态
export function peccencyDynamic(policeUserCode)
{
  const param = { policeUserCode: policeUserCode }
  return initData('/api/duty/rpt/peccencyDynamic', param)
}

// 综合评分排名
export function compositeScoreRank(policeUserCode, rankType)
{
  const param = { policeUserCode: policeUserCode, rankType: rankType }
  return initData('/api/duty/rpt/scorerank', param)
}

// 单项评分排名
export function singleScoreRank(policeUserCode, rankType)
{
  const param = { policeUserCode: policeUserCode, rankType: rankType }
  return initData('/api/duty/rpt/single_score_rank', param)
}

// 综合信息
export function compositeInfo(policeUserCode)
{
  const param = { policeUserCode: policeUserCode }
  return initData('/api/duty/rpt/compositeInfo', param)
}

export default { queryInfo, queryPhoto, peccencyDynamic, compositeScoreRank, singleScoreRank, compositeInfo }