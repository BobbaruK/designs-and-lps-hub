"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { NumberBadge } from "@/components/number-badge";
import { languagesMeta } from "@/constants/page-titles/languages";
import { dateFormatter } from "@/lib/format-date";
import { columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import LanguageRowActions from "./language-row-actions";

export type DB_Language = Prisma.dl_languageGetPayload<{
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
): ColumnDef<DB_Language>[] => [
  // English name
  {
    ...columnId({ id: "englishName" }),
    accessorFn: (originalRow) => originalRow.englishName.toLowerCase(),
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="englishName"
          label={"English name"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const slug = row.original.iso_639_1;
      const name = row.original.englishName;
      const image = row.original.flag;

      return (
        <div className="p-2">
          <Link
            href={`${languagesMeta.href}/${slug}`}
            className={
              "flex h-auto w-fit flex-row items-center justify-start gap-2 p-0 !text-foreground"
            }
          >
            <CustomAvatar image={image} />
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
  // Name
  {
    ...columnId({ id: "name" }),
    accessorFn: (originalRow) => originalRow.iso_639_1,
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
      const slug = row.original.iso_639_1;
      const name = row.original.name;

      return (
        <div className="p-2">
          <Link
            href={`${languagesMeta.href}/${slug}`}
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
  // ISO 639-1
  {
    ...columnId({ id: "iso_639_1" }),
    accessorFn: (originalRow) => originalRow.iso_639_1,
    header: () => {
      return (
        <THeadDropdown
          id="iso_639_1"
          label={"	ISO 639-1"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => <div className="p-2">{row.original.iso_639_1}</div>,
  },
  // ISO 3166-1
  {
    ...columnId({ id: "iso_3166_1" }),
    accessorFn: (originalRow) => originalRow?.iso_3166_1 || undefined,
    sortUndefined: "last",
    header: () => {
      return (
        <THeadDropdown
          id="iso_3166_1"
          label={"ISO 3166-1"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => (
      <div className="p-2">{row.original.iso_3166_1 || "-"}</div>
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
    header: () => {
      return "Actions";
    },
    cell: ({ row }) => {
      const language = row.original;

      return (
        <div className="flex items-center justify-start p-2">
          <LanguageRowActions language={language} />
        </div>
      );
    },
  },
];
