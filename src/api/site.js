import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/site',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/site/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/site',
    method: 'put',
    data
  })
}

export function getAll() {
  return request({
    url: 'api/site?page=0&size=1000000',
    method: 'get'
  })
}

export function getSiteDeviceTree() {
  return request({
    url: 'api/site/tree',
    method: 'get'
  })
}

export function getSiteDeviceTreeTransfer() {
  return request({
    url: 'api/site/site_device_tree_transfer',
    method: 'get'
  })
}

export function getSiteTreeTransfer() {
  return request({
    url: 'api/site/site_tree_transfer',
    method: 'get'
  })
}

export default { add, edit, del, getAll, getSiteDeviceTree, getSiteDeviceTreeTransfer }
