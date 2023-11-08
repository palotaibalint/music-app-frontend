import React from "react";
import { useNavigate } from "react-router-dom";

const RedirectComponent: React.FC = () => {
  const navigate = useNavigate();
  navigate("/");
  return null;
};

export default RedirectComponent;
