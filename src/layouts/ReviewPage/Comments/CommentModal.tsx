import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface CommentModalProps {
  show: boolean;
  handleClose: () => void;
  commentData: {
    text: string;
  };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleAddComment: () => void;
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const CommentModal: React.FC<CommentModalProps> = ({
  show,
  handleClose,
  commentData,
  handleInputChange,
  handleAddComment,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Reply to the review</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentText">
          <Form.Label>Reply</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your reply..."
            name="text"
            value={commentData.text}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAddComment}>
        Reply
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CommentModal;
