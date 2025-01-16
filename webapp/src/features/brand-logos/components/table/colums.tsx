"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { TableUserAvatar } from "@/components/table-user-avatar";
import { Button } from "@/components/ui/button";
import { FORMAT_DATE_OPTIONS } from "@/constants";
import { cn, columnId, formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import BrandLogosRowActions from "./brand-logos-row-actions";
import { CustomHoverCard } from "@/components/custom-hover-card";
import Image from "next/image";

type DB_BrandLogos = Prisma.dl_avatar_brand_logoGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
  };
}>;

export const columns: ColumnDef<DB_BrandLogos>[] = [
  // Name
  {
    ...columnId({ id: "name" }),
    accessorFn: (originalRow) => originalRow.name.toLowerCase(),
    enableHiding: false,
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
      const id = row.original.id;
      const name = row.original.name;
      const image = row.original.url;

      return (
        <CustomHoverCard
          triggerAsChild
          trigger={
            <Link
              href={`/brand-logos/${id}`}
              className="flex items-center gap-2"
            >
              <CustomAvatar
                image={image}
                className="overflow-hidden bg-black"
              />
              {name}
            </Link>
          }
        >
          <Link
            href={`/brand-logos/${id}`}
            className="flex items-center gap-2"
          >
            <Image
              src={image}
              alt={`${name}'s Logo`}
              className="h-auto object-cover"
              unoptimized
              width={300}
              height={50}
            />
          </Link>
        </CustomHoverCard>
      );
    },
  },
  // Created At
  {
    ...columnId({ id: "createdAt" }),
    accessorFn: (originalRow) => originalRow.createdAt,
    sortingFn: "datetime",
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
          Created At (UTC)
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return date ? formatDate(date, FORMAT_DATE_OPTIONS) : "-";
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

      return <TableUserAvatar id={id} name={name} image={image} />;
    },
  },
  // Updated At
  {
    ...columnId({ id: "updatedAt" }),
    sortingFn: "datetime",
    sortDescFirst: false,
    accessorFn: (originalRow) => originalRow.updatedAt,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Updated At (UTC)
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return date ? formatDate(date, FORMAT_DATE_OPTIONS) : "-";
    },
  },
  // Updated By
  {
    ...columnId({ id: "updatedBy" }),
    sortDescFirst: false,
    accessorFn: (originalRow) => originalRow.updatedBy?.name,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Updated By
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedBy = row.original.updatedBy;
      const id = updatedBy?.id;
      const name = updatedBy?.name;
      const image = updatedBy?.image;

      return <TableUserAvatar id={id} name={name} image={image} />;
    },
  },
  // Actions
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    header: () => {
      return "Actions";
    },
    cell: ({ row }) => {
      const brandLogo = row.original;

      return (
        <div className="grid place-items-center">
          <BrandLogosRowActions brandLogo={brandLogo} />
        </div>
      );
    },
  },
];
