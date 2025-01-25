"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { cn, columnId } from "@/lib/utils";
import { LandingPagesAddedWaitingForTraffic } from "@/types/landing-pages";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { FaTrafficLight, FaWhatsapp } from "react-icons/fa";
import { TbBrandAstro } from "react-icons/tb";

export const lpsWaitingForTrafficColumns: ColumnDef<LandingPagesAddedWaitingForTraffic>[] =
  [
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
        const lp = row.original;
        const lpName = lp.name;
        const desingImage = lp.design?.avatar || "";

        return (
          <>
            <Link
              href={`/landing-pages/${row.original.slug}`}
              className="flex items-center gap-2"
            >
              <CustomAvatar image={desingImage} />
              <span>{lpName}</span>
            </Link>
          </>
        );
      },
    },
    // Created By
    {
      ...columnId({ id: "createdBy" }),
      accessorFn: (originalRow) => originalRow.createdBy?.name,
      sortDescFirst: false,
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className={cn(
              "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
            )}
            onClick={() => column.toggleSorting()}
          >
            Created By
            <SortingArrows sort={column.getIsSorted()} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const createdBy = row.original.createdBy;
        const id = createdBy?.id;
        const name = createdBy?.name;
        const image = createdBy?.image;

        return (
          <UserAvatar linkHref={`/profile/${id}`} name={name} image={image} />
        );
      },
    },
    // Stats
    {
      ...columnId({ id: "stats" }),
      accessorFn: (originalRow) => originalRow.createdBy?.name,
      sortDescFirst: false,
      enableSorting: false,
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className={cn(
              "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
            )}
            onClick={() => column.toggleSorting()}
          >
            Stats
          </Button>
        );
      },
      cell: ({ row }) => {
        const lp = row.original;
        const isReadyForTraffic = lp.isReadyForTrafic;
        const isWhatsapp = lp.whatsapp;
        const isARTS = lp.isARTS;

        return (
          <>
            <div className="pointer-events-none flex items-center gap-1">
              <TbBrandAstro
                size={20}
                className={cn(isARTS ? "text-success" : "text-danger")}
              />
              <FaWhatsapp
                size={20}
                className={cn(isWhatsapp ? "text-success" : "text-danger")}
              />
              <FaTrafficLight
                size={20}
                className={cn(
                  isReadyForTraffic ? "text-success" : "text-danger",
                )}
              />
            </div>
          </>
        );
      },
    },
  ];
