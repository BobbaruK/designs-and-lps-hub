"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { NumberBadge } from "@/components/number-badge";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { languagesMeta } from "@/constants/page-titles/languages";
import { dateFormatter } from "@/lib/format-date";
import { cn, columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import LanguageRowActions from "./language-row-actions";

type DB_Language = Prisma.dl_languageGetPayload<{
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

export const columns: ColumnDef<DB_Language>[] = [
  // English name
  {
    ...columnId({ id: "name" }),
    accessorFn: (originalRow) => originalRow.englishName.toLowerCase(),
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
          English name
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },

    cell: ({ row }) => {
      const slug = row.original.iso_639_1;
      const name = row.original.englishName;
      const image = row.original.flag;

      return (
        <Link
          href={`${languagesMeta.href}/${slug}`}
          className={
            "flex h-auto w-fit flex-row items-center justify-start gap-2 p-0 !text-foreground"
          }
        >
          <CustomAvatar image={image} />
          {name}
        </Link>
      );
    },
  },
  // No of lps
  {
    ...columnId({ id: "lpsCount" }),
    accessorFn: (originalRow) => originalRow._count.landingPages,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          LPs
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const noOfLPs = row.original._count.landingPages;

      return <NumberBadge number={noOfLPs} />;
    },
  },
  // Name
  {
    ...columnId({ id: "slug" }),
    accessorFn: (originalRow) => originalRow.iso_639_1,
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
      const slug = row.original.iso_639_1;
      const name = row.original.name;

      return (
        <Link
          href={`${languagesMeta.href}/${slug}`}
          className={
            "flex h-auto w-fit flex-row items-center justify-start gap-2 p-0 !text-foreground"
          }
        >
          {name}
        </Link>
      );
    },
  },
  // ISO 639-1
  {
    ...columnId({ id: "iso_639_1" }),
    accessorFn: (originalRow) => originalRow.iso_639_1,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          ISO 639-1
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => row.original.iso_639_1,
  },
  // ISO 3166-1
  {
    ...columnId({ id: "iso_3166_1" }),
    // TODO: nullish bullish
    // sortUndefined not working because accessorFn returns null not undefined
    accessorFn: (originalRow) => originalRow?.iso_3166_1 || undefined,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          ISO 3166-1
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => row.original.iso_3166_1 || "-",
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
          Created At
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return date ? dateFormatter({ date }) : "-";
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
        <UserAvatar
          linkHref={id ? `/profile/${id}` : undefined}
          name={name}
          image={image}
        />
      );
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
          Updated At
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return date ? dateFormatter({ date }) : "-";
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

      return (
        <UserAvatar
          linkHref={id ? `/profile/${id}` : undefined}
          name={name}
          image={image}
        />
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
        <div className="flex items-center justify-start">
          <LanguageRowActions language={language} />
        </div>
      );
    },
  },
];
