// React
import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";

import { createStore } from "redux";
import rootReducer from "./reducers";

import {
  toggleBook,
  toggleComposer,
  toggleGenre,
  // setFilter
} from "./actions";

// import state from "./data";

import getReferences from "./logic/getReferences";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import App from "./components/App";

import "./styles/main.scss";

render(
  <Provider store={store}>
    <App />
  </Provider>,
	document.getElementById("root")
);