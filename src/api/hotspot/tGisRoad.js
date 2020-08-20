import request from "@/utils/request";

export function add(data) {
  return request({
    url: "api/tGisRoad",
    method: "post",
    data
  });
}

export function getGisRoadByDepart(departid) {
  return request({
    url: "api/tGisRoad?ssxq=" + departid,
    method: "get"
  });
}

export function del(ids) {
  return request({
    url: "api/tGisRoad/",
    method: "delete",
    data: ids
  });
}

export function edit(data) {
  return request({
    url: "api/tGisRoad",
    method: "put",
    data
  });
}

export default { add, edit, del };
