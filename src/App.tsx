import React from "react";
import "./App.css";
import { SearchMusic } from "./layouts/SearchMusicPage/SearchMusic";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorpage/404Error";
import { AssembledHomePage } from "./layouts/HomePage/components/AssembledHomePage";
import { AssembledReviewPage } from "./layouts/ReviewPage/AssembledReviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AssembledHomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <SearchMusic />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/review",
    element: <AssembledReviewPage />,
    errorElement: <ErrorPage />,
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
