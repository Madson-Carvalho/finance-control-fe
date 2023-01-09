import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Home from "./routes/Home";
import NewFinance from "./routes/NewFinance";
import HistoricPerMonth from "./routes/HistoricPerMonth";
import EditFinance from "./routes/EditFinance";
import DeleteFinance from "./routes/DeleteFinance";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewFinance />,
      },
      {
        path: "/historic-per-month",
        element: <HistoricPerMonth />,
      },
      {
        path: "/edit",
        element: <EditFinance />,
      },
      {
        path: "/delete",
        element: <DeleteFinance />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
