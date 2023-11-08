import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AssembledHomePage } from "./layouts/HomePage/components/AssembledHomePage";
import { AssembledReviewPage } from "./layouts/ReviewPage/AssembledReviewPage";
import { AssembledReviewFormPage } from "./layouts/ReviewPage/AssembledReviewFormPage";
import LoadingPage from "./utils/LoadingPage";
import { SearchMusic } from "./layouts/SearchMusicPage/SearchMusic";
import "./App.css";
import ErrorPage from "./errorpage/404Error";
import RedirectComponent from "./utils/RedirectComponent";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AssembledHomePage />} />
          <Route path="/search" element={<SearchMusic />} />
          <Route path="/review" element={<AssembledReviewPage />} />
          <Route path="/submitreview" element={<AssembledReviewFormPage />} />
          <Route path="/song/:songId" element={<AssembledReviewPage />} />
          <Route path="/error/:code" element={<ErrorPage />} />
          <Route path="*" element={<RedirectComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
