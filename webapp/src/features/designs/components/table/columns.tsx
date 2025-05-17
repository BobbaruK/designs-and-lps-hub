"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { SelectCell } from "@/components/data-table-server-rendered/select/cell";
import { SelectHeader } from "@/components/data-table-server-rendered/select/header";
import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { NumberBadge } from "@/components/number-badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { designsMeta } from "@/constants/page-titles/designs";
import { dateFormatter } from "@/lib/format-date";
import { columnId } from "@/lib/utils";
import { DB_Design } from "@/types/db/design";
import { ColumnDef } from "@tanstack/react-table";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import DesignRowActions from "./design-row-actions";

export const columns = ({
  isLoading,
  startTransition,
  visibleDesigns,
}: {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  visibleDesigns: DB_Design[];
}): ColumnDef<DB_Design>[] => [
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
      const name = row.original.name;
      const avatars = row.original.avatars;

      return (
        <CustomHoverCard
          triggerAsChild
          trigger={
            <div className="p-2">
              {!avatars.length && (
                <Link
                  href={`${designsMeta.href}/${row.original.slug}`}
                  className="flex items-center gap-2"
                >
                  <CustomAvatar
                    image={null}
                    className="h-[110px] w-[130px] overflow-hidden rounded-md bg-black"
                  />

                  {name}
                </Link>
              )}
              {avatars.length === 1 && (
                <Link
                  href={`${designsMeta.href}/${row.original.slug}`}
                  className="flex items-center gap-2"
                >
                  <CustomAvatar
                    image={avatars[0].url}
                    className="h-[110px] w-[130px] overflow-hidden rounded-md bg-black"
                  />
                  {name}
                </Link>
              )}
              {avatars.length > 1 && (
                <div className="flex items-center gap-2">
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 2000,
                        stopOnInteraction: false,
                      }),
                    ]}
                    opts={{
                      loop: true,
                    }}
                    className="w-[130px]"
                  >
                    <CarouselContent className="-ml-0 w-[130px]">
                      {avatars.map((avatar) => (
                        <CarouselItem
                          key={avatar.id}
                          className="w-[130px] pl-0"
                        >
                          <CustomAvatar
                            image={avatar.url}
                            className="h-[110px] w-[130px] overflow-hidden rounded-md bg-black"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  <Link href={`${designsMeta.href}/${row.original.slug}`}>
                    {name}
                  </Link>
                </div>
              )}
            </div>
          }
        >
          {!avatars.length && (
            <CustomAvatar
              image={null}
              className="block h-[200px] w-[300px] overflow-hidden rounded-md"
            />
          )}
          {avatars.length === 1 && (
            <div>
              <p className="text-center">{avatars[0].name}</p>
              <Link href={avatars[0].url} target="_blank">
                <CustomAvatar
                  image={avatars[0].url}
                  className="block h-[200px] w-[300px] overflow-hidden rounded-md"
                />
              </Link>
            </div>
          )}
          {avatars.length > 1 && (
            <Carousel
              plugins={[]}
              opts={{
                loop: false,
              }}
            >
              <CarouselContent className="-ml-0">
                {avatars.map((avatar) => (
                  <CarouselItem key={avatar.id} className="pl-0">
                    <p className="text-center">{avatar.name}</p>
                    <Link href={avatar.url} target="_blank">
                      <CustomAvatar
                        image={avatar.url}
                        className="h-[200px] w-[300px] overflow-hidden rounded-md bg-black"
                      />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="relative h-10">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </Carousel>
          )}
        </CustomHoverCard>
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
  // Slug
  {
    ...columnId({ id: "slug" }),
    accessorFn: (originalRow) => originalRow.slug,
    header: () => {
      return "Slug";
    },
    cell: ({ row }) => (
      <div className="p-2">
        <Link
          href={`${designsMeta.href}/${row.original.slug}`}
          className="flex items-center gap-2"
        >
          {row.original.slug}
        </Link>
      </div>
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
  // Select
  {
    ...columnId({ id: "select" }),
    enableHiding: false,
    header: () => {
      return (
        <SelectHeader
          data={visibleDesigns}
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
    meta: { size: "100px" },
    header: () => {
      return <div className="text-center">Actions</div>;
    },
    cell: ({ row }) => {
      const design = row.original;

      return (
        <div className="grid place-items-center p-2">
          <DesignRowActions design={design} />
        </div>
      );
    },
  },
];
