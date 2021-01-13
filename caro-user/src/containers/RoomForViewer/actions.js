import { ADD_HISTORY, ADD_USER_INFO, UPDATE_HISTORY } from "./constants"

export const addUserInfo = (userInfo) => {
    return {
        type: ADD_USER_INFO,
        value: userInfo
    }
}

export const updateHistory = (history) => {
    return {
        type: UPDATE_HISTORY,
        value: history
    }
}

export const addHistory = (history) => {
    return {
        type: ADD_HISTORY,
        value: history
    }
}