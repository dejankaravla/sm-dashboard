import React, { useState, useEffect } from "react";
import "./OrderForm.css";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { IoClose } from "react-icons/io5";
import Select from "../Select/Select";
import ProductItem from "../ProductRow/ProductRow";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ordersApi, productsApi, categoriesApi, clientsApi, routeUrl } from "../../api/definitions";

const OrderForm = ({ formType }) => {
  const [error, setError] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orderPaid, setOrderPaid] = useState(false);

  const { id, admin } = useSelector(({ users }) => users);

  const navigate = useNavigate();

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getClients = () => {
    axios
      .get(clientsApi)
      .then((res) => {
        setClients(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorHandler(error.response.data.error);
      });
  };

  const getProducts = (query) => {
    axios
      .get(productsApi, {
        params: {
          ...query,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorHandler(error.response.data.error);
      });
  };
  const getCategories = () => {
    axios
      .get(categoriesApi)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorHandler(error.response.data.error);
      });
  };

  useEffect(() => {
    getClients();
    getCategories();
  }, []);

  useEffect(() => {
    setSelectedSubcategory("");
  }, [selectedCategories]);

  useEffect(() => {
    if (selectedSubcategory) {
      getProducts({ category: selectedCategories, subcategory: selectedSubcategory });
    } else {
      getProducts({ category: selectedCategories });
    }
  }, [selectedCategories, selectedSubcategory]);

  const selectClientHandler = (clientName) => {
    if (clientName) {
      const [client] = clients.filter((cli) => cli.name === clientName);
      setSelectedClient({
        client: client.name,
        clientID: client._id,
        createdBy: { name: admin, creatorId: id },
        clientType: client.clientType,
        address: client.address,
        city: client.city,
        mobile: client.mobile,
      });
    }
  };

  const addProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const removeProduct = (product) => {
    const newProducts = selectedProducts.filter((item) => item.name !== product.name);
    setSelectedProducts(newProducts);
  };

  const onSubmit = () => {
    const newData = { ...selectedClient, products: [...selectedProducts] };
    newData.orderPrice = selectedProducts.map((total) => total.totalPrice).reduce((total, num) => total + num);
    newData.totalPurchasePrice = selectedProducts
      .map((purchase) => purchase.totalPurchasePrice)
      .reduce((total, num) => total + num);
    newData.balance = selectedProducts.map((balance) => balance.balance).reduce((total, num) => total + num);
    newData.orderStatus = selectedStatus;
    newData.paid = orderPaid === "Order is Paid";

    axios
      .post(ordersApi, newData)
      .then((res) => {
        navigate("/orders");
      })
      .catch((error) => {
        const err = Object.values(error.response.data.errors).map((err) => err.message);
        setErrorHandler(err);
      });
  };

  const orderOpen = Object.keys(selectedClient).length > 0 || selectedProducts.length > 0;

  return (
    <div className="order_form">
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="order_form_container">
        <div className="order_form_header">
          <h1>Add Order</h1>
        </div>
        <div className="order_body">
          <div className="order_left">
            <form>
              <div className="order_form_inputContainer">
                <Select
                  placeholder="Select Client"
                  onChange={selectClientHandler}
                  options={clients.length > 0 ? clients.map((client) => client.name) : []}
                />
              </div>
              <div className="order_form_products_container">
                <div className="order_form_products_filter">
                  <Select
                    placeholder="Select Status"
                    options={["Processing Order", "Order Sent"]}
                    onChange={setSelectedStatus}
                    value={selectedStatus}
                  />
                  <Select
                    placeholder="Select Order Paid"
                    onChange={setOrderPaid}
                    value={orderPaid}
                    options={["Order is Paid", "Order is Not Paid"]}
                  />
                </div>
                <div className="order_form_products_filter">
                  <Select
                    placeholder="Select Category"
                    options={categories.map((category) => category.name)}
                    onChange={setSelectedCategories}
                    value={selectedCategories}
                  />
                  <Select
                    placeholder="Select Subcategory"
                    changeEvent={selectedCategories}
                    disabled={!selectedCategories}
                    onChange={setSelectedSubcategory}
                    value={selectedSubcategory}
                    options={() => {
                      if (selectedCategories) {
                        const newCategory = categories.filter((category) => {
                          return selectedCategories === category.name;
                        });
                        return newCategory[0].subcategory;
                      }
                    }}
                  />
                </div>
              </div>
              <div className="order_form_products">
                {products.length > 0 &&
                  products.map((product) => {
                    return <ProductItem product={product} addProduct={addProduct} />;
                  })}
              </div>
            </form>
          </div>
          {orderOpen && (
            <div className="order_right">
              <div className="order_summary">
                <h3>Order</h3>
                <div className="order_client">
                  {selectedClient && selectedClient.client && (
                    <p>
                      Client: <span>{selectedClient.client}</span>
                    </p>
                  )}
                  {selectedClient && selectedClient.address && (
                    <p>
                      Address: <span>{selectedClient.address}</span>
                    </p>
                  )}
                  {selectedClient && selectedClient.city && (
                    <p>
                      City: <span>{selectedClient.city}</span>
                    </p>
                  )}
                  {selectedClient && selectedClient.mobile && (
                    <p>
                      Mobile: <span>{selectedClient.mobile}</span>
                    </p>
                  )}
                </div>

                <div className="order_summary_products">
                  {selectedProducts.map((product) => {
                    return (
                      <div className="order_summary_product">
                        <img src={`${routeUrl}public/productImages/${product.images[0]}`} alt="product img" />
                        <div className="order_summary_product_info">
                          <div className="order_summary_product_info_name">
                            <p>
                              <span>Name: </span>
                              {product.name}
                            </p>
                            <IoClose onClick={() => removeProduct(product)} size={20} color="red" />
                          </div>
                          <div className="order_summary_product_info_balance">
                            <p>
                              <span>Quantity: </span> {product.quantity}
                            </p>
                            <p>
                              <span>Price: </span> {product.price} €
                            </p>
                            <p>
                              <span>Purchase: </span> {product.purchasePrice} €
                            </p>
                            <p>
                              <span>Balance: </span> {product.balance} €
                            </p>
                            <p>
                              <span>Total Price: </span> {product.totalPrice} €
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {selectedProducts.length > 0 && Object.keys(selectedClient).length > 0 && (
                  <div className="order_summary_submit_full">
                    <h3>
                      Order Price:{" "}
                      <span>
                        {selectedProducts.map((total) => total.totalPrice).reduce((total, num) => total + num)}
                      </span>{" "}
                      €
                    </h3>
                    <h3>
                      Order Balance:{" "}
                      <span>
                        {selectedProducts.map((balance) => balance.balance).reduce((total, num) => total + num)}
                      </span>{" "}
                      €
                    </h3>
                  </div>
                )}
                {selectedProducts.length > 0 && Object.keys(selectedClient).length > 0 && (
                  <button onClick={onSubmit} className="order_summary_submit">
                    Submit Order
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
