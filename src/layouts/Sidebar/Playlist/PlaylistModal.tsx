// PlaylistModal.tsx
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface PlaylistModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddPlaylist: (name: string, generate: boolean) => Promise<void>;
  handleCheckboxChange: () => void;
  handleNameChange: (newName: string) => void;
  generateChecked: boolean;
  playlistName: string;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({
  show,
  handleClose,
  handleAddPlaylist,
  handleCheckboxChange,
  handleNameChange,
  generateChecked,
  playlistName,
}) => {
  const [name, setName] = useState<string | undefined>(playlistName);

  const handleAddPlaylistClick = async () => {
    await handleAddPlaylist(name || "", generateChecked);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter playlist name"
              value={name || ""}
              onChange={(e) => {
                setName(e.target.value);
                handleNameChange(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formGenerateCheckbox">
            <Form.Check
              type="checkbox"
              label="Generate"
              name="generate"
              checked={generateChecked}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddPlaylistClick}>
          Add Playlist
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlaylistModal;
