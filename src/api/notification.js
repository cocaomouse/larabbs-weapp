import { authRequest } from '@/utils/request'

/* 查询通知接口 */
export function getNotificationStats(...params) {
  return authRequest('notifications/stats', ...params)
}
