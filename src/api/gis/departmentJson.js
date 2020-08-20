import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/gis/departmentJson',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/gis/departmentJson/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/gis/departmentJson',
    method: 'put',
    data
  })
}

export function getAll() {
  return request({
    url: 'api/gis/departmentJson/all',
    method: 'get'
  })
}

export default { add, edit, del, getAll }
