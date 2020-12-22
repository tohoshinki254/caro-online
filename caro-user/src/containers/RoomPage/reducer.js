import { ADD_CONFIRM_DIALOG, UPDATE_RESULT } from "./constants";

const RoomReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_RESULT:
      return {...state, resultDialog: action.value}
    case ADD_CONFIRM_DIALOG:
      return {...state, confirmDialog: action.value}
    default:
      return state;
  }
}

export default RoomReducer;