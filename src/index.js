// React
import React from "react";
import { render } from "react-dom";

import { show } from "redux-modal";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { authMiddleware, authReducer as auth } from "redux-implicit-oauth2";
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(authMiddleware)
);

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
