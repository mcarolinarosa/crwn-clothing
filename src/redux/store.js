import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

//middleware is like a tunnal that intercepts our actions before they go into our reducer, and modify them or add things to them
const middlewares = [thunk];

// To display the log only on development mode
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
