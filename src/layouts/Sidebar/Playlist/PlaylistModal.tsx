import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface PlaylistModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddPlaylist: (name: string, generate: boolean) => Promise<void>;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (newName: string) => void;
  handleGenreChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  generateChecked: boolean;
  popularChecked: boolean;
  playlistName: string;
  genre: string;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({
  show,
  handleClose,
  handleAddPlaylist,
  handleCheckboxChange,
  handleNameChange,
  handleGenreChange,
  generateChecked,
  popularChecked,
  playlistName,
  genre,
}) => {
  const [name, setName] = useState<string | undefined>(playlistName);

  const handleAddPlaylistClick = async () => {
    await handleAddPlaylist(name || "", generateChecked);
    handleClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddPlaylistClick();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
          <Form.Group controlId="formGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre"
              value={genre}
              onChange={handleGenreChange}
              disabled={!generateChecked}
            />
          </Form.Group>
          <Form.Group controlId="formPopularCheckbox">
            <Form.Check
              type="checkbox"
              label="Popular"
              name="popular"
              checked={popularChecked}
              onChange={handleCheckboxChange}
              disabled={!generateChecked}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleAddPlaylistClick}
        >
          Add Playlist
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlaylistModal;
