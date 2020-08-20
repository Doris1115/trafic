import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/tCfgDepartment',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/tCfgDepartment/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/tCfgDepartment',
    method: 'put',
    data
  })
}

export function getAll() {
  return request({
    url: 'api/tCfgDepartment?page=0&size=1000000',
    method: 'get'
  })
}

export function getTree(needPerson) {
  return request({
    url: 'api/tCfgDepartment/buildTree' + (needPerson === true ? '?needPerson=' + needPerson : ''),
    method: 'get'
  })
}

export default { add, edit, del, getTree, getAll }
