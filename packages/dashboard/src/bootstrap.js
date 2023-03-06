import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// Create Mount function to start up the app
const mount = (htmlElement) => {
  const app = createApp(Dashboard);
  //app.mount dolazi iz vue biblioteke, nije povezana sa nasom
  app.mount(htmlElement);
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// IF we are runnig throught container, export function to container decide when to run
export { mount };
