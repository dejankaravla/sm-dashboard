import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import Table from "../../components/Table/Table";
import ProductsSidebar from "../../components/ProductsSidebar/ProductsSidebar";
import Loader from "../../components/Loader/Loader";
import { productsColumns } from "../../components/Table/Columns";
import { categoriesApi, productsApi } from "../../api/definitions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [error, setError] = useState([]);

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getProducts = (option) => {
    setLoading(true);
    axios
      .get(productsApi, {
        params: {
          ...option,
        },
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error);
      });
  };

  const getProductCategories = () => {
    setLoading(true);
    axios
      .get(categoriesApi)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error.response.data.error);
      });
  };

  useEffect(() => {
    getProducts();
    getProductCategories();
  }, []);

  return (
    <div className="products">
      <Loader loading={loading} />
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="products_container">
        <ProductsSidebar
          categories={categories}
          getProducts={getProducts}
          setSelectedSubcategory={setSelectedSubcategory}
          selectedSubcategory={selectedSubcategory}
        />
        <div className="products_display">
          {!loading && (
            <Table
              data={products}
              getData={getProducts}
              header={selectedSubcategory || "All Products"}
              columns={productsColumns}
              addButtonName="Add Product"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
