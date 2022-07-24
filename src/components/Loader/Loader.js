import React from "react";
import "./Loader.css";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => {
  return (
    <div className="loader">
      <ClipLoader size={100} color="red" loading={loading} />
    </div>
  );
};

export default Loader;
