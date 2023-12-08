import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StarDropdown from "../../utils/StarDropdown";

interface ReviewModalProps {
  show: boolean;
  handleClose: () => void;
  reviewData: {
    reviewTitle: string;
    reviewDescription: string;
    rating: number;
  };
  ratingError: string | null;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleRatingChange: (value: number) => void;
  handleAddReview: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  show,
  handleClose,
  reviewData,
  ratingError,
  handleInputChange,
  handleRatingChange,
  handleAddReview,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Review</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="reviewTitle">
          <Form.Label>Review Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter review title"
            name="reviewTitle"
            value={reviewData.reviewTitle}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="reviewDescription">
          <Form.Label>Review Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter review description"
            name="reviewDescription"
            value={reviewData.reviewDescription}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <StarDropdown onSelect={handleRatingChange} />
          {ratingError && (
            <Form.Control.Feedback type="invalid">
              {ratingError}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button
        variant="primary"
        onClick={handleAddReview}
        disabled={!!ratingError}
      >
        Add Review
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ReviewModal;
