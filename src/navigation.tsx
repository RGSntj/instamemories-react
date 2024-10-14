import { createBrowserRouter } from "react-router-dom";
import { App } from "./app";
import { Login } from "./pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
