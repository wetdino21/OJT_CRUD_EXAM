import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Import auth reducer

const rootReducer = combineReducers({
    auth: authReducer // Combine auth reducer
});

export default rootReducer;

