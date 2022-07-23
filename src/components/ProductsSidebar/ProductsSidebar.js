import React from "react";
import "./ProductsSidebar.css";
import ProductsSidebarClasses from "./ProductsSidebarClasses";
import { Link } from "react-router-dom";

function ProductsSidebar({ productClasses, getProducts, setSelectedSubcategory, selectedSubcategory }) {
  return (
    <div className="products_sidebar">
      <div className="products_sidebar_add">
        <Link to="/productClasses">Categories</Link>
      </div>
      <div className="products_sidebar_classList">
        <p
          onClick={() => {
            getProducts();
            setSelectedSubcategory("All Products");
          }}
        >
          All Products
        </p>
      </div>

      {productClasses.map((item) => {
        return (
          <ProductsSidebarClasses
            item={item}
            getProducts={getProducts}
            setSelectedSubcategory={setSelectedSubcategory}
            selectedSubcategory={selectedSubcategory}
          />
        );
      })}
    </div>
  );
}

export default ProductsSidebar;
