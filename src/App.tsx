import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import ErrorPage from "./errorpage/404Error";
import { AssembledHomePage } from "./layouts/HomePage/components/AssembledHomePage";
import { AssembledReviewPage } from "./layouts/ReviewPage/AssembledReviewPage";
import { AssembledReviewFormPage } from "./layouts/ReviewPage/AssembledReviewFormPage";
import LoadingPage from "./utils/LoadingPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import { SearchMusic } from "./layouts/SearchMusicPage/SearchMusic";
import LoginWidget from "./auth/LoginWidget";

const oktaAuth = new OktaAuth(oktaConfig);

const CustomAuthHandler = () => {
  const navigate = useNavigate();
  navigate("/login");
};

const RestoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
  const navigate = useNavigate();
  navigate(toRelativeUrl(originalUri || "/", window.location.origin));
};

const App: React.FC = () => {
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
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={RestoreOriginalUri}
        onAuthRequired={CustomAuthHandler}
      >
        <RouterProvider
          router={createBrowserRouter([
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
            {
              path: "/song/:songId",
              element: <AssembledReviewPage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/login",
              element: <LoginWidget config={oktaConfig} />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/login/callback",
              element: <LoginCallback />,
              errorElement: <ErrorPage />,
            },
          ])}
        />
      </Security>
    </div>
  );
};

export default App;
