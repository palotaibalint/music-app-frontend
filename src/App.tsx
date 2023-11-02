import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchMusic } from "./layouts/SearchMusicPage/SearchMusic";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./errorpage/404Error";
import { AssembledHomePage } from "./layouts/HomePage/components/AssembledHomePage";
import { AssembledReviewPage } from "./layouts/ReviewPage/AssembledReviewPage";
import { AssembledReviewFormPage } from "./layouts/ReviewPage/AssembledReviewFormPage";
import LoadingPage from "./utils/LoadingPage";

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
  {
    path: "/submitreview",
    element: <AssembledReviewFormPage />,
    errorElement: <ErrorPage />,
  },
]);

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
