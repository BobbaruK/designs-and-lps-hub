"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { IconClose } from "@/components/icons/close";
import { SvgMask } from "@/components/svg-mask";
import { columnId } from "@/lib/utils";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const top5LPsColumns: ColumnDef<DB_LandingPage>[] = [
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

      if (license) {
        const slug = license?.slug;
        const name = license?.name;
        return <Link href={`/licenses/${slug}`}>{name}</Link>;
      }

      return (
        <div className="[&_svg]:size-10">
          <IconClose />
        </div>
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

      if (language) {
        const slug = language.slug;
        const name = language.englishName;
        const image = language.flag;

        return (
          <UserAvatar
            linkHref={`/languages/${slug}`}
            name={name}
            image={image}
            resource="Language"
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
  // Brand
  {
    ...columnId({ id: "brand" }),
    accessorFn: (originalRow) => originalRow?.brand?.name,
    sortUndefined: "last",
    header: ({}) => {
      return "Brand";
    },
    cell: ({ row }) => {
      const brand = row.original.brand;

      if (brand) {
        const slug = brand.slug;
        const name = brand.name;
        const image = brand.logo;

        return (
          <Link
            className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
            href={`/brands/${slug}`}
          >
            {image ? <SvgMask imageUrl={image} size="md" /> : name}
          </Link>
        );
      }

      return (
        <div className="[&_svg]:size-10">
          <IconClose />
        </div>
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
];
