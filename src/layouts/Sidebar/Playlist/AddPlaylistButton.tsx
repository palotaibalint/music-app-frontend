import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";
import PlaylistModal from "./PlaylistModal";
import Alert from "react-bootstrap/Alert";

interface AddPlaylistButtonProps {
  onPlaylistAdded: () => void;
}

const AddPlaylistButton: React.FC<AddPlaylistButtonProps> = ({
  onPlaylistAdded,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [playlistData, setPlaylistData] = useState({
    username: "",
    name: "",
    generate: false,
    popular: false,
    genre: "",
  });
  const [error, setError] = useState("");

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    setPlaylistData((prevData) => ({
      ...prevData,
      username: user?.nickname || "",
    }));
  }, [user?.nickname]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleNameChange = (newName: string) => {
    setPlaylistData((prevData) => ({
      ...prevData,
      name: newName,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPlaylistData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGenre = event.target.value;
    setPlaylistData((prevData) => ({
      ...prevData,
      genre: newGenre,
    }));
  };

  const handleAddPlaylist = async () => {
    setError("");
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

        const url = `http://localhost:8081/api/playlists/private/create?username=${encodeURIComponent(
          playlistData.username
        )}&name=${encodeURIComponent(playlistData.name)}&generate=${
          playlistData.generate
        }&popular=${playlistData.popular}&genre=${encodeURIComponent(
          playlistData.genre
        )}`;
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        onPlaylistAdded();
      } catch (error) {
        console.error("Error creating playlist:", error);
        setError("Failed to create playlist. Please try again.");
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

      {error && <Alert variant="danger">{error}</Alert>}

      <PlaylistModal
        show={showModal}
        handleClose={handleClose}
        handleCheckboxChange={handleCheckboxChange}
        handleNameChange={handleNameChange}
        handleGenreChange={handleGenreChange}
        handleAddPlaylist={handleAddPlaylist}
        generateChecked={playlistData.generate}
        playlistName={playlistData.name}
        popularChecked={playlistData.popular}
        genre={playlistData.genre}
      />
    </>
  );
};

export default AddPlaylistButton;
