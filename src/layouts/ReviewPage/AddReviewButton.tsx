import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

interface AddReviewButtonProps {
  onAddReview: () => void;
}

const AddReviewButton: React.FC<AddReviewButtonProps> = ({ onAddReview }) => {
  const handleAddReview = () => {
    onAddReview();
  };

  return (
    <>
      <Button variant="primary" onClick={handleAddReview}>
        Add a Review
      </Button>
    </>
  );
};

export default AddReviewButton;
