"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/data-table-server-rendered/filtering";
import TableProvider from "@/components/data-table-server-rendered/table-provider";
import { useSearchParams } from "@/hooks/use-search-params";
import { DB_FeaturesType } from "@/types/db/features";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteManyLandingPageFeature } from "../../actions/delete-landing-page-feature";
import { columns } from "./columns";

interface Props {
  data: DB_FeaturesType[];
  dataCount: number | null;
  columnVisibilityObj?: VisibilityState;
  showResetAll: boolean;
  dataSelected?: DB_FeaturesType[];
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
    deleteManyLandingPageFeature(selected || []).then((data) => {
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
    <TableProvider
      handleDelete={handleDelete}
      isLoading={isLoading}
      startTransition={startTransition}
      dataSelected={{
        type: "features",
        data: dataSelected || null,
      }}
      dataCount={dataCount || 0}
    >
      <DataTable
        columns={columns({
          isLoading,
          startTransition,
          visibleFeatures: data,
        })}
        data={data}
        columnVisibilityObj={columnVisibilityObj}
        advancedFiltering={<LandingPageFiltering showResetAll={showResetAll} />}
        twSkeletonHeightCell="h-[51px]"
      />
    </TableProvider>
  );
};
