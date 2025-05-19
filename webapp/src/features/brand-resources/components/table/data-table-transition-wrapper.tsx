"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/data-table-server-rendered/filtering";
import { brandResourceTypes } from "@/constants/brand-resource-types";
import { dl_brand_resource_type } from "@prisma/client";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { columns, DB_BrandResource } from "./client-columns";
import TableProvider from "@/components/data-table-server-rendered/table-provider";

interface Props {
  data: DB_BrandResource[];
  dataCount: number | null;
  columnVisibilityObj?: VisibilityState;
  showResetAll: boolean;
}

export const DataTableTransitionWrapper = ({
  data,
  dataCount,
  columnVisibilityObj,
  showResetAll,
}: Props) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <TableProvider
      isLoading={isLoading}
      startTransition={startTransition}
      dataCount={dataCount || 0}
    >
      <DataTable
        columns={columns(isLoading, startTransition)}
        data={data}
        columnVisibilityObj={columnVisibilityObj}
        advancedFiltering={
          <LandingPageFiltering
            showResetAll={showResetAll}
            types={brandResourceTypes() as unknown as dl_brand_resource_type[]}
            hasOperator
          />
        }
        twSkeletonHeightCell="h-[69px]"
      />
    </TableProvider>
  );
};
