import React, { useState, useEffect } from "react";
import "./ClientPage.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import { clientColumns } from "../../components/Table/Columns";
import { ordersApi, clientsApi } from "../../api/definitions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const ClientPage = () => {
  const [clientData, setClientData] = useState([]);
  const [clientsOrders, setClientsOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  let { id } = useParams();
  const navigate = useNavigate();

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getClientData = () => {
    setLoading(true);
    axios
      .get(clientsApi + id)
      .then((res) => {
        setClientData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorHandler(error.response.data.error);
      });
  };

  const getClientsOrders = () => {
    setLoading(true);
    axios
      .get(ordersApi, {
        params: {
          clientID: id,
        },
      })
      .then((res) => {
        setClientsOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error.response.data.error);
      });
  };

  const deleteClient = () => {
    setLoading(true);
    axios
      .delete(clientsApi + id)
      .then((res) => {
        setLoading(false);
        navigate("/clients");
      })
      .catch((error) => {
        console.log(error);
        setErrorHandler(error.response.data.error);
      });
  };

  useEffect(() => {
    getClientData();
    getClientsOrders();
  }, []);

  return (
    <div className="client">
      <Loader loading={loading} />
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="client_container">
        <div className="clinet_header">
          <h2>ID: {clientData._id}</h2>
          <div className="client_button">
            <Link to={`/EditClient/${clientData._id}`}>Edit</Link>
            <button onClick={() => deleteClient()}>Delete</button>
          </div>
        </div>
        <div className="client_body">
          <div className="client_info_container">
            <div className="clinet_info">
              <p>
                <span>Name: </span>
                {clientData.name}
              </p>
              <p>
                <span>Client Type: </span>
                {clientData.clientType}
              </p>
              <p>
                <span>Address: </span>
                {clientData.address}
              </p>
              <p>
                <span>City: </span>
                {clientData.city}
              </p>
              <p>
                <span>Mobile: </span>
                {clientData.mobile}
              </p>
              <p>
                <span>Created at: </span>
                {clientData.dateCreated &&
                  new Date(clientData.dateCreated).toLocaleString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </p>
              {clientData.dateModified && (
                <p>
                  <span>Updated at: </span>
                  {clientData.dateModified &&
                    new Date(clientData.dateModified).toLocaleString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
              )}
            </div>
          </div>
          <div className="client_table">
            <Table
              addButtonName="Add Order"
              header={`${clientData.name} Orders`}
              data={clientsOrders}
              columns={clientColumns}
              route="/orders/"
              getData={getClientsOrders}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
