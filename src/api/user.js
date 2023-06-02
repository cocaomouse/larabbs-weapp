import { request, authRequest } from '@/utils/request'

export function getCurrentUser(data) {
	return authRequest('user')
}

/* 更新用户信息 */
export function updateUser(data) {
  return authRequest('user', {
    method: 'put', // put方法更新用户信息，小程序不支持patch方法
    data: data
  })
}
