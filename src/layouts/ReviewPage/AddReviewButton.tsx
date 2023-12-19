import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ReviewModal from "./ReviewModal";
import { useAuth0 } from "@auth0/auth0-react";

interface AddReviewButtonProps {
  songId: number | undefined;
  onReviewAdded: () => void;
}

const AddReviewButton: React.FC<AddReviewButtonProps> = ({
  songId,
  onReviewAdded,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    songId: songId,
    userName: "",
    userEmail: "",
    reviewTitle: "",
    reviewDescription: "",
  });
  const [ratingError, setRatingError] = useState<string | null>(null);

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    // Reset review data and error when closing the modal
    setReviewData({
      rating: 0,
      songId: songId,
      userName: user?.nickname || "",
      userEmail: user?.email || "",
      reviewTitle: "",
      reviewDescription: "",
    });
    setRatingError(null);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value: number) => {
    setReviewData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const handleAddReview = async () => {
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
          body: JSON.stringify({
            ...reviewData,
            songId: songId,
          }),
        };

        const url = `http://localhost:8081/api/reviews/private/post?userName=${user?.nickname}&userEmail=${user?.email}`;
        const response = await fetch(url, requestOptions);

        onReviewAdded();

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const newReviewData = await response.json();
        console.log("Review submitted successfully:", newReviewData);
      } catch (error) {
        console.error("Error submitting review:", error);
        setRatingError("Error submitting review");
      }
    }

    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Leave a review
      </Button>

      <ReviewModal
        show={showModal}
        handleClose={handleClose}
        handleInputChange={handleInputChange}
        handleRatingChange={handleRatingChange}
        handleAddReview={handleAddReview}
        reviewData={reviewData}
        ratingError={ratingError}
      />
    </>
  );
};

export default AddReviewButton;
