import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import FavToggle from "./Reducers/FavReducers";

const Store = createStore(FavToggle, applyMiddleware(logger, thunk));

export default Store;
