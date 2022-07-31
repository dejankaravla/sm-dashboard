import React, { useState, useRef } from "react";
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
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { Link } from "react-router-dom";

const Table = ({ data, getData, header = "All Products", columns, addButtonName, sort, route = "" }) => {
  const navigate = useNavigate();

  const [sorting, setSorting] = useState(sort || []);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const ref = useRef();

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

  return (
    <div className="p-2">
      {addButtonName && (
        <div className="table_button_container">
          <h1>{header}</h1>
          <div className="table_buttons">
            <Link to={`/${addButtonName.replace(" ", "")}`}>{addButtonName}</Link>
            <ReactToPrint documentTitle={header} bodyClass="printDocument" content={() => ref.current}>
              <PrintContextConsumer>
                {({ handlePrint }) => <button onClick={handlePrint}>Print</button>}
              </PrintContextConsumer>
            </ReactToPrint>
            <button onClick={() => getData()}>Refresh</button>
          </div>
        </div>
      )}
      <div className="filter_global">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />
      </div>
      <table ref={ref}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
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
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              onClick={() => {
                navigate(`${route}${row.original._id}`);
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
};

export default Table;
