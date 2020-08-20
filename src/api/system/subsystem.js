import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/system/subsystem',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/system/subsystem/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/system/subsystem',
    method: 'put',
    data
  })
}

export function get(system_id) {
  return request({
    url: 'api/system/subsystem/' + system_id,
    method: 'get'
  })
}

export function getEnabled() {
  return request({
    url: 'api/system/subsystem/enabled',
    method: 'get'
  })
}

export function updateMenus(data) {
  return request({
    url: 'api/system/subsystem/menus',
    method: 'put',
    data
  })
}

export default { add, edit, del, get, updateMenus, getEnabled }
