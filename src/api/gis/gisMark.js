import request from '@/utils/request'
import qs from 'qs'

export function add(data) {
  return request({
    url: 'api/gisMark',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/gisMark/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/gisMark',
    method: 'put',
    data
  })
}

export function getAllMarks(params) {
  return request({
    url: 'api/gisMark/points?' + qs.stringify(params),
    method: 'get'
  })
}

export default { add, edit, del, getAllMarks }
