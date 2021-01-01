import { ADD_CONFIRM_DIALOG, UPDATE_RESULT } from "./constants";

export function updateResult(result){
  return {
    type: UPDATE_RESULT,
    value: result
  }
}

export function addConfirmDialog(confirmDialog) {
  return {
    type: ADD_CONFIRM_DIALOG,
    value: confirmDialog
  }
}