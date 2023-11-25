import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import eventReducer from "./events/eventReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
});

export default rootReducer;
