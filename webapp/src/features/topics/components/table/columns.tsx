"use client";

import { NameCell } from "@/components/data-table/name-cell";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { dateFormatter } from "@/lib/format-date";
import { cn, columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TopicRowActions from "./topic-row-actions";
import { topicsMeta } from "@/constants/page-titles/topics";

type DB_Topic = Prisma.dl_topicGetPayload<{
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

export const columns: ColumnDef<DB_Topic>[] = [
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
      const slug = row.original.slug;
      const name = row.original.name;
      const lps = row.original._count.landingPages;

      return (
        <NameCell
          link={`${topicsMeta.href}/${slug}`}
          name={name}
          length={lps}
        />
      );
    },
  },
  // Slug
  {
    ...columnId({ id: "slug" }),
    accessorFn: (originalRow) => originalRow.slug,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Slug
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <NameCell
        link={`${topicsMeta.href}/${row.original.slug}`}
        name={row.original.slug}
        length={0}
      />
    ),
  },
  // Description
  {
    ...columnId({ id: "description" }),
    accessorFn: (originalRow) => originalRow.description,
    enableSorting: false,
    header: ({}) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          // onClick={() => column.toggleSorting()}
        >
          Description
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2 max-w-[25ch]">
          {row.original.description || "-"}
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
      const topic = row.original;

      return (
        <div className="flex items-center justify-start">
          <TopicRowActions topic={topic} />
        </div>
      );
    },
  },
];
