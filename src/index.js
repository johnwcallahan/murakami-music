// React
import React from "react";
import { render } from "react-dom";

import { createStore } from "redux";
import rootReducer from "./reducers";

import {
  toggleBook,
  toggleComposer,
  toggleGenre,
  setFilter
} from "./actions";

const store = createStore(rootReducer);

console.log(store.getState());

store.dispatch(toggleBook("After Dark"));
store.dispatch(toggleComposer("Liszt"));
store.dispatch(toggleGenre("Pop"));
console.log(store.getState());
store.dispatch(toggleGenre("Classical"));
store.dispatch(setFilter("Lis"));

console.log(store.getState());





import App from "./components/App";

import "./styles/main.scss";

render(
  <App />,
	document.getElementById("root")
);