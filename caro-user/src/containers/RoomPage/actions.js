import { UPDATE_RESULT } from "./constants";

export function updateResult(result){
  return {
    type: UPDATE_RESULT,
    value: result
  }
}