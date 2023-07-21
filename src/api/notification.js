import { authRequest } from '@/utils/request'

/* 查询通知接口 */
export function getNotificationStats(...params) {
  return authRequest('notifications/stats', ...params)
}

/* 消息列表 */
export function getNotifications() {
  return authRequest('notifications')
}

/* 标记消息为已读 */
export function readNotifications() {
  return authRequest('user/read/notifications',{
    method: 'PUT'
  })
}
