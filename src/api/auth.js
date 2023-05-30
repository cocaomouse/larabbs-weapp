import { request } from '@/utils/request'

export function login(data) {
	return request('weapp/authorizations',{
		method: 'post',
		data: data
	})
}


/* 刷新token接口 */
export function refresh(token) {
	return request('authorizations/current',{
		method: 'put',
		header: {
		  'Authorizations': 'Bearer ' + token
		}
	})
}

/* 处理退出登录 */
export function logout(token) {
	return request('authorizations/current', {
	   method: 'delete',
	   header: {
	   	  'Authorization': 'Bearer ' + token
	   }
	})
}