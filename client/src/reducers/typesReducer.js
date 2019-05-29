import { SET_TYPES } from "../actions/types";
const initialState = {
  types: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    default:
      return state;
  }
}
