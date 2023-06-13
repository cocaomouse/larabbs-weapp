import { request } from "@/utils/request";

// 话题列表页
export function getTopics(data) {
  return request('topics', {
    data: data
  })
}

export function getCategories(data) {
  return request('categories')
}

// 话题详情
export function getTopic(id, data) {
  return request('topics/' + id, {
    data: data
  })
}

// 某个用户的话题列表
export function getUserTopics(userId, data) {
  return request('users/'+userId+'/topics',{
    data: data
  })
}
