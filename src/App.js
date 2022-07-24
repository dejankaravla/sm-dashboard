import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Products from "./pages/Products/Products";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductClasses from "./pages/ProductClasses/ProductClasses";
import Clients from "./pages/Clients/Clients";
import ClientPage from "./pages/ClientPage/ClientPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  const [authenticate, setAuthenticate] = useState(false);

  return (
    <div className="App">
      {!authenticate && <LoginPage setAuthenticate={setAuthenticate} />}
      {authenticate && <Navbar />}
      {authenticate && (
        <Routes>
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="productClasses" element={<ProductClasses />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientPage />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
