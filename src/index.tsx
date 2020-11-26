import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./css/index.css"

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// transition scrollbar when no longer scrolling
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

function hideScrollbar() {
  document.body.classList.remove("scrolling")
  scrollTimeout = null;
}

window.onscroll = function() {
  document.body.classList.add("scrolling")

  if (scrollTimeout !== null) {
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(hideScrollbar, 1000)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
