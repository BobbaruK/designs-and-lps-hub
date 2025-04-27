"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { NumberBadge } from "@/components/number-badge";
import { designsMeta } from "@/constants/page-titles/designs";
import { dateFormatter } from "@/lib/format-date";
import { columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import DesignRowActions from "./design-row-actions";

export type DB_Design = Prisma.dl_designGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
    _count: {
      select: {
        landingPages: true;
      };
    };
  };
}>;

export const columns = (
  isLoading: boolean,
  startTransition: TransitionStartFunction,
): ColumnDef<DB_Design>[] => [
  // Name
  {
    ...columnId({ id: "name" }),
    accessorFn: (originalRow) => originalRow.name.toLowerCase(),
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="name"
          label={"Name"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      const image = row.original.avatar;

      return (
        <CustomHoverCard
          triggerAsChild
          trigger={
            <div className="p-2">
              <Link
                href={`${designsMeta.href}/${row.original.slug}`}
                className="flex items-center gap-2"
              >
                <CustomAvatar
                  image={image}
                  className="h-[110px] w-[130px] overflow-hidden rounded-md bg-black"
                />
                {name}
              </Link>
            </div>
          }
        >
          {image ? (
            <Link
              href={image}
              className="flex items-center gap-2"
              target="_blank"
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
          ) : (
            <p>no image added</p>
          )}
        </CustomHoverCard>
      );
    },
  },
  // No of lps
  {
    ...columnId({ id: "lpsCount" }),
    accessorFn: (originalRow) => originalRow._count.landingPages,
    header: () => {
      return (
        <THeadDropdown
          id="lpsCount"
          label={"LPs"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const noOfLPs = row.original._count.landingPages;

      return (
        <div className="p-2">
          <NumberBadge number={noOfLPs} />
        </div>
      );
    },
  },
  // Slug
  {
    ...columnId({ id: "slug" }),
    accessorFn: (originalRow) => originalRow.slug,
    header: () => {
      return "Slug";
    },
    cell: ({ row }) => (
      <div className="p-2">
        <Link
          href={`${designsMeta.href}/${row.original.slug}`}
          className="flex items-center gap-2"
        >
          {row.original.slug}
        </Link>
      </div>
    ),
  },
  // Created At
  {
    ...columnId({ id: "createdAt" }),
    accessorFn: (originalRow) => originalRow.createdAt,
    sortingFn: "datetime",
    sortDescFirst: false,
    header: () => {
      return (
        <THeadDropdown
          id="createdAt"
          label={"Created At"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return <div className="p-2">{date ? dateFormatter({ date }) : "-"}</div>;
    },
  },
  // Created By
  {
    ...columnId({ id: "createdBy" }),
    accessorFn: (originalRow) => originalRow.createdBy?.name,
    sortDescFirst: false,
    header: () => {
      return "Created by";
    },
    cell: ({ row }) => {
      const createdBy = row.original.createdBy;
      const id = createdBy?.id;
      const name = createdBy?.name;
      const image = createdBy?.image;

      return (
        <div className="p-2">
          <UserAvatar
            linkHref={id ? `/profile/${id}` : undefined}
            name={name}
            image={image}
          />
        </div>
      );
    },
  },
  // Updated At
  {
    ...columnId({ id: "updatedAt" }),
    sortingFn: "datetime",
    sortDescFirst: false,
    accessorFn: (originalRow) => originalRow.updatedAt,
    header: () => {
      return (
        <THeadDropdown
          id="updatedAt"
          label={"Updated At"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return <div className="p-2">{date ? dateFormatter({ date }) : "-"}</div>;
    },
  },
  // Updated By
  {
    ...columnId({ id: "updatedBy" }),
    sortDescFirst: false,
    accessorFn: (originalRow) => originalRow.updatedBy?.name,
    header: () => {
      return "Updated By";
    },
    cell: ({ row }) => {
      const updatedBy = row.original.updatedBy;
      const id = updatedBy?.id;
      const name = updatedBy?.name;
      const image = updatedBy?.image;

      return (
        <div className="p-2">
          <UserAvatar
            linkHref={id ? `/profile/${id}` : undefined}
            name={name}
            image={image}
          />
        </div>
      );
    },
  },
  // Actions
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    meta: { size: "100px" },
    header: () => {
      return "Actions";
    },
    cell: ({ row }) => {
      const design = row.original;

      return (
        <div className="flex items-center justify-start">
          <DesignRowActions design={design} />
        </div>
      );
    },
  },
];
