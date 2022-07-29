import React, { useState, useEffect } from "react";
import './OrderForm.css'
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { IoClose } from "react-icons/io5";
import Select from "../Select/Select";
import ProductItem from "../ProductItem/ProductItem";

const OrderForm = ({ formType }) => {
  const [error, setError] = useState([]);
  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedCategories, setSelectedCategories] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')


  const orderStatus = [
    { label: 'In Porgress', value: 'inProgress' },
    { label: 'Realised', value: 'realised' }
  ]


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const item = watch();

  const getClients = () => {
    axios
      .get(`http://localhost:8000/clients/`)
      .then((res) => {
        setClients(res.data);
      }).catch((error) => {
        console.log(error);
      })
  };

  const getProducts = (query) => {
    axios
      .get(`http://localhost:8000/products/`, {
        params: {
          ...query
        }
      })
      .then((res) => {
        setProducts(res.data);
      }).catch((error) => {
        console.log(error);
      });
  };
  const getCategories = () => {
    axios
      .get(`http://localhost:8000/productClasses/`)
      .then((res) => {
        setCategories(res.data);
      }).catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getClients()
    getCategories()
  }, []);


  useEffect(() => {
    setSelectedSubcategory('')
  }, [selectedCategories])


  useEffect(() => {
    if (selectedSubcategory) {
      getProducts({ productClass: selectedCategories, productSubclass: selectedSubcategory })
    } else {
      getProducts({ productClass: selectedCategories })
    }
  }, [selectedCategories, selectedSubcategory])

  const selectClientHandler = (clientName) => {
    const [client] = clients.filter((cli) => cli.name === clientName)
    setSelectedClient({
      client: client.name,
      clientID: client._id,
      createdBy: 'admin',
      clientType: client.clientType,
      address: client.address,
      city: client.city,
      mobile: client.mobile,
    })
  }

  const addProduct = (product) => {
    setSelectedProducts([...selectedProducts, product])
  }

  const removeProduct = (product) => {
    const newProducts = selectedProducts.filter((item) => item.name !== product.name
    )
    setSelectedProducts(newProducts)

  }

  const onSubmit = () => {
    const newData = { ...selectedClient, selectedProducts }
    newData.orderPrice = selectedProducts.map((total) => total.totalPrice).reduce((total, num) => total + num
    )
    newData.totalPurchasePrice = selectedProducts.map((purchase) => purchase.totalPurchasePrice).reduce((total, num) => total + num)
    newData.balance = selectedProducts.map((balance) => balance.balance).reduce((total, num) => total + num)
    newData.orderStatus = 'In Porgress'
    newData.paid = false

    axios.post(`http://localhost:8000/orders`, newData).then((res) => {
      console.log(res);
    }).catch((error) => {
      const err = Object.values(error.response.data.errors).map((err) => err.message)
      setError(err);
      setTimeout(() => {
        setError([]);
      }, 3000);
    })
  }

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
                  options={clients.length > 0 && clients.map((client) => { return { label: client.name, value: client.name } })}
                />
                {errors.clientType && <p className="error_message">Client Type is required.</p>}
              </div>
              <div className="order_form_products_container">
                <div className="order_form_products_filter">
                  <Select
                    placeholder="Select Category"
                    options={categories.map((category) => category.name)
                    }
                    onChange={setSelectedCategories}
                    value={selectedCategories}
                  />
                  <Select
                    placeholder="Select Subcategory"
                    disabled={!selectedCategories}
                    onChange={setSelectedSubcategory}
                    value={selectedSubcategory}
                    options={() => {
                      if (selectedCategories) {
                        const newCategory = categories.filter((category) => {
                          return selectedCategories === category.name.label
                        })
                        return newCategory[0].subclass
                      }
                    }}
                  />
                </div>
              </div>
              <div className="order_form_products">
                {products.length > 0 && products.map((product) => {
                  return (
                    <ProductItem product={product} addProduct={addProduct} />
                  )
                })}
              </div>
            </form>
          </div>
          <div className="order_right">
            <div className="order_summary">
              <h3>Order</h3>
              <div className="order_client">
                {selectedClient && selectedClient.name && <p>Client: <span>{selectedClient.name}</span></p>}
                {selectedClient && selectedClient.address && <p>Address: <span>{selectedClient.address}</span></p>}
                {selectedClient && selectedClient.city && <p>City: <span>{selectedClient.city}</span></p>}
                {selectedClient && selectedClient.mobile && <p>Mobile: <span>{selectedClient.mobile}</span></p>}
              </div>
              <div className="order_summary_products">
                {selectedProducts.map((product) => {
                  return (
                    <div className="order_summary_product">
                      <img src={`http://localhost:8000/public/productImages/${product.images[0]}`} />
                      <div className="order_summary_product_info">
                        <div className="order_summary_product_info_name">
                          <p><span>Name: </span>{product.name}</p>
                          <IoClose onClick={() => (removeProduct(product))} size={20} color="red" />
                        </div>
                        <div className="order_summary_product_info_balance">
                          <p><span>Quantity: </span> {product.quantity}</p>
                          <p><span>Price: </span> {product.price} €</p>
                          <p><span>Purchase: </span> {product.purchasePrice} €</p>
                          <p><span>Balance: </span> {product.balance} €</p>
                          <p><span>Total Price: </span> {product.totalPrice} €</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button onClick={onSubmit} className={`order_summary_submit`}>Submit Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderForm