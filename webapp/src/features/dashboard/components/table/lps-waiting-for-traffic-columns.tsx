"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
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
      header: ({}) => {
        return "Name";
      },
      cell: ({ row }) => {
        const lp = row.original;
        const lpName = lp.name;
        const desingImage = lp.design?.avatars[0].url || "";

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
      header: ({}) => {
        return "Created By";
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
      header: ({}) => {
        return "Stats";
      },
      cell: ({ row }) => {
        const lp = row.original;
        const isReadyForTraffic = lp.isReadyForTraffic;
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
