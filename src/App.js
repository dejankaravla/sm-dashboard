import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Products from "./pages/Products/Products";
import ProductPage from "./pages/ProductPage/ProductPage";
import Clients from "./pages/Clients/Clients";
import ClientPage from "./pages/ClientPage/ClientPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoutes from "./ProtectedRoutes";
import ProductCategories from "./pages/ProductCategories/ProductCategories";

import { useSelector } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector(({ users }) => users.isLoggedIn);



  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path='/' element={isLoggedIn ? <HomePage /> : <LoginPage />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="productClasses" element={<ProductCategories />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientPage />} />
        </Route>


      </Routes>
    </div>
  );
};

export default App;
