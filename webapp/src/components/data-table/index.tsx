"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAGINATION_DEFAULT } from "@/constants/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CustomButton } from "../custom-button";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnVisibilityObj?: VisibilityState;
  // subRows?: string;
  legendItems?: ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnVisibilityObj,
  // subRows,
  legendItems,
}: DataTableProps<TData, TValue>) {
  // Table related states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    columnVisibilityObj || {},
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getExpandedRowModel: getExpandedRowModel(),
    // getSubRows: (row) => row[subRows as keyof TData] as TData[],
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "auto", // built-in filter function
    onGlobalFilterChange: setGlobalFilter,
    filterFromLeafRows: true,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: PAGINATION_DEFAULT, //custom default page size
      },
    },
  });

  // Other states
  const searchElRef = useRef<HTMLInputElement>(null);
  const [isSearchRefEmpty, setIsSearchRefEmpty] = useState<boolean>(true);

  return (
    <div className="w-full rounded-md">
      <div className="flex items-center gap-4 pb-4">
        <div className="relative">
          <Input
            placeholder="Search in all columns..."
            onChange={(e) => {
              table.setGlobalFilter(String(e.target.value));

              if (e.target.value) {
                setIsSearchRefEmpty(false);
                return;
              }

              setIsSearchRefEmpty(true);
            }}
            ref={searchElRef}
            className="max-w-sm"
          />
          {!isSearchRefEmpty && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => {
                const el = searchElRef.current as HTMLInputElement;
                el.value = "";
                el.focus();

                table.setGlobalFilter("");
                setIsSearchRefEmpty(true);
              }}
            >
              <IoIosCloseCircleOutline size={20} />
            </button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CustomButton
              buttonLabel={`Columns`}
              variant={"outline"}
              className="ml-auto"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {legendItems}

      <div className="flex flex-col overflow-hidden rounded-md border">
        <div className="border-b">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="bg-primary text-primary-foreground"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
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
        <div className="p-2">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
