import request from '@/utils/request'

export function codeRate() {
  return request({
    url: 'webapi/Peccancy/CodeRate',
    method: 'get'
  })
}

export function summary() {
  return request({
    url: 'webapi/Peccancy/Summary',
    method: 'get'
  })
}
export function highSegment() {
  return request({
    url: 'webapi/Peccancy/HighSegment',
    method: 'get'
  })
}
export function trend() {
  return request({
    url: 'webapi/Peccancy/Trend',
    method: 'get'
  })
}
export function area() {
  return request({
    url: 'webapi/Peccancy/Area',
    method: 'get'
  })
}
export function collectWay() {
  return request({
    url: 'webapi/Peccancy/CollectWay',
    method: 'get'
  })
}
export function highTimes() {
  return request({
    url: 'webapi/Peccancy/HighTimes',
    method: 'get'
  })
}
export function highSegmentOD() {
  return request({
    url: 'webapi/Peccancy/HighSegmentOD',
    method: 'get'
  })
}
export default { codeRate, summary, trend, highSegment, area, collectWay, highTimes, highSegmentOD }