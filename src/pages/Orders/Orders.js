import React, { useState, useEffect } from "react";
import "./Orders.css";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import axios from "axios";
import { ordersColumns } from "../../components/Table/Columns";
import { ordersApi } from "../../api/definitions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getOrders = (query) => {
    setLoading(true);
    axios
      .get(ordersApi, {
        params: {
          ...query,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setErrorHandler(error.response.data.error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders">
      <Loader loading={loading} />
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="orders_container">
        {!loading && (
          <Table
            addButtonName="Add Order"
            header="Orders"
            sort={[{ id: "Order Number", desc: true }]}
            getData={getOrders}
            data={orders}
            columns={ordersColumns}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
