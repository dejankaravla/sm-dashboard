import React from "react";
import "./ErrorMessage.css";
import { IoClose } from "react-icons/io5";

const ErrorMessage = ({ errorMessage, setError }) => {
  return (
    <div className="errorMessage">
      <div className="errorMessage_container">
        <div className="errorMessage_close">
          <IoClose onClick={() => setError("")} />
        </div>

        <div className="error">
          <h1>Error</h1>
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
