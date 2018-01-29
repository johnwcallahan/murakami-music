import { SET_FILTER } from "../constants/ActionTypes";
import DEFAULT_STATE from "../data";

export default function setFilter(state=DEFAULT_STATE.composerFilter, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}
