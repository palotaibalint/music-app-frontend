import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface SendMessageButtonProps {
  username: string | undefined;
}

const SendMessageButton: React.FC<SendMessageButtonProps> = ({ username }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const handleSeeMessagesClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendMessage = async () => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const response = await fetch(
          `http://localhost:8081/api/messages/private/add?sender=${user?.nickname}&receiver=${username}&content=${message}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error sending message");
        }

        console.log("Message sent successfully");
        setMessage("");
        setShowModal(false);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <>
      <Button className="btn btn-primary" onClick={handleSeeMessagesClick}>
        Send Message
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send a Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            style={{ width: "100%", minHeight: "100px" }}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendMessageButton;
