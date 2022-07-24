import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_container">
        <NavLink className="navbar_logo" to="/">
          DASHBOARD
        </NavLink>
        <ul className="navbar_list">
          <NavLink className={({ isActive }) => (isActive ? "navbar_Link_Active" : "")} to="/products">
            Products
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "navbar_Link_Active" : "")} to="/clients">
            Clients
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "navbar_Link_Active" : "")} to="/orders">
            Orders
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "navbar_Link_Active" : "")} to="/analytics">
            Analytics
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
