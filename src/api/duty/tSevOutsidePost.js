import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/tSevOutsidePost',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/tSevOutsidePost/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/tSevOutsidePost',
    method: 'put',
    data
  })
}

export function getAll(data) {
  return request({
    url: 'api/tSevOutsidePost?page=0&size=1000000',
    method: 'get'
  })
}

export default { add, edit, del, getAll }
