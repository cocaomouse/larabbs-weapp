import { request, authRequest } from '@/utils/request'

/* 话题回复列表 */
export function getReplies(topicId, data) {
  return request('topics/' + topicId + '/replies',{
    data: data
  })
}

/* 用户的回复列表 */
export function getUserReplies(userId, data) {
  return request('users/' + userId + '/replies', {
    data: data
  })
}
