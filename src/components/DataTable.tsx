"use client";
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table";

type Elevation = {
  url: string;
  updatedAt: string;
  result: string;
  overallScore: number;
};

type Props = {
  data: Elevation[];
};

const DataTable = ({ data }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Define the columns for the table
  const columns = useMemo<ColumnDef<Elevation>[]>(
    () => [
      {
        accessorKey: "url",
        header: "URL",
      },
      {
        accessorKey: "updatedAt",
        header: "Last Updated",
      },
      {
        accessorKey: "result",
        header: "Result",
        cell: ({ getValue }) => `${getValue<string>().substring(0, 50)}...`, // Truncate long text
      },
      {
        accessorKey: "overallScore",
        header: "Score",
      },
    ],
    []
  );

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className=" w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-gray-100 rounded-md">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="  px-4 py-2 text-left cursor-pointer"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {header.column.getIsSorted() === "asc" && " 🔼"}
                {header.column.getIsSorted() === "desc" && " 🔽"}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className=" px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
