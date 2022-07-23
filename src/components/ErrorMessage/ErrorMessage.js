import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ errorMessage, setError }) => {
  return (
    <div className="errorMessage">
      <div className="errorMessage_container">
        <p onClick={() => setError("")} className="errorMessage_close">
          x
        </p>
        <div className="error">
          <h1>Error</h1>
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
