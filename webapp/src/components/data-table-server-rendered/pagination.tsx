import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import { PAGINATION_ARR } from "@/constants/table";
import { useSearchParams } from "@/hooks/use-search-params";
import { TransitionStartFunction } from "react";
import { Button } from "../ui/button";

interface DataTablePaginationProps {
  startTransition: TransitionStartFunction;
  isLoading: boolean;
  dataCount: number | null;
}

export function DataTablePagination({
  isLoading,
  startTransition,
  dataCount,
}: DataTablePaginationProps) {
  const [{ pageSize, pageIndex }, setSearchParams] =
    useSearchParams(startTransition);

  const totalPages = dataCount ? Math.ceil(dataCount / pageSize) : 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        {dataCount} row(s)
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setSearchParams({
                pageSize: parseInt(value),
                pageIndex: 0,
              });
            }}
            disabled={isLoading}
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
          Page {pageIndex + 1} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: 0 });
            }}
            disabled={isLoading || pageIndex === 0}
          >
            <span className="sr-only">Go to first page</span>
            <MdKeyboardDoubleArrowLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setSearchParams({ pageIndex: pageIndex - 1 });
            }}
            disabled={isLoading || pageIndex === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <FaChevronCircleLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setSearchParams({ pageIndex: pageIndex + 1 });
            }}
            disabled={isLoading || pageIndex >= totalPages - 1}
          >
            <span className="sr-only">Go to next page</span>
            <FaChevronCircleRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: totalPages - 1 });
            }}
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
