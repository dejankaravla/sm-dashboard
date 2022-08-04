export const productsColumns = [
  {
    accessorKey: "name",
    id: "Product Name",
    header: () => <span>Product Name</span>,
    footer: (info) => info.column.id,
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.category,
    id: "Category",
    header: () => <span>Category</span>,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.subcategory,
    id: "Subcategory",
    header: () => <span>Subcategory</span>,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.price,
    id: "Price",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Price</span>,
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "quantity",
    id: "Quantity",
    header: () => <span>Quantity</span>,
    footer: (info) => {
      return info.column.id;
    },
  },
  {
    accessorFn: (row) => row.purchasePrice,
    id: "Purchase Price",
    cell: (info) => <i>{info.getValue()}</i>,
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.price - row.purchasePrice,
    id: "Balance",
    cell: (info) => <i>{info.getValue()}</i>,
    header: "Balance",
    footer: (info) => info.column.id,
  },
  {

    accessorFn: (row) => (row.published ? "Yes" : "No"),
    id: "Published",
    header: () => <span>Published</span>,
    footer: (info) => info.column.id,
  },
];

export const clientsColumns = [
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

export const clientColumns = [
  {
    accessorKey: "orderNumber",
    id: "Order Number",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },

  {
    accessorFn: (row) =>
      new Date(row.dateCreated).toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    id: "Created At",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.orderStatus,
    id: "Status",
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
    accessorFn: (row) => (row.paid ? "Yes" : "No"),
    id: "Paid",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
];

export const ordersColumns = [
  {
    accessorKey: "orderNumber",
    id: "Order Number",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "client",
    id: "Client",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.createdBy?.name,
    id: "Created By",
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
    accessorFn: (row) => (row.paid ? "Yes" : "No"),
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

export const orderColumns = [
  {
    accessorKey: "orderNumber",
    id: "Order Number",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },

  {
    accessorFn: (row) =>
      new Date(row.dateCreated).toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    id: "Created At",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.orderStatus,
    id: "Status",
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
    accessorFn: (row) => (row.paid ? "Yes" : "No"),
    id: "Paid",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
];

export const orderProductColumns = [
  {
    accessorKey: "name",
    id: "Product Name",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },

  {
    accessorFn: (row) => row.quantity,
    id: "Quantity",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.price,
    id: "Price",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },

  {
    accessorFn: (row) => row.purchasePrice,
    id: "Purchase Price",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.totalPrice,
    id: "Total Price",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.balance,
    id: "Balance",
    header: (info) => info.column.id,
    footer: (info) => info.column.id,
  },
];
