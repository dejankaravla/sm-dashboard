import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
import Orders from "./pages/Orders/Orders";
import OrderForm from "./components/OrderForm/OrderForm";
import OrderPage from "./pages/OrderPage/OrderPage";
import axios from "axios";
import { routeUrl } from "./api/definitions";
import Loader from "./components/Loader/Loader";
import { handleLogin, handleLogout } from "./store/users/usersAction";
import { useSelector, useDispatch } from "react-redux";
import ProductForm from "./components/ProductForm/ProductForm";
import ClientsForm from "./components/ClientsForm/ClientsForm";

const App = () => {
  const isLoggedIn = useSelector(({ users }) => users.isLoggedIn);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`${routeUrl}isUserAuth`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          dispatch(handleLogin(res.data));
          setAuth(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          dispatch(handleLogout());
          setAuth(false);
          setLoading(false);
        });
    } else {
      setAuth(false);
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);
  console.log(auth);

  return (
    <div className="App">
      <Loader loading={loading} />
      {!loading && auth && <Navbar setAuth={setAuth} />}
      {!loading && (
        <Routes>
          <Route path="/" element={auth ? <HomePage /> : <LoginPage />} />
          <Route element={<ProtectedRoutes token={token} isLoggedIn={auth} />}>
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductPage />} />
            <Route path="categories" element={<ProductCategories />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/:id" element={<ClientPage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="AddProduct" element={<ProductForm formType="add" />} />
            <Route path="EditProduct/:id" element={<ProductForm formType="edit" />} />
            <Route path="AddClient" element={<ClientsForm formType="add" />} />
            <Route path="EditClient/:id" element={<ClientsForm formType="edit" />} />
            <Route path="AddOrder" element={<OrderForm formType="add" />} />
            <Route path="EditOrder" element={<OrderForm formType="edit" />} />
            <Route path="orders/:id" element={<OrderPage />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
