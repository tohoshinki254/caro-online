import { UPDATE_RESULT } from "./constants";

const RoomReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_RESULT:
      return {...state, resultDialog: action.value}
  
    default:
      return state;
  }
}

export default RoomReducer;