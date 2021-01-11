import { UPDATE_RESULT } from "../RoomPage/constants";
import { initBoard } from "../RoomPage/Services";
import { ADD_HISTORY, ADD_USER_INFO, UPDATE_HISTORY } from "./constants";

const RoomForViewerReducer = (state, action) => {
    switch (action.type) {
        case ADD_USER_INFO:
            return { ...state, info: action.value }
        case UPDATE_HISTORY:
            if (action.value.length === 0) {
                const defaultHistory = [{
                    board: initBoard(),
                    lastMove: null,
                    isCreator: null,
                }]
                return { ...state, history: defaultHistory, stepNumber: 0 }
            }
            const newHistory = state.history.concat(action.value);
            return { ...state, history: newHistory, stepNumber: newHistory.length - 1 }
        case ADD_HISTORY:
            const item = action.value;
            const _newHistory = state.history.concat({
                board: item.newBoard,
                lastMove: item.location,
                isCreator: item.isCreator
            });
            return { ...state, history: _newHistory, stepNumber: _newHistory.length - 1 }
        case UPDATE_RESULT:
            return { ...state, resultDialog: action.value }
        default:
            return state;
    }
}

export default RoomForViewerReducer;