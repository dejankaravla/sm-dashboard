import React, { useState, useEffect } from "react";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import ProductForm from "../../components/ProductForm/ProductForm";
import Loader from "../../components/Loader/Loader";

function ProductPage() {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [productClasses, setProductClasses] = useState([]);
  const [productForm, setProductForm] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();

  const getProductData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductClasses = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/productClasses`)
      .then((res) => {
        setProductClasses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/products/${id}`)
      .then((res) => {
        setLoading(false);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductData();
    getProductClasses();
  }, []);

  return (
    <div className="product">
      {productForm && (
        <ProductForm
          setProductForm={setProductForm}
          setLoading={setLoading}
          productClasses={productClasses}
          getData={getProductData}
          productData={productData}
          formType="edit"
        />
      )}
      <Loader loading={loading} />
      {!loading && (
        <div className="product_container">
          <div className="product_header">
            <h2>ID: {productData._id}</h2>

            <div className="product_buttons">
              <button onClick={() => setProductForm(true)}>Edit</button>
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
                  {productData.productClass && productData.productClass}
                </p>
                <p>
                  <span>Subcategory: </span>
                  {productData.productSubclass && productData.productSubclass}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
