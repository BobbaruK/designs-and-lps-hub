"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/data-table-server-rendered/filtering";
import { useSearchParams } from "@/hooks/use-search-params";
import { DB_Topic } from "@/types/db/topics";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteManyTopics } from "../../actions/delete-topic";
import { columns } from "./columns";
import TableProvider from "@/components/data-table-server-rendered/table-provider";

interface Props {
  data: DB_Topic[];
  dataCount: number | null;
  columnVisibilityObj?: VisibilityState;
  showResetAll: boolean;
  dataSelected?: DB_Topic[];
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
    deleteManyTopics(selected || []).then((data) => {
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
        type: "topics",
        data: dataSelected || null,
      }}
      dataCount={dataCount || 0}
    >
      <DataTable
        columns={columns({ isLoading, startTransition, visibleTopics: data })}
        data={data}
        columnVisibilityObj={columnVisibilityObj}
        advancedFiltering={<LandingPageFiltering showResetAll={showResetAll} />}
        twSkeletonHeightCell="h-[51px]"
      />
    </TableProvider>
  );
};
