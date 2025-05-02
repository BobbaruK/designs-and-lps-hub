"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { Button } from "@/components/ui/button";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { dateFormatter } from "@/lib/format-date";
import { columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { IoIosDocument } from "react-icons/io";

export type DB_BrandResource = Prisma.dl_brand_resourceGetPayload<{
  include: {
    createdBy: true;
    updatedBy: true;
    brand: {
      select: {
        id: true;
        name: true;
        slug: true;
        logo: true;
      };
    };
  };
}>;

export const columns = (
  isLoading: boolean,
  startTransition: TransitionStartFunction,
): ColumnDef<DB_BrandResource>[] => [
  // Avatar
  {
    ...columnId({ id: "avatar" }),
    accessorFn: (originalRow) => originalRow.name.toLowerCase(),
    enableHiding: false,
    header: () => {
      return "Avatar";
    },

    cell: ({ row }) => {
      const type = row.original.type;
      const image = row.original.url;

      if (type === "VECTOR_IMAGE") {
        return (
          <div className="p-2">
            <CustomAvatar
              image={image}
              className="h-[50px] w-[200px] overflow-hidden rounded-md"
              fit="contain"
            />
          </div>
        );
      }

      if (type === "IMAGE") {
        return (
          <div className="p-2">
            <CustomAvatar
              image={image}
              className="h-[100px] w-[200px] overflow-hidden rounded-md"
            />
          </div>
        );
      }

      return (
        <div className="p-2">
          <CustomAvatar
            image={image}
            className="h-[100px] w-[200px] overflow-hidden rounded-md"
            icon={<IoIosDocument className="h-[55%] w-[55%]" />}
          />
        </div>
      );
    },
  },
  // Name
  {
    ...columnId({ id: "name" }),
    accessorFn: (originalRow) => originalRow.name.toLowerCase(),
    enableHiding: false,
    header: ({}) => {
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
      const id = row.original.id;
      const name = row.original.name;

      return (
        <div className="p-2">
          <Link href={`${brandResourcesMeta.href}/${id}`}>{name}</Link>
        </div>
      );
    },
  },
  // Type
  {
    ...columnId({ id: "type" }),
    accessorFn: (originalRow) => originalRow.type,
    enableHiding: false,
    header: ({}) => {
      return "Type";
    },

    cell: ({ row }) => <div className="p-2">{row.original.type}</div>,
  },
  // Created At
  {
    ...columnId({ id: "createdAt" }),
    accessorFn: (originalRow) => originalRow.createdAt,
    sortingFn: "datetime",
    sortDescFirst: false,
    header: ({}) => {
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
    header: ({}) => {
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
    header: ({}) => {
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
    header: ({}) => {
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
  // Download
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    header: () => {
      return "Download";
    },
    cell: ({ row }) => {
      const image = row.original.url;

      return (
        <div className="flex items-center justify-start p-2">
          <Button
            variant={"info"}
            size={"icon"}
            className="p-1 [&_svg]:size-5"
            asChild
          >
            <Link href={image} target="_blank" className="block w-fit text-2xl">
              <span className="sr-only">Download</span>
              <HiOutlineFolderDownload />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
