import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Create Mount function to start up the app
const mount = (htmlElement) => {
  ReactDOM.render(<App />, htmlElement);
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// IF we are runnig throught container, export function to container decide when to run
export { mount };
