import request from '@/utils/request'

export function timerCongestion() {
  return request({
    url: 'webapi/Alarm/TimerCongestion',
    method: 'get'
  })
}

export function congestionHis() {
  return request({
    url: 'webapi/Alarm/CongestionHis',
    method: 'get'
  })
}
export function hIs() {
  return request({
    url: 'webapi/Alarm/HIs',
    method: 'get'
  })
}
export function indexHis() {
  return request({
    url: 'webapi/Alarm/IndexHis',
    method: 'get'
  })
}
export function aLARM() {
  return request({
    url: 'webapi/Alarm/ALARM',
    method: 'get'
  })
}
export function carTime() {
  return request({
    url: 'webapi/Alarm/CarTime',
    method: 'get'
  })
}
export function carType() {
  return request({
    url: 'webapi/Alarm/CarType',
    method: 'get'
  })
}
export function OD() {
  return request({
    url: 'webapi/Alarm/OD',
    method: 'get'
  })
}
export default {
  timerCongestion,
  congestionHis,
  hIs,
  indexHis,
  aLARM,
  carTime,
  carType,
  OD
}
