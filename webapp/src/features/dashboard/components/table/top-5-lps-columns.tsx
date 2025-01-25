"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { cn, columnId } from "@/lib/utils";
import { LastLandingPagesAdded } from "@/types/landing-pages";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const top5LPsColumns: ColumnDef<LastLandingPagesAdded>[] = [
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
  // License
  {
    ...columnId({ id: "license" }),
    accessorFn: (originalRow) => originalRow?.license?.name,
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
          License
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const license = row.original.license;
      const slug = license?.slug;
      const name = license?.name;

      return (
        <>
          <UserAvatar
            linkHref={slug ? `/licenses/${slug}` : undefined}
            name={name}
            image={null}
            resource="License"
            hideAvatar
          />
        </>
      );
    },
  },
  // Language
  {
    ...columnId({ id: "language" }),
    accessorFn: (originalRow) => originalRow?.language?.englishName,
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
          Language
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const language = row.original.language;
      const iso = language?.iso_639_1;
      const name = language?.englishName;
      const image = language?.flag;

      return (
        <UserAvatar
          linkHref={iso ? `/languages/${iso}` : undefined}
          name={name}
          image={image}
          resource="Language"
          hideAvatar
        />
      );
    },
  },
  // Brand
  {
    ...columnId({ id: "brand" }),
    accessorFn: (originalRow) => originalRow?.brand?.name,
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
          Brand
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const slug = row.original.brand?.slug;
      const name = row.original.brand?.name;
      const image = row.original.brand?.logo;

      return (
        <UserAvatar
          linkHref={slug ? `/brands/${slug}` : undefined}
          name={name}
          image={image}
          resource="Brand"
          hideAvatar
        />
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
];
