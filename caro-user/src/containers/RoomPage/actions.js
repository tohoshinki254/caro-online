import { ADD_CONFIRM_DIALOG, ADD_INVITE_PLAYER_DIALOG, ADD_WATING_DIALOG, UPDATE_RESULT } from "./constants";

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

export function addWatingDialog(waitingDialog) {
  return {
    type: ADD_WATING_DIALOG,
    value: waitingDialog
  }
}

export function addInvitePlayerDialog(invitePlayerDialog) {
  return {
    type: ADD_INVITE_PLAYER_DIALOG,
    value: invitePlayerDialog
  }
}