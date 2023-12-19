import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteConfirmationModal from "../../../utils/DeleteConfirmModal";

const CommentDelete: React.FC<{
  id: number;
  onDelete: (isSuccessful: boolean) => void;
}> = ({ id, onDelete }) => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteComment = async () => {
    if (isAuthenticated && user) {
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

        const url = `http://localhost:8081/api/comments/private/delete?id=${id}`;
        const deleteRequest = await fetch(url, requestOptions);

        if (!deleteRequest.ok) {
          console.error(
            `Error deleting comment: ${deleteRequest.status} - ${deleteRequest.statusText}`
          );
          onDelete(false); // Deletion failed
        } else {
          onDelete(true); // Deletion succeeded
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        onDelete(false); // Deletion failed due to exception
      } finally {
        setIsLoading(false);
        setShowDeleteModal(false);
      }
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setShowDeleteModal(true)}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete Comment"}
      </Button>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDeleteComment}
      />
    </>
  );
};

export default CommentDelete;
