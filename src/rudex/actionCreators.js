import { LEAVE_A_MESSAGE } from './actionTypes'

// 留言数据
export const getLeaveAMessage =(message) =>({
  type:LEAVE_A_MESSAGE,
  message
})