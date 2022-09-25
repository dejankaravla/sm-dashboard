import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { handleLogout } from "../../store/users/usersAction";
import { useDispatch } from "react-redux";

const Navbar = ({ setAuth }) => {
  const [mobileMenu, setMobileMenu] = useState(true);

  const dispatch = useDispatch();

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
          <li
            onClick={() => {
              localStorage.removeItem("accessToken");
              dispatch(handleLogout());
              setAuth(false);
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
