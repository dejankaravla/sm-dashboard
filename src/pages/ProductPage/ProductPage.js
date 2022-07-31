import React, { useState, useEffect } from "react";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { productsApi } from "../../api/definitions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function ProductPage() {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  let { id } = useParams();
  const navigate = useNavigate();

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getProductData = () => {
    setLoading(true);
    axios
      .get(productsApi + id)
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error.response.data.error);
      });
  };

  const deleteProduct = () => {
    setLoading(true);
    axios
      .delete(productsApi + id)
      .then((res) => {
        setLoading(false);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error.response.data.error);
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="product">
      <Loader loading={loading} />
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      {!loading && (
        <div className="product_container">
          <div className="product_header">
            <h2>ID: {productData._id}</h2>

            <div className="product_buttons">
              <Link to={`/EditProduct/${productData._id}`}>Edit</Link>
              <button onClick={() => deleteProduct()}>Delete</button>
            </div>
          </div>
          <div className="product_body">
            <div className="product_left">
              {productData.images &&
                productData.images.map((img) => {
                  return (
                    <img
                      key={img}
                      className="product_img"
                      src={`http://localhost:8000/public/productImages/${img}`}
                      alt="imgtesting"
                    />
                  );
                })}
            </div>
            <div className="product_right">
              <div className="product_info_main">
                <p>
                  <span> Name: </span>
                  {productData.name}
                </p>
                <p>
                  <span>Category: </span>
                  {productData.category && productData.category}
                </p>
                <p>
                  <span>Subcategory: </span>
                  {productData.subcategory && productData.subcategory}
                </p>
                <p>
                  <span>Price: </span>
                  {productData.price} €
                </p>
                <p>
                  <span>Quantity: </span>
                  {productData.quantity}
                </p>
                <p>
                  <span>Purchase Price: </span>
                  {productData.purchasePrice} €
                </p>
                <p>
                  <span>Balance: </span>
                  {productData.price - productData.purchasePrice} €
                </p>
                <p>
                  <span>Description: </span>
                  {productData.description}
                </p>
                <p>
                  <span>Created At: </span>
                  {productData.dateCreated &&
                    new Date(productData.dateCreated).toLocaleString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
                {productData.dateModified && (
                  <p>
                    <span>Updated At: </span>

                    {new Date(productData.dateModified).toLocaleString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
