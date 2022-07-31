import React, { useState, useEffect } from "react";
import "./Clients.css";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import ClientsForm from "../../components/ClientsForm/ClientsForm";
import { clientsColumns } from "../../components/Table/Columns";
import { clientsApi } from "../../api/definitions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [clientsForm, setClientsForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  const setErrorHandler = (errorMessage) => {
    setError([errorMessage]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const getClients = (query) => {
    setLoading(true);
    axios
      .get(clientsApi, {
        params: {
          ...query,
        },
      })
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorHandler(error.response.data.error);
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="clients">
      <Loader loading={loading} />
      {error.length > 0 && <ErrorMessage setError={setError} errorMessage={error} />}
      <div className="clients_container">
        {!loading && (
          <Table
            addButtonName="Add Client"
            setAddNew={setClientsForm}
            getData={getClients}
            header="Clients"
            data={clients}
            columns={clientsColumns}
          />
        )}
        {clientsForm && (
          <ClientsForm setClientsForm={setClientsForm} getData={getClients} setLoading={setLoading} formType="add" />
        )}
      </div>
    </div>
  );
};

export default Clients;
