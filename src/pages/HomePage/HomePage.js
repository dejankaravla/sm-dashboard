import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { useSelector } from "react-redux";

const HomePage = () => {
  const admin = useSelector(({ users }) => users.admin);
  return (
    <div className="homePage">
      <div className="homePage_container">
        <div className="homePage_welcome">
          <h1>Welcome {admin}</h1>
        </div>
        <div className="homePage_links">
          <Link to="AddProduct">Add Product</Link>
          <Link to="AddClient">Add Client</Link>
          <Link to="AddOrder">Add Order</Link>
          <Link to="/categories">Categories</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
