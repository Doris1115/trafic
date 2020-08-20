import request from '@/utils/request'

import qs from 'qs'
import moment  from 'moment'

export function add(data) {
  return request({
    url: '/api/duty/gps_current',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/duty/gps_current',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/duty/gps_current',
    method: 'put',
    data
  })
}

export function queryAllForGis(params) {
  return request({
    url: '/api/duty/gps_current/classify?' + qs.stringify(params, { indices: false,serializeDate: function serializeDate(date) {
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      }
    }),
    method: 'get'
  })
}

export default { add, edit, del, queryAllForGis }
