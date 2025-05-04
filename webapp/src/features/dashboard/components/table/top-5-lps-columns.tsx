"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SvgMask } from "@/components/svg-mask";
import { columnId } from "@/lib/utils";
import { LastLandingPagesAdded } from "@/types/landing-pages";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const top5LPsColumns: ColumnDef<LastLandingPagesAdded>[] = [
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
    header: ({}) => {
      return "License";
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
    header: ({}) => {
      return "Language";
    },
    cell: ({ row }) => {
      const language = row.original.language;
      const iso = language?.iso_639_1;
      const name = language?.englishName;
      const image = language?.flag;

      return (
        <Link href={`/languages/${iso}`} className="flex items-center gap-2">
          <CustomAvatar image={image} />
          <span>{name}</span>
        </Link>
      );
    },
  },
  // Brand
  {
    ...columnId({ id: "brand" }),
    accessorFn: (originalRow) => originalRow?.brand?.name,
    sortUndefined: "last",
    header: ({}) => {
      return "Brand";
    },
    cell: ({ row }) => {
      const slug = row.original.brand?.slug;
      // const name = row.original.brand?.name;
      const image = row.original.brand?.logo;

      return (
        <Link href={`/brands/${slug}`} className="flex items-center gap-2">
          <SvgMask imageUrl={image || null} size="md" />
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
      const id = createdBy?.id;
      const name = createdBy?.name;
      const image = createdBy?.image;

      return (
        <UserAvatar linkHref={`/profile/${id}`} name={name} image={image} />
      );
    },
  },
];
