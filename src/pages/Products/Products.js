import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import Table from "../../components/Table/Table";
import ProductForm from "../../components/ProductForm/ProductForm";
import ProductsSidebar from "../../components/ProductsSidebar/ProductsSidebar";
import Loader from "../../components/Loader/Loader";

function Products() {
  const [products, setProducts] = useState([]);
  const [productClasses, setProductClasses] = useState([]);
  const [productForm, setProductForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const columns = [
    {
      accessorKey: "name",
      id: "Product Name",
      header: () => <span>Product Name</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.productClass,
      id: "Category",
      header: () => <span>Category</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.productSubclass,
      id: "Subcategory",
      header: () => <span>Subcategory</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.price + " €",
      id: "Price",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Price</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "quantity",
      id: "Quantity",
      header: () => <span>Quantity</span>,
      footer: (info) => {
        return info.column.id;
      },
    },
    {
      accessorFn: (row) => row.purchasePrice + " €",
      id: "Purchase Price",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Purchase Price</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.price - row.purchasePrice + " €",
      id: "Balance",
      cell: (info) => <i>{info.getValue()}</i>,
      header: "Balance",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "published",
      id: "Published",
      header: () => <span>Published</span>,
      footer: (info) => info.column.id,
    },
  ];

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
      }).catch((error) => {
        setLoading(false)
        console.log(error);
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
      <Loader loading={loading} />
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
              data={products}
              getData={getProducts}
              setAddNew={setProductForm}
              header={selectedSubcategory || "All Products"}
              columns={columns}
              addButtonName="Add Product"
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
