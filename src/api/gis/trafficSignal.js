import request from '@/utils/request'
import qs from 'qs'


export function getRoadLinkInfo() {
  return request({
    url: '/api/road_links',
    method: 'get'
  })
}

export function getRoadLinkInfoColorCode() {
    return request({
      url: '/api/road_links/change',
      method: 'get'
    })
}

export function getGuidanceScreens() {
    return request({
      url: '/api/road_links/guidance',
      method: 'get'
    })
}

export default { getRoadLinkInfo, getRoadLinkInfoColorCode, getGuidanceScreens }