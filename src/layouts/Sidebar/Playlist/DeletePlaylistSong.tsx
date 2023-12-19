import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteConfirmationModal from "../../../utils/DeleteConfirmModal";

const DeletePlaylistSong: React.FC<{
  id: number;
  playlist_id: number;
  onDelete: () => void;
}> = ({ id, playlist_id, onDelete }) => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDeleteSong = async () => {
    if (isAuthenticated && user) {
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

        const url = `http://localhost:8081/api/playlists/private/delete_song?song_id=${id}&playlist_id=${playlist_id}`;
        const deleteRequest = await fetch(url, requestOptions);
        closeModal();
        onDelete();

        if (!deleteRequest.ok) {
          console.error(
            `Error deleting song: ${deleteRequest.status} - ${deleteRequest.statusText}`
          );
        } else {
        }
      } catch (error) {
        console.error("Error deleting song:", error);
      }
    }
  };

  return (
    <>
      <button className="btn btn-md danger-color" onClick={openModal}>
        Remove from playlist
      </button>
      <DeleteConfirmationModal
        show={showModal}
        handleClose={closeModal}
        handleDelete={handleDeleteSong}
      />
    </>
  );
};

export default DeletePlaylistSong;
