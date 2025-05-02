"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/table/landing-pages/filtering";
import { brandResourceTypes } from "@/constants/brand-resource-types";
import { dl_brand_resource_type } from "@prisma/client";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { columns, DB_BrandResource } from "./client-columns";

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
    <>
      <DataTable
        columns={columns(isLoading, startTransition)}
        data={data}
        columnVisibilityObj={columnVisibilityObj}
        advancedFiltering={
          <LandingPageFiltering
            showResetAll={showResetAll}
            isLoading={isLoading}
            startTransition={startTransition}
            types={brandResourceTypes() as unknown as dl_brand_resource_type[]}
            hasOperator
          />
        }
        dataCount={dataCount}
        twSkeletonHeightCell="h-[69px]"
        isLoading={isLoading}
        startTransition={startTransition}
      />
    </>
  );
};
