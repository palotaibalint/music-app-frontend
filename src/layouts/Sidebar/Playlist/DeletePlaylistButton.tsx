// DeletePlaylistButton.tsx
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteConfirmModal from "../../../utils/DeleteConfirmModal";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DeletePlaylistButton: React.FC<{ id: number; onDelete: () => void }> = ({
  id,
  onDelete,
}) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleDeletePlaylist = async () => {
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const url = `http://localhost:8081/api/playlists/private/delete?id=${id}`;
        const deleteRequest = await fetch(url, requestOptions);

        navigate("/");

        setShowModal(false);
        onDelete();

        if (!deleteRequest.ok) {
          console.error(
            `Error deleting playlist: ${deleteRequest.status} - ${deleteRequest.statusText}`
          );
          // Handle error here
        }
      } catch (error) {
        console.error("Error deleting playlist:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setShowModal(true)}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete Playlist"}
      </Button>

      <DeleteConfirmModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleDeletePlaylist}
      />
    </>
  );
};

export default DeletePlaylistButton;
