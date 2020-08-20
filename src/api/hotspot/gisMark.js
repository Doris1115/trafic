import request from "@/utils/request";

export function add(data) {
  return request({
    url: "api/gisMark",
    method: "post",
    data
  });
}

export function getAllGisMark(lnglat) {
  var res1 = lnglat.split(",");
  return request({
    url: "api/gisMark?lng=" + res1[0] + "&lat=" + res1[1],
    method: "get"
  });
}

export function del(ids) {
  return request({
    url: "api/gisMark/",
    method: "delete",
    data: ids
  });
}

export function edit(data) {
  return request({
    url: "api/gisMark",
    method: "put",
    data
  });
}

export default { add, edit, del };
