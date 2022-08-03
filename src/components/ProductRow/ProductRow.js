import React, { useState } from "react";
import "./ProductRow.css";
import { routeUrl } from "../../api/definitions";

const ProductRow = ({ product, addProduct }) => {
  const [selectQuantity, setSelectQuantity] = useState("");

  return (
    <div key={product._id} className="product_row">
      <img src={`${routeUrl}public/productImages/${product.images[0]}`} alt="product img" />
      <div className="product_row_name">
        <p>{product.name}</p>
        <div className="product_row_input">
          <input value={selectQuantity} onChange={(e) => setSelectQuantity(+e.target.value)} min="0" type="number" />
          <button
            className={!selectQuantity && "disabled"}
            disabled={!selectQuantity}
            onClick={() => {
              if (selectQuantity) {
                addProduct({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  purchasePrice: product.purchasePrice,
                  images: product.images,
                  quantity: selectQuantity,
                  totalPrice: selectQuantity * product.price,
                  totalPurchasePrice: selectQuantity * product.purchasePrice,
                  balance: selectQuantity * product.price - selectQuantity * product.purchasePrice,
                });
                setSelectQuantity("");
              }
            }}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRow;
