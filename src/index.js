import React from "react";
import { render } from "react-dom";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { authMiddleware } from "redux-implicit-oauth2";
import { loadState, saveState } from "./util/helpers";
import { composeWithDevTools } from "redux-devtools-extension";
import throttle from "lodash/throttle";

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, authMiddleware)
  )
);

store.subscribe(throttle(() => {
  saveState({
    spotifyUserId: store.getState().spotifyUserId
  });
}), 1000);

import App from "./components/App";

import "./styles/main.scss";

render(
  <Provider store={store}>
    <App />
  </Provider>,
	document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
