import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn, token }) => {
  return !isLoggedIn && !token ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoutes;
