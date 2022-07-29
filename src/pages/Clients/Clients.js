import React, { useState, useEffect } from "react";
import "./Clients.css";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import ClientsForm from "../../components/ClientsForm/ClientsForm";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [clientsForm, setClientsForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const getClients = (query) => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/clients/`, {
        params: {
          ...query,
        },
      })
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      }).catch((error) => {
        setLoading(false)
        console.log(error);
      })
  };

  useEffect(() => {
    getClients();
  }, []);

  const columns = [
    {
      accessorKey: "name",
      id: " Name",
      header: () => <span>Name</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.clientType,
      id: "Type",
      header: () => <span>Type</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "address",
      id: "Address",
      header: () => <span>Address</span>,
      footer: (info) => {
        return info.column.id;
      },
    },
    {
      accessorFn: (row) => row.city,
      id: "City",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>City</span>,
      footer: (info) => info.column.id,
    },

    {
      accessorFn: (row) => row.mobile,
      id: "Mobile",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Mobile</span>,
      footer: (info) => info.column.id,
    },
  ];

  return (
    <div className="clients">
      <Loader loading={loading} />
      <div className="clients_container">
        {!loading && (
          <Table
            addButtonName="Add Client"
            setAddNew={setClientsForm}
            getData={getClients}
            header="Clients"
            data={clients}
            columns={columns}
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
