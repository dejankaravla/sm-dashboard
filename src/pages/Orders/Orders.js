import React, { useState, useEffect } from 'react'
import './Orders.css'
import Loader from '../../components/Loader/Loader'
import Table from '../../components/Table/Table'
import axios from 'axios'
import OrderForm from '../../components/OrderForm/OrderForm'


const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)


  const getOrders = (query) => {
    setLoading(true)
    axios.get(`http://localhost:8000/orders/`, {
      params: {
        ...query
      }
    }).then((res) => {
      setOrders(res.data)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      console.log(error);
    })
  }

  useEffect(() => {
    getOrders()
  }, [])

  const columns = [
    {
      accessorKey: "client",
      id: "Client",
      header: (info) => info.column.id,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.createdBy,
      id: "Created By",
      header: (info) => info.column.id,
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "address",
      id: "Address",
      header: (info) => info.column.id,
      footer: (info) => info.column.id

    },
    {
      accessorFn: (row) => row.city,
      id: "City",
      header: (info) => info.column.id,
      footer: (info) => info.column.id,
    },

    {
      accessorFn: (row) => row.mobile,
      id: "Mobile",
      header: (info) => info.column.id,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.orderPrice,
      id: "Order Price",
      header: (info) => info.column.id,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.paid,
      id: "Paid",
      header: (info) => info.column.id,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.orderStatus,
      id: "Status",
      header: (info) => info.column.id,
      footer: (info) => info.column.id,
    },
  ];

  return (
    <div className='orders'>
      <Loader loading={loading} />
      <div className='orders_container'>
        {!loading && (
          <Table addButtonName='Add Order' header='Orders' getData={getOrders} data={orders} columns={columns} />
        )}
      </div>
    </div>
  )
}

export default Orders