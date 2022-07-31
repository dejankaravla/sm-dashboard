import React, { useState, useEffect, useRef } from "react";
import "./OrderPage.css";
import Table from "../../components/Table/Table";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ordersApi } from "../../api/definitions";
import { orderProductColumns } from "../../components/Table/Columns";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const OrderPage = () => {
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  let { id } = useParams();
  const adminRef = useRef();
  const clientRef = useRef();

  const statusOptions = ["Processing Order", "Order Sent"];

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getOrderData = () => {
    setLoading(true);
    axios
      .get(ordersApi + id)
      .then((res) => {
        setOrderData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error.response.data.error);
      });
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const changeOrderHandler = (data) => {
    setLoading(true);
    axios
      .patch(ordersApi, data)
      .then((res) => {
        getOrderData();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error.response.data.error);
      });
  };

  return (
    <div className="order_page">
      <Loader loading={loading} />
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="order_page_container">
        <div className="order_page_header">
          <h2>ID: {orderData._id}</h2>
          <div className="order_page_controls">
            <ReactToPrint
              documentTitle={"Order Number: " + orderData.orderNumber}
              bodyClass="printOrder"
              content={() => clientRef.current}
            >
              <PrintContextConsumer>
                {({ handlePrint }) => <button onClick={handlePrint}>Print Client</button>}
              </PrintContextConsumer>
            </ReactToPrint>
            <ReactToPrint
              documentTitle={"Order Number: " + orderData.orderNumber}
              bodyClass="printOrder"
              content={() => adminRef.current}
            >
              <PrintContextConsumer>
                {({ handlePrint }) => <button onClick={handlePrint}>Print Admin</button>}
              </PrintContextConsumer>
            </ReactToPrint>

            <button
              onClick={() =>
                changeOrderHandler({
                  _id: orderData._id,
                  paid: !orderData.paid,
                })
              }
            >
              {orderData.paid ? "Not Paid" : "Paid"}
            </button>
            <button
              onClick={(e) => {
                changeOrderHandler({
                  _id: orderData._id,
                  orderStatus: e.currentTarget.textContent,
                });
              }}
            >
              {statusOptions.filter((order) => order !== orderData.orderStatus)}
            </button>
          </div>
        </div>

        <div ref={adminRef}>
          <table className="order_page_summary">
            <tr>
              <th>Client Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Client Type</th>
            </tr>
            <tbody>
              <tr>
                <th>{orderData.client}</th>
                <th>{orderData.city}</th>
                <th>{orderData.address}</th>
                <th>{orderData.mobile}</th>
                <th>{orderData.clientType}</th>
              </tr>
            </tbody>
          </table>
          <table className="order_page_summary">
            <tr>
              <th>Order Number</th>
              <th>Created By</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Paid</th>
              <th>Order Price</th>
              <th>Purchase Price</th>
              <th>Balance</th>
            </tr>
            <tbody>
              <tr>
                <th>{orderData.orderNumber}</th>
                <th>{orderData.createdBy && orderData.createdBy.name}</th>
                <th>
                  {new Date(orderData.dateCreated).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </th>
                <th>{orderData.orderStatus}</th>
                <th>{orderData.paid ? "Yes" : "No"}</th>
                <th>{orderData.orderPrice} €</th>
                <th>{orderData.totalPurchasePrice} €</th>
                <th>{orderData.balance} €</th>
              </tr>
            </tbody>
          </table>
          {!loading && (
            <Table
              header={"Order Number: " + orderData.orderNumber}
              columns={orderProductColumns}
              data={orderData.products}
              route="/products/"
            />
          )}
        </div>
        <div ref={clientRef} className="hiden">
          <table className="order_page_summary">
            <tr>
              <th>Client Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Mobile</th>
            </tr>
            <tbody>
              <tr>
                <th>{orderData.client}</th>
                <th>{orderData.city}</th>
                <th>{orderData.address}</th>
                <th>{orderData.mobile}</th>
              </tr>
            </tbody>
          </table>
          <table className="order_page_summary">
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Order Price</th>
            </tr>
            <tbody>
              <tr>
                <th>{orderData.orderNumber}</th>
                <th>
                  {new Date(orderData.dateCreated).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </th>
                <th>{orderData.orderPrice} €</th>
              </tr>
            </tbody>
          </table>
          {!loading && (
            <Table
              header={"Order Number: " + orderData.orderNumber}
              columns={orderProductColumns.filter((column) => {
                return column.id !== "Purchase Price" && column.id !== "Balance";
              })}
              data={orderData.products}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
