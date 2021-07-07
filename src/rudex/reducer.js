
import {getLeaveAMessage} from './actionCreators'
import {LEAVE_A_MESSAGE} from './actionTypes'
const defaultState={
  message:{}
}

 export default  function reducer(state =defaultState,action) {
  switch (action.type) {
    case LEAVE_A_MESSAGE:
      return {...state , message:action.message}
    default:
      return state
  }
}