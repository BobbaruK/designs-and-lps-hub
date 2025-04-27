"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { type DB_Design, columns } from "./columns";
import { LandingPageFiltering } from "@/components/table/landing-pages/filtering";

interface Props {
  data: DB_Design[];
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
        twSkeletonHeightCell="h-[127px]"
        isLoading={isLoading}
        startTransition={startTransition}
      />
    </>
  );
};
