import React from "react";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import LoadingScreen from "../../../../utils/LoadingPage";
import UploadSong from "../../../../utils/UploadSong";

function MainHeader() {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <LoadingScreen />;
  }

  const handleLogout = async () => {
    oktaAuth.signOut();
  };

  return (
    <nav className="navbar background-main">
      <div>
        <UploadSong />
      </div>
      <div>
        {authState.isAuthenticated ? (
          <button onClick={handleLogout} className="btn btn-primary">
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default MainHeader;
