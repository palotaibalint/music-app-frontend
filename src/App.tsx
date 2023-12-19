import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AssembledHomePage } from "./layouts/HomePage/components/AssembledHomePage";
import { AssembledReviewPage } from "./layouts/ReviewPage/AssembledReviewPage";
import LoadingPage from "./utils/LoadingPage";
import { SearchMusic } from "./layouts/SearchMusicPage/SearchMusic";
import "./App.css";
import "react-chat-elements/dist/main.css";
import ErrorPage from "./errorpage/404Error";
import RedirectComponent from "./utils/RedirectComponent";
import { AssembledPlaylistPage } from "./layouts/Sidebar/Playlist/AssembledPlaylistPage";
import { AssembledUserPage } from "./layouts/UserPage/AssembledUserPage";
import { AssembledMessagePage } from "./layouts/UserPage/Messages/AssembledMessagePage";
import { AssembledOwnerPage } from "./layouts/UserPage/AssembledOwnerPage";

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
          <Route path="/song/:songId" element={<AssembledReviewPage />} />
          <Route
            path="/playlist/:playlistId"
            element={<AssembledPlaylistPage />}
          />
          <Route path="/profile/:username" element={<AssembledOwnerPage />} />
          <Route path="/profile" element={<AssembledUserPage />} />
          <Route path="/messages" element={<AssembledMessagePage />} />
          <Route path="/error/:code" element={<ErrorPage />} />
          <Route path="*" element={<RedirectComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
