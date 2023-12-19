import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useAuth0 } from "@auth0/auth0-react";

interface FormData {
  title: string;
  artist: string;
  album: string;
  duration: string;
  img: string;
  link: string;
  genres: string;
  ownerUsername: string | undefined;
}

function isValidUrl(url: string): boolean {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

function UploadSong() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    album: "",
    artist: "",
    genres: "",
    duration: "",
    img: "",
    link: "",
    ownerUsername: user?.nickname || "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => {
    setShow(false);
    setFormData({
      title: "",
      album: "",
      artist: "",
      genres: "",
      duration: "",
      img: "",
      link: "",
      ownerUsername: user?.nickname || "",
    });
    setErrorMessage("");
  };

  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "img" && !isValidUrl(value)) {
      setErrorMessage("Invalid URL for the song cover.");
      return;
    }
    if (name === "youtubeLink" && !isValidUrl(value)) {
      setErrorMessage("Invalid URL for the YouTube link.");
      return;
    }

    setErrorMessage("");
    setFormData({ ...formData, [name]: value });
  };

  const handleUpload = async () => {
    if (!isValidUrl(formData.link)) {
      setErrorMessage("Please enter a valid YouTube link.");
      return;
    }
    if (formData.duration && !/^\d+:\d+$/.test(formData.duration)) {
      setErrorMessage(
        "Invalid duration format. Use minute:seconds (e.g., 3:45)."
      );
      return;
    }

    const genresArray = formData.genres.split(",").map((genre) => genre.trim());

    if (genresArray.some((genre) => genre === "")) {
      setErrorMessage(
        "Invalid genres format. Ensure genres are comma-separated."
      );
      return;
    }

    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: "https://music-api",
        scope: "openid profile email",
      },
    });

    const response = await fetch(
      `http://localhost:8081/api/songs/private/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      handleClose();
    } else {
      setErrorMessage("An error occurred while uploading the song.");
    }
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
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                placeholder="Enter genres separated by commas."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Enter duration in minutes:seconds format."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Song Cover URL</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={formData.img}
                onChange={handleChange}
                placeholder="Enter a valid URL to the song cover."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Enter YouTube video link."
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
