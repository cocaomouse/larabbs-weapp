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
		  'Authorization': 'Bearer ' + token
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

/* 获取图形验证码 */
export function getCaptcha(phone) {
  return request('captchas', {
    method: 'post',
    data: {
      phone: phone
    }
  })
}

/* 发送短信验证码 */
export function getVerificationCode(key, code) {
  return request('verificationCodes', {
    method: 'post',
    data: {
      captcha_key: key,
      captcha_code: code
    }
  })
}

/* 用户注册 */
export function register(data) {
  return request('weapp/users',{
    method: 'post',
    data: data
  })
}
