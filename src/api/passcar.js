import request from '@/utils/request'
import qs from 'qs'

export function add(data) {
  return request({
    url: 'api/passcar',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/passcar/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/passcar',
    method: 'put',
    data
  })
}

export function get(data) {
  const params = {
    page: 0,
    size: 9999,
    sort: "gwsj,desc",
    ...data
  }
  return request({
    url: 'api/passcar' + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export default { add, edit, del, get }
