import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Products from "./pages/Products/Products";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductClasses from "./pages/ProductClasses/ProductClasses";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="productClasses" element={<ProductClasses />} />
      </Routes>
    </div>
  );
}

export default App;
