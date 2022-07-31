import React, { useState } from "react";
import "./ProductsSidebar.css";

const Category = ({ category, getProducts, setSelectedSubcategory, selectedSubcategory }) => {
  const [subcategoriesOpen, setSubcategoriesOpen] = useState(false);
  return (
    <div key={category._id} className="products_sidebar_categoryList">
      <p onClick={() => setSubcategoriesOpen(!subcategoriesOpen)}>{category.name}</p>
      {subcategoriesOpen && (
        <ul>
          {category.subcategory &&
            category.subcategory.length > 0 &&
            category.subcategory.map((subcategory) => {
              const productHeader = `${category.name}: ${subcategory}`;
              return (
                <li
                  className={selectedSubcategory === productHeader && "selectedSubcategory"}
                  onClick={() => {
                    getProducts({ category: category.name, subcategory: subcategory });
                    setSelectedSubcategory(`${category.name}: ${subcategory}`);
                  }}
                  key={subcategory}
                >
                  {subcategory}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Category;
