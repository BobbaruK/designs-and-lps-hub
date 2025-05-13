"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAGINATION_DEFAULT } from "@/constants/table";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TableRowSelect } from "@/types/table-row-select";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ReactNode, TransitionStartFunction, useState } from "react";
import { CustomButton } from "../custom-button";
import { Skeleton } from "../ui/skeleton";
import { DataTablePagination } from "./pagination";
import { SearchField } from "./search-field";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnVisibilityObj?: VisibilityState;
  legendItems?: ReactNode;
  showSearch?: boolean;
  showColumnSelector?: boolean;
  showPagination?: boolean;
  legendFooter?: "and" | "or";
  advancedFiltering?: ReactNode;
  startTransition: TransitionStartFunction;
  isLoading: boolean;
  dataCount: number | null;
  twSkeletonHeightCell?: string;
  showSearchSwitch?: boolean;
  dataSelected?: TableRowSelect;
  handleDelete?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnVisibilityObj,
  // subRows,
  legendItems,
  showSearch = true,
  showColumnSelector = true,
  showPagination = true,
  legendFooter = undefined,
  advancedFiltering,
  startTransition,
  isLoading,
  dataCount,
  twSkeletonHeightCell,
  showSearchSwitch = false,
  dataSelected,
  handleDelete,
}: DataTableProps<TData, TValue>) {
  const [{ pageSize }] = useSearchParams(startTransition);

  // Table related states
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    columnVisibilityObj || {},
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <div className="w-full rounded-md">
      {(showSearch || showColumnSelector) && (
        <div className="flex items-center gap-4 pb-4">
          {showSearch !== false && (
            <SearchField
              isLoading={isLoading}
              startTransition={startTransition}
              showSearchSwitch={showSearchSwitch}
            />
          )}

          {showColumnSelector !== false && (
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
          )}
        </div>
      )}

      {advancedFiltering}

      {(legendFooter === "and" || legendFooter === undefined) && legendItems}

      <div className="flex flex-col overflow-hidden rounded-md border">
        <div className={cn({ "border-b": showPagination !== false })}>
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
              {isLoading ? (
                <>
                  {Array.from({
                    length:
                      pageSize <= PAGINATION_DEFAULT
                        ? dataCount && dataCount <= pageSize
                          ? dataCount
                          : pageSize
                        : PAGINATION_DEFAULT,
                  }).map((_, index) => (
                    <TableRow key={index}>
                      {table.getRowModel().rows[0]
                        ? table
                            .getRowModel()
                            .rows[0].getVisibleCells()
                            .map((cell) => {
                              return (
                                <TableCell
                                  key={cell.id}
                                  className={cn(`p-2 ${twSkeletonHeightCell}`)}
                                >
                                  <Skeleton className="h-4 w-full" />
                                </TableCell>
                              );
                            })
                        : // TODO: check this shit out if needed multiple rows in the table heads
                          table.getHeaderGroups()[0].headers.map((header) => {
                            return (
                              <TableCell
                                key={header.id}
                                className={twSkeletonHeightCell}
                              >
                                <Skeleton className="h-4 w-[100px]" />
                              </TableCell>
                            );
                          })}
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
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
                </>
              )}
            </TableBody>
          </Table>
        </div>
        {showPagination !== false && (
          <div className="p-2">
            <DataTablePagination
              startTransition={startTransition}
              isLoading={isLoading}
              dataCount={dataCount}
              dataSelected={dataSelected}
              handleDelete={handleDelete || function () {}}
            />
          </div>
        )}
      </div>
      {legendFooter && legendItems}
    </div>
  );
}
