import request from "@/utils/request";

export function add(data) {
  return request({
    url: "api/tCfgDepartment",
    method: "post",
    data
  });
}

export function getAllDepartment() {
  return request({
    url: "api/tCfgDepartment",
    method: "get"
  });
}

export function del(ids) {
  return request({
    url: "api/tCfgDepartment/",
    method: "delete",
    data: ids
  });
}

export function edit(data) {
  return request({
    url: "api/tCfgDepartment",
    method: "put",
    data
  });
}

export default { add, edit, del };
