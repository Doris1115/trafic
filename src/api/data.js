import request from '@/utils/request'
import qs from 'qs'
import moment  from 'moment'

export function initData(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false,serializeDate: function serializeDate(date) {
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      }
    }),
    method: 'get'
  })
}

export function download(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false,serializeDate: function serializeDate(date) {
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      }
    }),
    method: 'get',
    responseType: 'blob'
  })
}
