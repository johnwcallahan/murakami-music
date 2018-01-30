// React
import React from "react";
import { render } from "react-dom";

import { createStore } from "redux";
import rootReducer from "./reducers";

import {
  toggleBook,
  toggleComposer,
  // toggleGenre,
  // setFilter
} from "./actions";

// import state from "./data";

import getReferences from "./logic/getReferences";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// console.log(store.getState());

store.dispatch(toggleBook("Kafka on the Shore"));
store.dispatch(toggleBook("After Dark"));
store.dispatch(toggleComposer("Beethoven"));

console.log(store.getState());
console.log("REFS:");
console.log(getReferences(store.getState()));

import App from "./components/App";

import "./styles/main.scss";

render(
  <App />,
	document.getElementById("root")
);