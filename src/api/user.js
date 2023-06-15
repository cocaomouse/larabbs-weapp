import { request, authRequest, uploadFile } from '@/utils/request'

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

/* 上传文件 */
export function updateAvatar(avatar) {
  return uploadFile('images', {
    method: 'POST',
    name: 'image',
    formData: {
      type: 'avatar'
    },
    filePath: avatar
  })
}

/* 话题详情作者信息 */
export function getUser(id) {
  return request('users/' + id)
}
