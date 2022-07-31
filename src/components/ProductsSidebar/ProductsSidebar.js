import React from "react";
import "./ProductsSidebar.css";
import Category from "./Category";
import { Link } from "react-router-dom";

function ProductsSidebar({ categories, getProducts, setSelectedSubcategory, selectedSubcategory }) {
  return (
    <div className="products_sidebar">
      <div className="products_sidebar_add">
        <Link to="/categories">Categories</Link>
      </div>
      <div className="products_sidebar_categoryList">
        <p
          onClick={() => {
            getProducts();
            setSelectedSubcategory("All Products");
          }}
        >
          All Products
        </p>
      </div>

      {categories.map((category) => {
        return (
          <Category
            category={category}
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
