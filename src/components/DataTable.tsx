"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from "@tanstack/react-table";
import Link from "next/link";
import { FirestoreDateValue, formatFirestoreDateWithTime } from "@/helper/firestore-date";

export type Elevation = {
  id: string;
  url: string;
  updatedAt: FirestoreDateValue;
  result: string;
  overallScore: number;
};

type Props = {
  data: Elevation[];
};

const DataTable = ({ data }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10, // Number of rows per page
  });
  const [globalFilter, setGlobalFilter] = useState("");
  // Define the columns for the table
  const columns = useMemo<ColumnDef<Elevation>[]>(
    () => [
      {
        accessorKey: "url",
        header: "URL",
        cell: ({ getValue }) => {
          const url = getValue<string>();
          return (
            <div className="max-w-[300px] truncate" title={url}>
              {url}
            </div>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Last Updated",
        cell: ({ row }) => {
          // Use the helper function to format the date
          return <span>{formatFirestoreDateWithTime(row.original.updatedAt)}</span>;
        },
        // Custom sorting function
        sortingFn: (rowA, rowB) => {
          const getTimestamp = (value: FirestoreDateValue): number => {
            // Handle string dates
            if (typeof value === 'string') {
              return new Date(value).getTime();
            }
            
            // Handle Firestore Timestamp objects from client SDK
            if (value && typeof value === 'object' && '_seconds' in value) {
              return value._seconds * 1000 + (value._nanoseconds || 0) / 1e6;
            }
            
            // Handle Firestore Timestamp objects from admin SDK
            if (value && typeof value === 'object' && 'seconds' in value && 'nanoseconds' in value) {
              return value.seconds * 1000 + (value.nanoseconds || 0) / 1e6;
            }
            
            // Handle JavaScript Date objects
            if (value instanceof Date) {
              return value.getTime();
            }
            
            return 0; // Default for undefined, null, or FieldValue
          };
          
          return getTimestamp(rowA.original.updatedAt) - getTimestamp(rowB.original.updatedAt);
        }
      },
      {
        accessorKey: "overallScore",
        header: "Score",
        cell: ({ getValue }) => {
          const score = getValue<number>();
          let colorClass = "bg-red-500";
          if (score >= 7.5) colorClass = "bg-green-500";
          else if (score >= 5.0) colorClass = "bg-yellow-500";

          return (
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
              <span>{score}</span>
            </div>
          );
        },
      },
      
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Link
              href={`/elevation/detail/${row.original.id}`}
              className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-white text-sm transition-colors"
            >
              View
            </Link>
            <button
              onClick={() => window.open(row.original.url, "_blank")}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm transition-colors"
            >
              Visit
            </button>
          </div>
        ),
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
      pagination,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex justify-end">
        <div className="relative w-64">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full p-2 pl-8 bg-white/5 border border-cyan-800/50 rounded-md text-white outline-none focus:border-cyan-400 transition-colors"
            placeholder="Search table..."
          />
          <div className="absolute left-2 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-cyan-800/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cyan-900/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-4 py-3 text-left text-sm font-medium border-b border-cyan-800/30 cursor-pointer hover:bg-cyan-800/40 transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <span className="text-gray-400">
                          {header.column.getIsSorted() === "asc" && " ↑"}
                          {header.column.getIsSorted() === "desc" && " ↓"}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`${
                    i % 2 === 0 ? "bg-white/5" : "bg-white/10"
                  } hover:bg-cyan-900/40 transition-colors`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 border-b border-cyan-800/20"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {table.getRowModel().rows.length === 0 && (
          <div className="p-4 text-center text-gray-400">No results found</div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-between p-4 bg-cyan-900/40 border-t border-cyan-800/30">
          <div className="flex gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-cyan-800/50 hover:bg-cyan-700 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              First
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-cyan-800/50 hover:bg-cyan-700 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {table.getFilteredRowModel().rows.length} results
            </span>
            <span className="text-sm">
              Page{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-cyan-800/50 hover:bg-cyan-700 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-cyan-800/50 hover:bg-cyan-700 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
