"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/table/landing-pages/filtering";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { type DB_Brand, columns } from "./columns";

interface Props {
  data: DB_Brand[];
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
          />
        }
        dataCount={dataCount}
        twSkeletonHeightCell="h-[79px]"
        isLoading={isLoading}
        startTransition={startTransition}
      />
    </>
  );
};
