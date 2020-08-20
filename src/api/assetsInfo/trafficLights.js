import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/api/assets/traffic_lights',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/assets/traffic_lights',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/assets/traffic_lights',
    method: 'put',
    data
  })
}

export function getAllForGis(data) {
  return request({
    url: '/api/assets/traffic_lights/gis',
    method: 'get'
  })
}

export default { add, edit, del, getAllForGis }
