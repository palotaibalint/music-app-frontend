import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

interface FormData {
  title: string;
  album: string;
  artist: string;
  duration: string;
  img: string;
}

function UploadSong() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    album: "",
    artist: "",
    duration: "",
    img: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => {
    setShow(false);
    setFormData({
      title: "",
      album: "",
      artist: "",
      duration: "",
      img: "",
    });
    setErrorMessage("");
  };

  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "duration") {
      // Validate the "duration" format (minute:seconds)
      if (!/^\d+:\d+$/.test(value)) {
        setErrorMessage(
          "Invalid duration format. Use minute:seconds (e.g., 3:45)."
        );
      } else {
        setErrorMessage("");
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpload = () => {
    fetch("http://localhost:8081/api/songs/addSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add the song");
        }
      })
      .then((createdSong) => {
        console.log("Song added:", createdSong);
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding the song:", error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Upload a song
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Album</Form.Label>
              <Form.Control
                type="text"
                name="album"
                value={formData.album}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={formData.img}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadSong;
