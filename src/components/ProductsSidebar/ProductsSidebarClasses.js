import React, { useState } from "react";
import "./ProductsSidebar.css";

const ProductsSidebarClasses = ({ item, getProducts, setSelectedSubcategory, selectedSubcategory }) => {
  const [subclassOpen, setSubclassOpen] = useState(false);

  return (
    <div key={item._id} className="products_sidebar_classList">
      <p onClick={() => setSubclassOpen(!subclassOpen)}>{item.name.label}</p>
      {subclassOpen && (
        <ul>
          {item.subclass.map((subItem) => {
            const productHeader = `${item.name.label}: ${subItem.label}`;
            return (
              <li
                className={selectedSubcategory === productHeader && "selectedSubcategory"}
                onClick={() => {
                  getProducts({ productClass: item.name.label, productSubclass: subItem.label });
                  setSelectedSubcategory(`${item.name.label}: ${subItem.label}`);
                }}
                key={subItem.label}
              >
                {subItem.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductsSidebarClasses;
