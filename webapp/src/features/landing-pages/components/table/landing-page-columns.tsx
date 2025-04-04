"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomButton } from "@/components/custom-button";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { SvgMask } from "@/components/svg-mask";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { dateFormatter } from "@/lib/format-date";
import { cn, columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaTrafficLight, FaWhatsapp } from "react-icons/fa";
import { TbBrandAstro } from "react-icons/tb";
import LandingPageRowActions from "./landing-page-row-actions";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { designsMeta } from "@/constants/page-titles/designs";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { topicsMeta } from "@/constants/page-titles/topics";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";

type LandingPage = Prisma.dl_landing_pageGetPayload<{
  include: {
    createdBy: {
      omit: {
        password: true;
      };
    };
    updatedBy: {
      omit: {
        password: true;
      };
    };
    brand: true;
    design: true;
    registrationType: true;
    language: true;
    license: true;
    landingPageType: true;
    requester: {
      omit: {
        password: true;
      };
    };
    topic: true;
    features: true;
  };
}>;

export const columns: ColumnDef<LandingPage>[] = [
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
      const lpSlug = lp.slug;

      const designSlug = lp.design?.slug;
      const desingImage = lp.design?.avatar || "";

      const isReadyForTraffic = lp.isReadyForTrafic;
      const isWhatsapp = lp.whatsapp;
      const isARTS = lp.isARTS;

      return (
        <CustomHoverCard
          triggerAsChild
          trigger={
            <div className={"relative flex items-center gap-2"}>
              <Link
                href={
                  designSlug
                    ? `${designsMeta.href}/${designSlug}`
                    : `${landingPagesMeta.href}/${row.original.slug}`
                }
                className="flex items-center gap-2"
              >
                <CustomAvatar
                  image={desingImage}
                  className="h-[110px] w-[100px] overflow-hidden rounded-md bg-black"
                />
              </Link>
              <Link
                href={`${landingPagesMeta.href}/${lpSlug}`}
                className={"flex items-center gap-2"}
              >
                {lpName}
              </Link>
              <div className="pointer-events-none absolute bottom-1 end-2 flex items-center gap-1">
                <TbBrandAstro
                  size={20}
                  className={cn(isARTS ? "text-success" : "text-danger")}
                />
                <FaWhatsapp
                  size={20}
                  className={cn(isWhatsapp ? "text-success" : "text-danger")}
                />
                <FaTrafficLight
                  size={20}
                  className={cn(
                    isReadyForTraffic ? "text-success" : "text-danger",
                  )}
                />
              </div>
            </div>
          }
        >
          {desingImage ? (
            <div className="space-y-2">
              <p className="text-center">{row.original.design?.name}</p>
              <Link
                href={desingImage}
                className="flex items-center gap-2"
                target="_blank"
              >
                <Image
                  src={desingImage}
                  alt={`${lpName}'s Logo`}
                  className="h-auto object-cover"
                  unoptimized
                  width={300}
                  height={50}
                />
              </Link>
            </div>
          ) : (
            <p>no image added</p>
          )}
        </CustomHoverCard>
      );
    },
  },
  // Slug
  {
    ...columnId({ id: "slug" }),
    accessorFn: (originalRow) => originalRow?.slug,
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
          Slug
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const slug = row.original.slug;

      return (
        <Button
          asChild
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
        >
          <Link href={`${landingPagesMeta.href}/${slug}`}>{slug}</Link>
        </Button>
      );
    },
  },
  // Requester
  {
    ...columnId({ id: "requester" }),
    accessorFn: (originalRow) => originalRow.requester?.name,
    sortDescFirst: false,
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
          Requester
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const requester = row.original.requester;
      const id = requester?.id;
      const name = requester?.name;
      const image = requester?.image;

      return (
        <UserAvatar
          linkHref={id ? `/profile/${id}` : undefined}
          name={name}
          image={image}
        />
      );
    },
  },
  // Features
  {
    ...columnId({ id: "features" }),
    accessorFn: (originalRow) => originalRow.topic?.name,
    sortUndefined: "last",
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
          Features
          {/* <SortingArrows sort={column.getIsSorted()} /> */}
        </Button>
      );
    },
    cell: ({ row }) => {
      const features = row.original.features;

      if (!features.length) return "-";

      return (
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <Badge key={feature.id} variant={"info"}>
              <Link href={`${featuresTypeMeta.href}/${feature.slug}`}>
                {feature.name}
              </Link>
            </Badge>
          ))}
        </div>
      );
    },
  },
  // Topic
  {
    ...columnId({ id: "topic" }),
    accessorFn: (originalRow) => originalRow.topic?.name,
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
          Topic
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const topic = row.original.topic;
      const slug = topic?.slug;
      const name = topic?.name;

      return (
        <>
          {topic ? (
            <Link href={`${topicsMeta.href}/${slug}`}>{name}</Link>
          ) : (
            <p>No topic</p>
          )}
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
          {license ? (
            <Link href={`${licensesMeta.href}/${slug}`}>{name}</Link>
          ) : (
            <p>No license</p>
          )}
        </>
      );
    },
  },
  // Landing Page Type
  {
    ...columnId({ id: "landingPageType" }),
    accessorFn: (originalRow) => originalRow?.landingPageType?.name,
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
          Landing Page Type
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const landingPageType = row.original.landingPageType;
      const slug = landingPageType?.slug;
      const name = landingPageType?.name;

      return (
        <>
          {landingPageType ? (
            <Link href={`${landingPageTypeMeta.href}/${slug}`}>{name}</Link>
          ) : (
            <p>No landing page type</p>
          )}
        </>
      );
    },
  },
  // Registration Type
  {
    ...columnId({ id: "registrationType" }),
    accessorFn: (originalRow) => originalRow?.registrationType?.name,
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
          Registration Type
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const registrationType = row.original.registrationType;
      const slug = registrationType?.slug;
      const name = registrationType?.name;

      return (
        <>
          {registrationType ? (
            <Link href={`${registrationTypesMeta.href}/${slug}`}>{name}</Link>
          ) : (
            <p>No {registrationTypesMeta.label.singular}</p>
          )}
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
        <Link
          className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
          href={`/brands/${slug}`}
        >
          {image ? <SvgMask imageUrl={image} size="md" /> : name}
        </Link>
      );
    },
  },
  // URL
  {
    ...columnId({ id: "url" }),
    accessorFn: (originalRow) => originalRow.url,
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
          URL
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const slug = row.original.url;

      return (
        <CustomButton
          buttonLabel="Go to url"
          variant={"outline"}
          icon={FaExternalLinkAlt}
          iconPlacement="right"
          linkHref={slug}
          target="_blank"
        />
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
          Created At (UTC)
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => dateFormatter({ date: row.getValue("createdAt") }),
  },
  // Created By
  {
    ...columnId({ id: "createdBy" }),
    accessorFn: (originalRow) => originalRow.createdBy?.name,
    sortUndefined: "last",
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
          Updated At (UTC)
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => dateFormatter({ date: row.getValue("updatedAt") }),
  },
  // Updated By
  {
    ...columnId({ id: "updatedBy" }),
    accessorFn: (originalRow) => originalRow.updatedBy?.name,
    sortUndefined: "last",
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
      const landingPage = row.original;

      return (
        <div className="flex items-center justify-start">
          <LandingPageRowActions landingPage={landingPage} />
        </div>
      );
    },
  },
];
