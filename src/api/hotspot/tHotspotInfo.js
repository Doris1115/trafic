import request from "@/utils/request";

export function add(data) {
  return request({
    url: "api/tHotspotInfo",
    method: "post",
    data
  });
}

export function del(ids) {
  return request({
    url: "api/tHotspotInfo/",
    method: "delete",
    data: ids
  });
}

export function edit(data) {
  return request({
    url: "api/tHotspotInfo",
    method: "put",
    data
  });
}

export default { add, edit, del };
