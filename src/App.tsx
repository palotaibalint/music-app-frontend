import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import "./App.css";

const oktaAuth = new OktaAuth(oktaConfig);

const CustomAuthHandler = () => {
  const navigate = useNavigate();
  navigate("/login");
};

const RestoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
  const navigate = useNavigate();
  navigate(toRelativeUrl(originalUri || "/", window.location.origin));
};

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();
  navigate("/");
  return null;
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AssembledHomePage />} />
            <Route path="/search" element={<SearchMusic />} />
            <Route path="/review" element={<AssembledReviewPage />} />
            <Route path="/submitreview" element={<AssembledReviewFormPage />} />
            <Route path="/song/:songId" element={<AssembledReviewPage />} />
            <Route
              path="/login"
              element={<LoginWidget config={oktaConfig} />}
            />
            <Route path="/login/callback" element={<LoginCallback />} />
            <Route path="*" element={<RedirectComponent />} />
          </Routes>
        </BrowserRouter>
      </Security>
    </div>
  );
};

export default App;
