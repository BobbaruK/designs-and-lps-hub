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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { designsMeta } from "@/constants/page-titles/designs";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { flagsMeta } from "@/constants/page-titles/flags";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { topicsMeta } from "@/constants/page-titles/topics";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { usersMeta } from "@/constants/page-titles/users";
import { PAGINATION_ARR } from "@/constants/table";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { useCustomCopy } from "@/hooks/use-custom-copy";
import { useSearchParams } from "@/hooks/use-search-params";
import { TableRowSelect } from "@/types/table-row-select";
import { UserRole } from "@prisma/client";
import { useState } from "react";
import { ToastBody } from "../copy-to-clipboard/toast-body";
import { CustomButton } from "../custom-button";
import { DeleteDialog } from "../delete-dialog";
import { IconAstro } from "../icons/astro";
import { IconPickaxe } from "../icons/pickaxe";
import { IconTraffic } from "../icons/traffic";
import { IconWhatsapp } from "../icons/whatsapp";
import { Skeleton } from "../ui/skeleton";
import { useTableContext } from "./table-provider";

export function DataTablePagination() {
  const {
    dataCount,
    dataSelected: dataSelectedContext,
    handleDelete,
    handleUpdate,
    isLoading,
    startTransition,
  } = useTableContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [{ pageSize, pageIndex }, setSearchParams] =
    useSearchParams(startTransition);
  const { handleCopy } = useCustomCopy();
  const userRole = useCurrentRole();

  const dataSelected = dataSelectedContext as TableRowSelect | undefined;
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

      case "registration-type":
        return registrationTypesMeta;

      case "languages":
        return languagesMeta;

      case "licenses":
        return licensesMeta;

      case "topics":
        return topicsMeta;

      case "landing-page-type":
        return landingPageTypeMeta;

      case "users":
        return usersMeta;

      case "user-avatars":
        return userAvatarMeta;

      case "flags":
        return flagsMeta;

      case "brand-logos":
        return brandLogosMeta;

      case "brand-resources":
        return brandResourcesMeta;

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
            onDelete={handleDelete || (() => {})}
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
        {dataSelected?.data && dataSelected?.data.length > 0 && !isLoading && (
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
                <>
                  <DropdownMenuItem
                    onClick={handleCopy({
                      text:
                        dataSelected.data
                          ?.map((lp) => `${lp.url}`)
                          .join("\n") || "",
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
                </>
              )}

              {userRole !== UserRole.USER && <DropdownMenuSeparator />}

              {dataSelected?.type === "landing-page" &&
                userRole !== UserRole.USER && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Edit row(s)</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <IconAstro />
                            <span>Is ARTS?</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (handleUpdate)
                                    handleUpdate({ isARTS: true });
                                }}
                              >
                                Yes
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (handleUpdate)
                                    handleUpdate({ isARTS: false });
                                }}
                              >
                                No
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <IconWhatsapp />
                            <span>Whatsapp</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (handleUpdate)
                                    handleUpdate({ whatsapp: true });
                                }}
                              >
                                Yes
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (handleUpdate)
                                    handleUpdate({ whatsapp: false });
                                }}
                              >
                                No
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <IconTraffic />
                            <span>Is ready for traffic?</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (handleUpdate)
                                    handleUpdate({
                                      isReadyForTraffic: true,
                                    });
                                }}
                              >
                                Yes
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (handleUpdate)
                                    handleUpdate({
                                      isReadyForTraffic: false,
                                    });
                                }}
                              >
                                No
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <IconPickaxe />
                            <span>Is under maintenance?</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (handleUpdate)
                                    handleUpdate({
                                      isUnderMaintenance: true,
                                    });
                                }}
                              >
                                Yes
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (handleUpdate)
                                    handleUpdate({
                                      isUnderMaintenance: false,
                                    });
                                }}
                              >
                                No
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                )}
              {userRole !== UserRole.USER && (
                <>
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
