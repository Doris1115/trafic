import request from "@/utils/request";
/**
 * 热点类型
 */
export function getHotSpotType() {
  return request({
    url: "api/sysCode?codetype=370100",
    method: "get"
  });
}
/**
 * 地区状态
 */
export function getHotRegionStatus() {
  return request({
    url: "api/sysCode?codetype=370200",
    method: "get"
  });
}

export function add(data) {
  return request({
    url: "api/sysCode",
    method: "post",
    data
  });
}

export function del(ids) {
  return request({
    url: "api/sysCode/",
    method: "delete",
    data: ids
  });
}

export function edit(data) {
  return request({
    url: "api/sysCode",
    method: "put",
    data
  });
}

export default { add, edit, del };
