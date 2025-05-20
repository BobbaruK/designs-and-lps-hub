"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { IconAstro } from "@/components/icons/astro";
import { IconClose } from "@/components/icons/close";
import { IconPickaxe } from "@/components/icons/pickaxe";
import { IconTraffic } from "@/components/icons/traffic";
import { IconWhatsapp } from "@/components/icons/whatsapp";
import { columnId } from "@/lib/utils";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const lpsWaitingForTrafficColumns: ColumnDef<DB_LandingPage>[] = [
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
      const designImage = lp.avatar?.url || "";

      return (
        <Link
          href={`/landing-pages/${row.original.slug}`}
          className="flex items-center gap-2"
        >
          <CustomAvatar
            image={designImage}
            className="h-[35px] w-[70px] overflow-hidden rounded-md bg-black @3xl:h-[95px] @3xl:w-[130px]"
          />
          <span>{lpName}</span>
        </Link>
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

      if (createdBy) {
        const id = createdBy.id;
        const name = createdBy.name;
        const image = createdBy.image;

        return (
          <UserAvatar
            linkHref={id ? `/profile/${id}` : undefined}
            name={name}
            image={image}
          />
        );
      }

      return (
        <div className="[&_svg]:size-10">
          <IconClose />
        </div>
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
      const isUnderMaintenance = lp.isUnderMaintenance;

      return (
        <div className="pointer-events-none flex items-center gap-1">
          <IconAstro isSuccess={isARTS} />
          <IconWhatsapp isSuccess={isWhatsapp} />
          <IconTraffic isSuccess={isReadyForTraffic} />
          <IconPickaxe isSuccess={isUnderMaintenance} />
        </div>
      );
    },
  },
];
