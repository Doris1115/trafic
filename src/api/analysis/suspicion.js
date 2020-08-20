import request from '@/utils/request'

export function summary() {
  return request({
    url: 'webapi/Suspicion/Summary',
    method: 'get'
  })
}

export function trend() {
  return request({
    url: 'webapi/Suspicion/Trend',
    method: 'get'
  })
}
export function area() {
  return request({
    url: 'webapi/Suspicion/AreaAnalyse',
    method: 'get'
  })
}
export function alarmType() {
  return request({
    url: 'webapi/Suspicion/AlarmType',
    method: 'get'
  })
}
export function highAddress() {
  return request({
    url: 'webapi/Suspicion/HighAddress',
    method: 'get'
  })
}
export function monthAlarmType() {
  return request({
    url: 'webapi/Suspicion/MonthAlarmType',
    method: 'get'
  })
}
export function monthHighAddress() {
  return request({
    url: 'webapi/Suspicion/MonthHighTime',
    method: 'get'
  })
}
export function highAddressOD() {
  return request({
    url: 'webapi/Suspicion/HighAddressOD',
    method: 'get'
  })
}
export default {
  summary,
  trend,
  area,
  alarmType,
  highAddress,
  monthAlarmType,
  monthHighAddress,
  highAddressOD
}
