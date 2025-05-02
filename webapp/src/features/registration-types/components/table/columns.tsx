"use client";

import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { NumberBadge } from "@/components/number-badge";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { dateFormatter } from "@/lib/format-date";
import { columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import RegistrationTypeRowActions from "./registration-type-row-actions";

export type DB_RegistrationType = Prisma.dl_registration_typeGetPayload<{
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
): ColumnDef<DB_RegistrationType>[] => [
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
      const slug = row.original.slug;
      const name = row.original.name;

      return (
        <div className="p-2">
          <Link
            href={`${registrationTypesMeta.href}/${slug}`}
            className={
              "flex h-auto w-fit flex-row items-center justify-start gap-2 p-0 !text-foreground"
            }
          >
            {name}
          </Link>
        </div>
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
          href={`${registrationTypesMeta.href}/${row.original.slug}`}
          className="flex items-center gap-2"
        >
          {row.original.slug}
        </Link>
      </div>
    ),
  },
  // Description
  {
    ...columnId({ id: "description" }),
    accessorFn: (originalRow) => originalRow.description,
    enableSorting: false,
    header: ({}) => {
      return "Description";
    },
    cell: ({ row }) => {
      return (
        <div className="p-2">
          <span className="line-clamp-1 max-w-[20ch]">
            {row.original.description || "-"}
          </span>
        </div>
      );
    },
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
    header: () => {
      return "Actions";
    },
    cell: ({ row }) => {
      const registrationType = row.original;

      return (
        <div className="flex items-center justify-start p-2">
          <RegistrationTypeRowActions registrationType={registrationType} />
        </div>
      );
    },
  },
];
