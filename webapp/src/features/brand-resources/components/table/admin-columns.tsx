"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { SelectCell } from "@/components/data-table-server-rendered/select/cell";
import { SelectHeader } from "@/components/data-table-server-rendered/select/header";
import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SvgMask } from "@/components/svg-mask";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { dateFormatter } from "@/lib/format-date";
import { columnId } from "@/lib/utils";
import { DB_BrandResource } from "@/types/db/brand-resources";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import { IoIosDocument } from "react-icons/io";
import BrandResourceRowActions from "./brand-resource-row-actions";

export const columns = ({
  isLoading,
  startTransition,
  visibleBrandResources,
}: {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  visibleBrandResources: DB_BrandResource[];
}): ColumnDef<DB_BrandResource>[] => [
  // Avatar
  {
    ...columnId({ id: "avatar" }),
    accessorFn: (originalRow) => originalRow.name.toLowerCase(),
    enableHiding: false,
    header: () => {
      return "Avatar";
    },

    cell: ({ row }) => {
      const id = row.original.id;
      const type = row.original.type;
      const image = row.original.url;

      if (type === "VECTOR_IMAGE") {
        return (
          <Link
            href={`${brandResourcesMeta.href}/${id}`}
            target="_blank"
            className="block w-fit p-2"
          >
            <CustomAvatar
              image={image}
              className="h-[50px] w-[200px] overflow-hidden rounded-md"
              fit="contain"
            />
          </Link>
        );
      }

      if (type === "IMAGE") {
        return (
          <Link
            href={`${brandResourcesMeta.href}/${id}`}
            target="_blank"
            className="block w-fit p-2"
          >
            <CustomAvatar
              image={image}
              className="h-[100px] w-[200px] overflow-hidden rounded-md"
            />
          </Link>
        );
      }

      return (
        <Link
          href={`${brandResourcesMeta.href}/${id}`}
          target="_blank"
          className="block w-fit p-2"
        >
          <CustomAvatar
            image={image}
            className="h-[100px] w-[200px] overflow-hidden rounded-md"
            icon={<IoIosDocument className="h-[55%] w-[55%]" />}
          />
        </Link>
      );
    },
  },
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
      const id = row.original.id;
      const name = row.original.name;

      return (
        <div className="p-2">
          <Link
            href={`${brandResourcesMeta.href}/${id}`}
            className={
              "flex h-auto w-fit flex-row items-center justify-start gap-2"
            }
          >
            {name}
          </Link>
        </div>
      );
    },
  },
  // Type
  {
    ...columnId({ id: "type" }),
    accessorFn: (originalRow) => originalRow.type,
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="type"
          label={"Type"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => <div className="p-2">{row.original.type}</div>,
  },
  // Brand
  {
    ...columnId({ id: "brand" }),
    accessorFn: (originalRow) => originalRow.brand.name.toLowerCase(),
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="brand"
          label={"Brand"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const slug = row.original.brand.slug;
      const name = row.original.brand.name;
      const image = row.original.brand.logo;

      return (
        <div className="p-2">
          <Link href={`${brandsMeta.href}/${slug}`}>
            <span className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer">
              {image ? <SvgMask imageUrl={image} size="lg" /> : name}
            </span>
          </Link>
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
  // Select
  {
    ...columnId({ id: "select" }),
    enableHiding: false,
    header: () => {
      return (
        <SelectHeader
          data={visibleBrandResources}
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
          <BrandResourceRowActions brandResource={brandLogo} />
        </div>
      );
    },
  },
];
