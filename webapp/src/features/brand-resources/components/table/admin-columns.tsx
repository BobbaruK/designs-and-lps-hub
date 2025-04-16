"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { SvgMask } from "@/components/svg-mask";
import { Button } from "@/components/ui/button";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { dateFormatter } from "@/lib/format-date";
import { cn, columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { IoIosDocument } from "react-icons/io";
import BrandResourceRowActions from "./brand-resource-row-actions";

type DB_BrandResource = Prisma.dl_brand_resourceGetPayload<{
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

export const adminColumns: ColumnDef<DB_BrandResource>[] = [
  // Name
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
          <Link href={image} target="_blank" className="block w-fit">
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
          <Link href={image} target="_blank" className="block w-fit">
            <CustomAvatar
              image={image}
              className="h-[100px] w-[200px] overflow-hidden rounded-md"
            />
          </Link>
        );
      }

      return (
        <Link href={image} target="_blank" className="block w-fit">
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

      return <Link href={`${brandResourcesMeta.href}/${id}`}>{name}</Link>;
    },
  },
  // Type
  {
    ...columnId({ id: "type" }),
    accessorFn: (originalRow) => originalRow.type,
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
          Type
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },

    cell: ({ row }) => row.original.type,
  },
  // Brand
  {
    ...columnId({ id: "brand" }),
    accessorFn: (originalRow) => originalRow.brand.name.toLowerCase(),
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
          Brand
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },

    cell: ({ row }) => {
      const slug = row.original.brand.slug;
      const name = row.original.brand.name;
      const image = row.original.brand.logo;

      return (
        <Link href={`${brandsMeta.href}/${slug}`}>
          <span className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer">
            {image ? <SvgMask imageUrl={image} size="lg" /> : name}
          </span>
        </Link>
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
      const brandLogo = row.original;

      return (
        <div className="flex items-center justify-start">
          <BrandResourceRowActions brandResource={brandLogo} />
        </div>
      );
    },
  },
];
