"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/data-table-server-rendered/filtering";
import { useSearchParams } from "@/hooks/use-search-params";
import { DB_Brand } from "@/types/db/brands";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteManyBrands } from "../../actions/delete-brand";
import { columns } from "./columns";

interface Props {
  data: DB_Brand[];
  dataCount: number | null;
  columnVisibilityObj?: VisibilityState;
  showResetAll: boolean;
  dataSelected?: DB_Brand[];
}

export const DataTableTransitionWrapper = ({
  data,
  dataCount,
  columnVisibilityObj,
  showResetAll,
  dataSelected,
}: Props) => {
  const [isLoading, startTransition] = useTransition();
  const [{ selected }, setSearchParams] = useSearchParams(startTransition);

  const handleDelete = () => {
    deleteManyBrands(selected || []).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
        setSearchParams({
          selected: null,
        });
      }
    });
  };

  return (
    <>
      <DataTable
        columns={columns({
          isLoading,
          startTransition,
          visibleBrands: data,
        })}
        data={data}
        dataSelected={{
          type: "brands",
          data: dataSelected || null,
        }}
        columnVisibilityObj={columnVisibilityObj}
        advancedFiltering={
          <LandingPageFiltering
            showResetAll={showResetAll}
            isLoading={isLoading}
            startTransition={startTransition}
          />
        }
        dataCount={dataCount}
        twSkeletonHeightCell="h-[79px]"
        isLoading={isLoading}
        startTransition={startTransition}
        handleDelete={handleDelete}
      />
    </>
  );
};
