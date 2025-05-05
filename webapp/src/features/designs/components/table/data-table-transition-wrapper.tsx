"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { columns } from "./columns";
import { LandingPageFiltering } from "@/components/data-table-server-rendered/filtering";
import { DB_Design } from "@/types/db/design";

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
        twSkeletonHeightCell="h-[129px]"
        isLoading={isLoading}
        startTransition={startTransition}
      />
    </>
  );
};
