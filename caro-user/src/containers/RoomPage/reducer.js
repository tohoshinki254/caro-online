import { ADD_CONFIRM_DIALOG, ADD_WATING_DIALOG, UPDATE_RESULT } from "./constants";

const RoomReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_RESULT:
      return {...state, resultDialog: action.value}
    case ADD_CONFIRM_DIALOG:
      return {...state, confirmDialog: action.value}
    case ADD_WATING_DIALOG:
      return {...state, waitingDialog: action.value}
    default:
      return state;
  }
}

export default RoomReducer;