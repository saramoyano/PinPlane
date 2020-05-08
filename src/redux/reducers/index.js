import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
import logger from "redux-logger";
import Rerender from "./Rerender";

const reducersApp = combineReducers({
  Rerender,
});
export const store = createStore(reducersApp, applyMiddleware(logger));

export default store;
