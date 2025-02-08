import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Check if this import is correct
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk)); // Error happens here

export default store;


