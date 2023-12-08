import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

const DeleteReviewButton: React.FC<{ id: number }> = ({ id }) => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);

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
          // Handle the error, show a message to the user, etc.
        } else {
          // Handle success if needed
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={handleDeleteComment}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete Comment"}
      </Button>
    </>
  );
};

export default DeleteReviewButton;
