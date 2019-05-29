import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorsReducer";
import tasksReducer from "./tasksReducer";
import typesReducer from "./typesReducer";
const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
  errors: errorReducer,
  types: typesReducer,
});

export default rootReducer;
