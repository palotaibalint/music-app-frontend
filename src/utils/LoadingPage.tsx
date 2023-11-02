import React from "react";

const LoadingScreen = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 background-main">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
