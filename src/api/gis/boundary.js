import request from '@/utils/request'
import qs from 'qs'

export function getBoundary(params) {
  return request({
    url: 'api/gisMark/broundary?' + qs.stringify(params),
    method: 'get'
  })
}

export function getBoundaryCounty(params) {
  return request({
    url: 'api/gisMark/broundary/county?' + qs.stringify(params),
    method: 'get'
  })
}
  
export default { getBoundary, getBoundaryCounty }