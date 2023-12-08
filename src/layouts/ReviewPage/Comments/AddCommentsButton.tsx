import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";
import CommentModal from "./CommentModal";

interface AddCommentsButtonProps {
  reviewId: number | undefined;
}

const AddCommentsButton: React.FC<AddCommentsButtonProps> = ({ reviewId }) => {
  const [showModal, setShowModal] = useState(false);
  const [commentData, setCommentData] = useState({
    reviewId: reviewId,
    text: "",
  });

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setCommentData({
      reviewId: reviewId,
      text: "",
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddComment = async () => {
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

        const url = `http://localhost:8081/api/comments/private/addComment?username=${user?.nickname}&text=${commentData.text}&review-id=${reviewId}`;
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const newCommentData = await response.json();
        console.log("Comment submitted successfully:", newCommentData);
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
        style={{ marginTop: "10px", marginRight: "10px" }}
        onClick={handleShow}
      >
        Reply
      </Button>

      <CommentModal
        show={showModal}
        handleClose={handleClose}
        handleInputChange={handleInputChange}
        handleAddComment={handleAddComment}
        commentData={commentData}
      />
    </>
  );
};

export default AddCommentsButton;
