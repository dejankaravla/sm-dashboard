import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import Table from "../../components/Table/Table";
import ProductForm from "../../components/ProductForm/ProductForm";
import ProductsSidebar from "../../components/ProductsSidebar/ProductsSidebar";
import ClipLoader from "react-spinners/ClipLoader";

function Products() {
  const [products, setProducts] = useState([]);
  const [productClasses, setProductClasses] = useState([]);
  const [productForm, setProductForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const getProducts = (option) => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/products/`, {
        params: {
          ...option,
        },
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
  };

  const getProductClasses = () => {
    setLoading(true);
    axios.get(`http://localhost:8000/productClasses`).then((res) => {
      setProductClasses(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
    getProductClasses();
  }, []);

  return (
    <div className="products">
      <div className="products_loader">
        <ClipLoader size={100} color="red" loading={loading} />
      </div>
      <div className="products_container">
        <ProductsSidebar
          productClasses={productClasses}
          getProducts={getProducts}
          setSelectedSubcategory={setSelectedSubcategory}
          selectedSubcategory={selectedSubcategory}
        />
        <div className="products_display">
          {!loading && (
            <Table
              products={products}
              getProducts={getProducts}
              setProductForm={setProductForm}
              header={selectedSubcategory}
            />
          )}
          {productForm && (
            <ProductForm
              setProductForm={setProductForm}
              getData={getProducts}
              setLoading={setLoading}
              productClasses={productClasses}
              formType="add"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
