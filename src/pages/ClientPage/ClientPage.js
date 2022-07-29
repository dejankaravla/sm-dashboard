import React, { useState, useEffect } from "react";
import "./ClientPage.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";

const ClientPage = () => {
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  const navigate = useNavigate();

  const getClientData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/clients/${id}`)
      .then((res) => {
        setClientData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteClient = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/clients/${id}`)
      .then((res) => {
        setLoading(false);
        navigate("/clients");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getClientData();
  }, []);

  const columns = [
    {
      accessorKey: "orderNumber",
      id: "Order",
      header: () => <span>Order</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.productSubclass,
      id: "Price",
      header: () => <span>Price</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.price + " €",
      id: "Purchase Price",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Purchase Price</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "quantity",
      id: "Balance",
      header: () => <span>Balance</span>,
      footer: (info) => {
        return info.column.id;
      },
    },
    {
      accessorFn: (row) => row.purchasePrice + " €",
      id: "Date",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Date</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.price - row.purchasePrice + " €",
      id: "Status",
      cell: (info) => <i>{info.getValue()}</i>,
      header: "Status",
      footer: (info) => info.column.id,
    },
  ];

  return (
    <div className="client">
      <Loader loading={loading} />
      <div className="client_container">
        <div className="clinet_header">
          <h2>ID: {clientData._id}</h2>
          <div className="client_button">
            <Link to={`/EditClient/${clientData._id}`} >Edit</Link>
            <button onClick={() => deleteClient()}>Delete</button>
          </div>
        </div>
        <div className="client_body">
          <div className="client_left">
            <Table addButtonName="Add Order" header="Orders" data={[]} columns={columns} />
          </div>
          <div className="client_right">
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
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
