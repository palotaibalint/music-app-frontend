import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";
import PlaylistModal from "./PlaylistModal";

const AddPlaylistButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlistData, setPlaylistData] = useState({
    username: "",
    name: "",
    generate: false,
  });

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    setPlaylistData((prevData) => ({
      ...prevData,
      username: user?.nickname || "",
    }));
  }, [user?.nickname]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCheckboxChange = () => {
    setPlaylistData((prevData) => ({
      ...prevData,
      generate: !prevData.generate,
    }));
  };

  const handleNameChange = (newName: string) => {
    setPlaylistData((prevData) => ({
      ...prevData,
      name: newName,
    }));
  };

  const handleAddPlaylist = async () => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const url = `http://localhost:8081/api/playlists/private/create?username=${user?.nickname}&name=${playlistData.name}&generate=${playlistData.generate}`;
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }

    handleClose();
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginTop: "40px", marginLeft: "20px" }}
      >
        Create a playlist
      </Button>

      <PlaylistModal
        show={showModal}
        handleClose={handleClose}
        handleCheckboxChange={handleCheckboxChange}
        handleNameChange={handleNameChange} // Ensure this line is correct
        handleAddPlaylist={handleAddPlaylist}
        generateChecked={playlistData.generate}
        playlistName={playlistData.name}
      />
    </>
  );
};

export default AddPlaylistButton;
