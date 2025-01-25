"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { cn, columnId } from "@/lib/utils";
import { Requester } from "@/types/requesters";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const requestersColumns: ColumnDef<Requester>[] = [
  // Name
  {
    ...columnId({ id: "name" }),
    enableHiding: false,
    accessorFn: (originalRow) => originalRow?.name,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Name
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const requester = row.original;
      const requesterName = requester.name;
      const requesterAvatar = requester.image || "";

      return (
        <>
          <Link
            href={`/profile/${row.original.id}`}
            className="flex items-center gap-2"
          >
            <CustomAvatar image={requesterAvatar} />
            <span>{requesterName}</span>
          </Link>
        </>
      );
    },
  },
  // No of lps
  {
    ...columnId({ id: "noOfLPs" }),
    enableHiding: false,
    accessorFn: (originalRow) => originalRow?._count.landingPagesRequested,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Landing Pages
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original._count.landingPagesRequested;
    },
  },
];
