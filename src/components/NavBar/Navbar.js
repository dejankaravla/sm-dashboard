import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(true);

  return (
    <div className="navbar ">
      <div className={`navbar_container ${!mobileMenu ? "navbar_container_mobile" : ""}`}>
        <NavLink onClick={() => setMobileMenu(true)} className="navbar_logo" to="/">
          DASHBOARD
        </NavLink>

        <AiOutlineMenu
          className={`mobileMenu ${mobileMenu ? "menuEnable" : ""}`}
          onClick={() => setMobileMenu(false)}
        />

        <ul className={`navbar_list ${mobileMenu ? "navbar_list_mobileDisable" : "navbar_list_mobile"}`}>
          <NavLink
            onClick={() => setMobileMenu(true)}
            className={({ isActive }) => (isActive ? "navbar_Link_Active" : "")}
            to="/products"
          >
            Products
          </NavLink>
          <NavLink
            onClick={() => setMobileMenu(true)}
            className={({ isActive }) => (isActive ? "navbar_Link_Active" : "")}
            to="/clients"
          >
            Clients
          </NavLink>
          <NavLink
            onClick={() => setMobileMenu(true)}
            className={({ isActive }) => (isActive ? "navbar_Link_Active" : "")}
            to="/orders"
          >
            Orders
          </NavLink>
          <NavLink
            onClick={() => setMobileMenu(true)}
            className={({ isActive }) => (isActive ? "navbar_Link_Active" : "")}
            to="/analytics"
          >
            Analytics
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
