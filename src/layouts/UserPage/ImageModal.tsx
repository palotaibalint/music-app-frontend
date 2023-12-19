import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface ImageModalProps {
  show: boolean;
  onClose: () => void;
  onImageSubmit: () => Promise<void>;
  onImageUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  show,
  onClose,
  onImageSubmit,
  onImageUrlChange,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(imageUrl)) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }
    await onImageSubmit();
    onClose();
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    onImageUrlChange(event);
    setErrorMessage(""); // Clear error message when the user modifies the input
  };

  function isValidUrl(url: string): boolean {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Form>
          <Form.Group>
            <Form.Label>Image URL:</Form.Label>
            <Form.Control
              type="text"
              value={imageUrl}
              onChange={handleUrlChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
