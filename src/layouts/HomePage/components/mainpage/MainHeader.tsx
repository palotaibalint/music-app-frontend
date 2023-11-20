import React from "react";
import UploadSong from "../../../../utils/UploadSong";
import LoginButton from "../../../NavBarAndFooter/LoginButton";
import LogoutButton from "../../../NavBarAndFooter/LogoutButton";

function MainHeader() {
  return (
    <nav className="navbar background-main">
      <div>
        <UploadSong />
      </div>
      <div>
        <LoginButton />
        <LogoutButton />
      </div>
    </nav>
  );
}

export default MainHeader;
