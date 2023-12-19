import React from "react";
import { useNavigate } from "react-router-dom";

const SeeMessagesButton = () => {
  const navigate = useNavigate();

  const handleSeeMessagesClick = () => {
    navigate("/messages");
  };

  return (
    <button className="btn btn-primary" onClick={handleSeeMessagesClick}>
      See Messages
    </button>
  );
};

export default SeeMessagesButton;
