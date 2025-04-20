import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import { PAGINATION_ARR } from "@/constants/table";
import { useSearchParams } from "@/hooks/use-search-params";
import { TransitionStartFunction } from "react";
import { Button } from "../ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  startTransition: TransitionStartFunction;
  isLoading: boolean;
  dataCount: number | null;
}

export function DataTablePagination<TData>({
  table,
  isLoading,
  startTransition,
  dataCount,
}: DataTablePaginationProps<TData>) {
  const [{ pageSize, pageIndex }, setSearchParams] =
    useSearchParams(startTransition);

  const totalPages = dataCount ? Math.ceil(dataCount / pageSize) : 0;

  return (
    <div className="flex items-center justify-between">
      <div className="p-4">
        <p>pageSize {pageSize}</p>
        <p>pageIndex {pageIndex}</p>
        <p>dataCount {dataCount}</p>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected. */}
        {/* {table.getFilteredRowModel().rows.length} row(s) */}
        {dataCount} row(s)
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            // value={`${table.getState().pagination.pageSize}`}
            value={`${pageSize}`}
            onValueChange={(value) => {
              // table.setPageSize(parseInt(value));

              console.log(value);

              setSearchParams({
                pageSize: parseInt(value),
                pageIndex: 0,
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {PAGINATION_ARR.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {/* Page {pageIndex + 1} of {table.getPageCount()} <br /> */}
          Page {pageIndex + 1} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              // table.setPageIndex(0);
              setSearchParams({ pageIndex: 0 });
            }}
            // disabled={!table.getCanPreviousPage()}
            disabled={isLoading || pageIndex === 0}
          >
            <span className="sr-only">Go to first page</span>
            <MdKeyboardDoubleArrowLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              // table.previousPage();
              setSearchParams({ pageIndex: pageIndex - 1 });
            }}
            // disabled={!table.getCanPreviousPage()}
            disabled={isLoading || pageIndex === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <FaChevronCircleLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              // table.nextPage();

              setSearchParams({ pageIndex: pageIndex + 1 });
            }}
            // disabled={!table.getCanNextPage()}
            disabled={isLoading || pageIndex >= totalPages - 1}
          >
            <span className="sr-only">Go to next page</span>
            <FaChevronCircleRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              // table.setPageIndex(table.getPageCount() - 1);
              setSearchParams({ pageIndex: totalPages - 1 });
            }}
            // disabled={!table.getCanNextPage()}
            disabled={isLoading || pageIndex >= totalPages - 1}
          >
            <span className="sr-only">Go to last page</span>
            <MdKeyboardDoubleArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
