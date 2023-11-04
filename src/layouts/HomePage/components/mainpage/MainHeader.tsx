import React, { useState } from "react";
import UploadSong from "../../../../utils/UploadSong";

function MainHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <nav className="navbar background-main">
      <div>
        <UploadSong />
      </div>
    </nav>
  );
}

export default MainHeader;
