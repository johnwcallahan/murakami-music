import { SET_FILTER } from "../constants/ActionTypes";
import INITIAL_STATE from "../data";

export default function setFilter(state=INITIAL_STATE.composerFilter, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}