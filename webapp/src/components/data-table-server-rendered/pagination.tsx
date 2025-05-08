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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { brandsMeta } from "@/constants/page-titles/brands";
import { designsMeta } from "@/constants/page-titles/designs";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { PAGINATION_ARR } from "@/constants/table";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { useCustomCopy } from "@/hooks/use-custom-copy";
import { useSearchParams } from "@/hooks/use-search-params";
import { TableRowSelect } from "@/types/table-row-select";
import { UserRole } from "@prisma/client";
import { TransitionStartFunction, useState } from "react";
import { ToastBody } from "../copy-to-clipboard/toast-body";
import { CustomButton } from "../custom-button";
import { DeleteDialog } from "../delete-dialog";
import { Skeleton } from "../ui/skeleton";

interface DataTablePaginationProps {
  startTransition: TransitionStartFunction;
  isLoading: boolean;
  dataCount: number | null;
  dataSelected?: TableRowSelect;
  handleDelete: () => void;
}

export function DataTablePagination({
  isLoading,
  startTransition,
  dataCount,
  dataSelected,
  handleDelete,
}: DataTablePaginationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [{ pageSize, pageIndex }, setSearchParams] =
    useSearchParams(startTransition);
  const { handleCopy } = useCustomCopy();
  const userRole = useCurrentRole();

  const totalPages = dataCount ? Math.ceil(dataCount / pageSize) : 0;
  const selectedRows = dataSelected?.data?.length;

  const asset = () => {
    switch (dataSelected?.type) {
      case "landing-page":
        return landingPagesMeta;

      case "design":
        return designsMeta;

      case "features":
        return featuresTypeMeta;

      case "brands":
        return brandsMeta;

      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <DeleteDialog
            label={`(${selectedRows})`}
            asset={asset()?.label.plural.toLowerCase() || "asset"}
            onDelete={handleDelete}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            showTrigger={false}
          />

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
        {dataSelected?.data && dataSelected?.data.length > 0 && (
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger disabled={isLoading} asChild>
              <CustomButton
                buttonLabel="Actions"
                size={"sm"}
                variant={"outline"}
                className="h-8"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={handleCopy({
                  text:
                    dataSelected.data
                      ?.map((resource) => `${resource.id}`)
                      .join("\n") || "",
                  toastError: <ToastBody type={"error"} />,
                  toastSuccess: (
                    <ToastBody
                      type={"success"}
                      copiedData={
                        dataSelected.data
                          ?.map((resource) => resource.id)
                          .join("\n") || ""
                      }
                    />
                  ),
                })}
              >
                Copy id(s)
              </DropdownMenuItem>

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
                          dataSelected.data?.map((lp) => lp.url).join("\n") ||
                          ""
                        }
                      />
                    ),
                  })}
                >
                  Copy url(s)
                </DropdownMenuItem>
              )}
              {userRole !== UserRole.USER && (
                <>
                  <DropdownMenuSeparator />

                  {/* <DropdownMenuItem onClick={(evt) => {}}>
                    Edit row(s)
                  </DropdownMenuItem> */}

                  <DropdownMenuItem
                    onClick={(evt) => {
                      evt.preventDefault();

                      setIsDialogOpen(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Delete row(s)
                  </DropdownMenuItem>
                </>
              )}
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
