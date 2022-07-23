import React, { useEffect, useState } from "react";
import "./Table.css";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getFacetedRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useNavigate } from "react-router-dom";
import DebouncedInput from "./DebouncedInput";
import Filter from "./Filter";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

function Table({ products, getProducts, header = "All Products", setProductForm }) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  console.log(header);

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const columns = [
    {
      accessorKey: "name",
      id: "Product Name",
      header: () => <span>Product Name</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
      filterFn: fuzzyFilter,
    },
    {
      accessorFn: (row) => row.productClass,
      id: "Class",
      header: () => <span>Class</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.productSubclass,
      id: "Subclass",
      header: () => <span>Subclass</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.price + " €",
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
      accessorFn: (row) => row.purchasePrice + " €",
      id: "Purchase Price",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Purchase Price</span>,
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.price - row.purchasePrice + " €",
      id: "Balance",
      cell: (info) => <i>{info.getValue()}</i>,
      header: "Balance",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "published",
      id: "Published",
      header: () => <span>Published</span>,
      footer: (info) => info.column.id,
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(products);
  }, [products]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="p-2">
      <div className="table_button_container">
        <h1>{header}</h1>
        <div className="table_buttons">
          <button onClick={() => setProductForm(true)}>Add Product</button>
          <button onClick={() => getProducts()}>Print</button>
          <button onClick={() => getProducts()}>Refresh</button>
        </div>
      </div>
      <div className="filter_global">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <>
                  <th className="table_header_container" key={header.id}>
                    <span className="table_header" onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <MdKeyboardArrowUp />,
                        desc: <MdKeyboardArrowDown />,
                      }[header.column.getIsSorted()] ?? ""}
                    </span>
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </th>
                </>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              onClick={() => {
                navigate(`${row.original._id}`);
              }}
              className="table_info_row"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
}

export default Table;
