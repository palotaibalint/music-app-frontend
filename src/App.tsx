import React from "react";
import "./App.css";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchMusic } from "./layouts/SearchMusicPage/SearchMusic";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorpage/404Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <SearchMusic />,
  },
]);

export const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
