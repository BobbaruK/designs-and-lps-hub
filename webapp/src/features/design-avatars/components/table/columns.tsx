"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { SelectCell } from "@/components/data-table-server-rendered/select/cell";
import { SelectHeader } from "@/components/data-table-server-rendered/select/header";
import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { dateFormatter } from "@/lib/format-date";
import { cn, columnId } from "@/lib/utils";
import { DB_DesignAvatar } from "@/types/db/design-avatars";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import DesignAvatarRowActions from "./brand-logos-row-actions";

export const columns = ({
  isLoading,
  startTransition,
  visibleDesignAvatars,
}: {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  visibleDesignAvatars: DB_DesignAvatar[];
}): ColumnDef<DB_DesignAvatar>[] => [
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
            <div className="p-2">
              <Link
                href={`${designAvatarsMeta.href}/${id}`}
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
          <div>
            <Link href={image} target="_blank">
              <CustomAvatar
                image={image}
                className="block h-[200px] w-[300px] overflow-hidden rounded-md"
              />
            </Link>
          </div>
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
  // Select
  {
    ...columnId({ id: "select" }),
    enableHiding: false,
    header: () => {
      return (
        <SelectHeader
          data={visibleDesignAvatars}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <SelectCell
          id={id}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
  },
  // Actions
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    header: () => {
      return <div className="grid place-items-center p-2">Actions</div>;
    },
    cell: ({ row }) => {
      const brandLogo = row.original;

      return (
        <div className="grid place-items-center p-2">
          <DesignAvatarRowActions brandLogo={brandLogo} />
        </div>
      );
    },
  },
];
