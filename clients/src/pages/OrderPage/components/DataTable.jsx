import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button as Chakrabutton, Flex, Select, Text } from "@chakra-ui/react";
import Spinner from "@/components/Spinner";

export function DataTable({ columns, data, loading }) {
  // console.log(data)
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  let currentPage = table.options.state.pagination.pageIndex + 1;
  if (!data) {
    return <Spinner />
  } else if (!data?.length) {
    return (
      <div>
        <h1 className="text-2xl md:text-4xl font-medium">You have no order</h1>
      </div>
    );
  }
  // if (loading) return <Spinner />

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter names..."
          value={table.getColumn("title")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-4 md:mr-0"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#e6e5e3]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-md" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // className="cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </Button>
            <Button
              size="sm"
              onClick={(e) =>
                table.setPageIndex(Number(e.target.innerText) - 1)
              }
              // disabled={!table.getCanPreviousPage()}
              className={currentPage === 1 ? "bg-blue-600" : "bg-slate-950"}
            >
              {currentPage < 4 ? 1 : currentPage - 1}
            </Button>
            <Button
              size="sm"
              onClick={(e) =>
                table.setPageIndex(Number(e.target.innerText) - 1)
              }
              disabled={currentPage === 1 && !table.getCanNextPage()}
              className={
                currentPage === 2 || currentPage > 3
                  ? "bg-blue-600"
                  : "bg-slate-950"
              }
            >
              {currentPage < 4 ? 2 : currentPage}
            </Button>
            <Button
              size="sm"
              onClick={(e) =>
                table.setPageIndex(Number(e.target.innerText) - 1)
              }
              disabled={currentPage !== 3 && !table.getCanNextPage()}
              className={currentPage === 3 ? "bg-blue-600" : "bg-slate-950"}
            >
              {currentPage < 4 ? 3 : currentPage + 1}
            </Button>
            <Button
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <Button
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </div>

          {/* <Text mt={3} textAlign={'center'}> You are on page {currentPage}/{table.getPageCount()}</Text> */}
          <Flex justifyContent={"center"} alignItems={"center"} gap={3} mt={4}>
            <Text>Tasks per page:</Text>{" "}
            <Select
              value={table.options.state.pagination.pageSize}
              onChange={(e) => table.setPageSize(e.target.value)}
              w={70}
              cursor={"pointer"}
            >
              {[10, 25, 50].map((pageSizeEl) => {
                return (
                  <option key={pageSizeEl} value={pageSizeEl}>
                    {pageSizeEl}
                  </option>
                );
              })}
            </Select>
          </Flex>
          {/* <hr />
					<ul>
						<li>
							You are on page number:{" "}
							{table.options.state.pagination.pageIndex + 1}
						</li>
						<li>Total pages: {table.getPageCount()}</li>
					</ul>
					<hr />
					<input
						type="number"
						defaultValue={table.options.state.pagination.pageIndex + 1}
						onChange={(e) => table.setPageIndex(e.target.value - 1)}
					/>
					<hr />
					<h4>Current page size: {table.options.state.pagination.pageSize}</h4> */}
        </div>
      </div>
    </div>
  );
}

export default DataTable;
