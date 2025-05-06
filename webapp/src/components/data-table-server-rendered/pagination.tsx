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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PAGINATION_ARR } from "@/constants/table";
import { useCustomCopy } from "@/hooks/use-custom-copy";
import { useSearchParams } from "@/hooks/use-search-params";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { TransitionStartFunction } from "react";
import { ToastBody } from "../copy-to-clipboard/toast-body";
import { CustomButton } from "../custom-button";
import { Skeleton } from "../ui/skeleton";

interface DataTablePaginationProps {
  startTransition: TransitionStartFunction;
  isLoading: boolean;
  dataCount: number | null;
  dataSelected?: {
    type: "landing-page";
    data: DB_LandingPage[] | null;
  };
}

export function DataTablePagination({
  isLoading,
  startTransition,
  dataCount,
  dataSelected,
}: DataTablePaginationProps) {
  const [{ pageSize, pageIndex, selected }, setSearchParams] =
    useSearchParams(startTransition);
  const { handleCopy } = useCustomCopy();

  const totalPages = dataCount ? Math.ceil(dataCount / pageSize) : 0;
  const selectedRows = selected?.length;

  console.log({ dataSelected });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-5 w-40" />
          ) : (
            <>
              {selectedRows
                ? `${selectedRows} of ${dataCount} row(s) selected`
                : `${dataCount} row(s)`}
            </>
          )}
        </div>
        {selectedRows && (
          <DropdownMenu>
            <DropdownMenuTrigger disabled={isLoading} asChild>
              <CustomButton
                buttonLabel="Actions"
                size={"sm"}
                variant={"outline"}
                className="h-8"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dataSelected?.type === "landing-page" && (
                <DropdownMenuItem
                  onClick={handleCopy({
                    text:
                      dataSelected.data?.map((lp) => `${lp.url}`).join("\n") ||
                      "",
                    toastError: <ToastBody type={"error"} />,
                    toastSuccess: (
                      <ToastBody
                        type={"success"}
                        copiedData={
                          dataSelected.data
                            ?.map((lp) => `${lp.url}`)
                            .join("\n") || ""
                        }
                      />
                    ),
                  })}
                >
                  Copy url(s)
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>Delete row(s)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
          <CustomButton
            buttonLabel="Go to first page"
            variant="outline"
            icon={MdKeyboardDoubleArrowLeft}
            iconPlacement="left"
            size={"icon"}
            className="hidden size-8 h-8 w-8 min-w-fit p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: 0 });
            }}
            disabled={isLoading || pageIndex === 0}
          />
          <CustomButton
            buttonLabel="Go to previous page"
            variant="outline"
            icon={FaChevronCircleLeft}
            iconPlacement="left"
            size={"icon"}
            className="hidden size-8 h-8 w-8 min-w-fit p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: pageIndex - 1 });
            }}
            disabled={isLoading || pageIndex === 0}
          />
          <CustomButton
            buttonLabel="Go to next page"
            variant="outline"
            icon={FaChevronCircleRight}
            iconPlacement="left"
            size={"icon"}
            className="hidden size-8 h-8 w-8 min-w-fit p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: pageIndex + 1 });
            }}
            disabled={isLoading || pageIndex >= totalPages - 1}
          />
          <CustomButton
            buttonLabel="Go to last page"
            variant="outline"
            icon={MdKeyboardDoubleArrowRight}
            iconPlacement="left"
            size={"icon"}
            className="hidden size-8 h-8 w-8 min-w-fit p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: totalPages - 1 });
            }}
            disabled={isLoading || pageIndex >= totalPages - 1}
          />
        </div>
      </div>
    </div>
  );
}
