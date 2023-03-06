import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Create Mount function to start up the app
const mount = (
  htmlElement,
  { onSignIn, onNavigate, defaultHistory, initialPath }
) => {
  //zato sto cemo konfigurisati mnogo history objekat kako bismo syncovali (povezali trenutno stanje history objekat iz marketinga sa history objektom unutar container-a
  //ako smo dali defaultHistory u development modu i izolaciji, koristi, ako ne, koristi memoryHistory
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath]
    });

  //kad god se neka navigacija u subaplikaciji desi, zovemo onNavigate. Imamo event listener koji se zove listen. Kada se navigacija desi, history objekat ce pozvati bilo koju funkciju koju prosledimo kao argument listen metode. Zovemo je kada god se path promeni
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, htmlElement);

  return {
    //zato sto je onParentNavigate pozvana sa history.listen dobijamo location objekat
    onParentNavigate({ pathname: nextPathname }) {
      //poziva se kad god container uradi neku navigaciju
      console.log("Container just navigated");
      console.log("auth app", nextPathname);

      const { pathname } = history.location; //trenutna putanja gde smo
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  };
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_app-dev-root");

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory()
    });
  }
}

// IF we are runnig throught container, export function to container decide when to run
export { mount };
