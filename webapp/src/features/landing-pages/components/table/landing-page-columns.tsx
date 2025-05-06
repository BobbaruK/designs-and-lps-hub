"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomButton } from "@/components/custom-button";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { SelectCell } from "@/components/data-table-server-rendered/select/cell";
import { SelectHeader } from "@/components/data-table-server-rendered/select/header";
import { THeadDropdown } from "@/components/data-table-server-rendered/thead-dropdown";
import { UserAvatar } from "@/components/data-table/user-avatar";
import { SvgMask } from "@/components/svg-mask";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { designsMeta } from "@/constants/page-titles/designs";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { topicsMeta } from "@/constants/page-titles/topics";
import { dateFormatter } from "@/lib/format-date";
import { cn, columnId } from "@/lib/utils";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import { FaExternalLinkAlt, FaTrafficLight, FaWhatsapp } from "react-icons/fa";
import { TbBrandAstro } from "react-icons/tb";
import LandingPageRowActions from "./landing-page-row-actions";

export const columns = ({
  isLoading,
  startTransition,
  visibleLps,
}: {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  visibleLps: DB_LandingPage[];
}): ColumnDef<DB_LandingPage>[] => [
  // Name
  {
    ...columnId({ id: "name" }),
    enableHiding: false,
    accessorFn: (originalRow) => originalRow?.name,
    header: () => (
      <THeadDropdown
        id="name"
        label={"Name"}
        isLoading={isLoading}
        startTransition={startTransition}
      />
    ),
    cell: ({ row }) => {
      const lp = row.original;
      const lpName = lp.name;
      const lpSlug = lp.slug;

      const designSlug = lp.design?.slug;
      const desingImage = lp.design?.avatar || "";

      const isReadyForTraffic = lp.isReadyForTraffic;
      const isWhatsapp = lp.whatsapp;
      const isARTS = lp.isARTS;
      const isHome = lp.isHome;

      return (
        <CustomHoverCard
          triggerAsChild
          trigger={
            <div
              className={cn("relative flex items-stretch gap-2 p-2", {
                "bg-[linear-gradient(90deg,hsl(var(--info-background)_/_0.9)_0%,_hsl(var(--info-background)_/_0.5)_30%,_hsl(var(--info-background)_/_0)_100%)]":
                  isHome,
              })}
            >
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
              <div className="flex flex-col items-start justify-end gap-1">
                <Link
                  href={`${landingPagesMeta.href}/${lpSlug}`}
                  className={"my-auto flex items-center gap-2"}
                >
                  {lpName}
                </Link>
                <div className="pointer-events-none flex items-center gap-1">
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
    header: () => (
      <THeadDropdown
        id="slug"
        label={"Slug"}
        isLoading={isLoading}
        startTransition={startTransition}
      />
    ),
    cell: ({ row }) => {
      const slug = row.original.slug;

      return (
        <div className="p-2">
          <Button
            asChild
            variant="link"
            className={cn(
              "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
            )}
          >
            <Link href={`${landingPagesMeta.href}/${slug}`}>{slug}</Link>
          </Button>
        </div>
      );
    },
  },
  // Requester
  {
    ...columnId({ id: "requester" }),
    accessorFn: (originalRow) => originalRow.requester?.name,
    sortDescFirst: false,
    sortUndefined: "last",
    header: () => "Requester",
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
    header: ({}) => "Features",
    cell: ({ row }) => {
      const features = row.original.features;

      if (!features.length) return "-";

      return (
        <div className="flex flex-wrap gap-2 p-2">
          {features.map((feature) => (
            <Badge key={feature.id} variant={"info"}>
              <Link
                href={`${featuresTypeMeta.href}/${feature.slug}`}
                className="line-clamp-1"
              >
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
    header: () => (
      <THeadDropdown
        id="topic"
        label={"Topic"}
        isLoading={isLoading}
        startTransition={startTransition}
      />
    ),
    cell: ({ row }) => {
      const topic = row.original.topic;
      const slug = topic?.slug;
      const name = topic?.name;

      return (
        <div className="p-2">
          {topic ? (
            <Link href={`${topicsMeta.href}/${slug}`}>{name}</Link>
          ) : (
            <p>No topic</p>
          )}
        </div>
      );
    },
  },
  // License
  {
    ...columnId({ id: "license" }),
    accessorFn: (originalRow) => originalRow?.license?.name,
    sortUndefined: "last",
    header: () => {
      return (
        <THeadDropdown
          id="license"
          label={"License"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const license = row.original.license;
      const slug = license?.slug;
      const name = license?.name;

      return (
        <div className="p-2">
          {license ? (
            <Link href={`${licensesMeta.href}/${slug}`}>{name}</Link>
          ) : (
            <p>No license</p>
          )}
        </div>
      );
    },
  },
  // Landing Page Type
  {
    ...columnId({ id: "landingPageType" }),
    accessorFn: (originalRow) => originalRow?.landingPageType?.name,
    sortUndefined: "last",
    header: () => {
      return (
        <THeadDropdown
          id="landingPageType"
          label={"Landing Page Type"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const landingPageType = row.original.landingPageType;
      const slug = landingPageType?.slug;
      const name = landingPageType?.name;

      return (
        <div className="p-2">
          {landingPageType ? (
            <Link href={`${landingPageTypeMeta.href}/${slug}`}>{name}</Link>
          ) : (
            <p>No landing page type</p>
          )}
        </div>
      );
    },
  },
  // Registration Type
  {
    ...columnId({ id: "registrationType" }),
    accessorFn: (originalRow) => originalRow?.registrationType?.name,
    sortUndefined: "last",
    header: () => {
      return (
        <THeadDropdown
          id="registrationType"
          label={"Registration Type"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const registrationType = row.original.registrationType;
      const slug = registrationType?.slug;
      const name = registrationType?.name;

      return (
        <div className="p-2">
          {registrationType ? (
            <Link href={`${registrationTypesMeta.href}/${slug}`}>{name}</Link>
          ) : (
            <p>No {registrationTypesMeta.label.singular}</p>
          )}
        </div>
      );
    },
  },
  // Language
  {
    ...columnId({ id: "language" }),
    accessorFn: (originalRow) => originalRow?.language?.englishName,
    sortUndefined: "last",
    header: () => {
      return (
        <THeadDropdown
          id="language"
          label={"Language"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const language = row.original.language;
      const iso = language?.iso_639_1;
      const name = language?.englishName;
      const image = language?.flag;

      return (
        <div className="p-2">
          <UserAvatar
            linkHref={iso ? `/languages/${iso}` : undefined}
            name={name}
            image={image}
            resource="Language"
          />
        </div>
      );
    },
  },
  // Brand
  {
    ...columnId({ id: "brand" }),
    accessorFn: (originalRow) => originalRow?.brand?.name,
    sortUndefined: "last",
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
      const slug = row.original.brand?.slug;
      const name = row.original.brand?.name;
      const image = row.original.brand?.logo;

      return (
        <div className="p-2">
          <Link
            className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
            href={`/brands/${slug}`}
          >
            {image ? <SvgMask imageUrl={image} size="md" /> : name}
          </Link>
        </div>
      );
    },
  },
  // URL
  {
    ...columnId({ id: "url" }),
    accessorFn: (originalRow) => originalRow.url,
    sortUndefined: "last",
    header: () => "URL",
    cell: ({ row }) => {
      const slug = row.original.url;

      return (
        <div className="p-2">
          <CustomButton
            buttonLabel="Go to url"
            variant={"outline"}
            icon={FaExternalLinkAlt}
            iconPlacement="right"
            linkHref={slug}
            target="_blank"
          />
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
    header: () => (
      <THeadDropdown
        id="createdAt"
        label={"Created At"}
        isLoading={isLoading}
        startTransition={startTransition}
      />
    ),
    cell: ({ row }) => (
      <div className="p-2">
        {dateFormatter({ date: row.getValue("createdAt") })}
      </div>
    ),
  },
  // Created By
  {
    ...columnId({ id: "createdBy" }),
    accessorFn: (originalRow) => originalRow.createdBy?.name,
    sortUndefined: "last",
    sortDescFirst: false,
    header: () => "Created By",
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
    cell: ({ row }) => (
      <div className="p-2">
        {dateFormatter({ date: row.getValue("updatedAt") })}
      </div>
    ),
  },
  // Updated By
  {
    ...columnId({ id: "updatedBy" }),
    accessorFn: (originalRow) => originalRow.updatedBy?.name,
    sortUndefined: "last",
    sortDescFirst: false,
    header: () => "Updated By",
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
    accessorFn: (originalRow) => originalRow?.name,
    header: () => {
      return (
        <SelectHeader
          data={visibleLps}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className={"p-2"}>
          <SelectCell
            id={id}
            isLoading={isLoading}
            startTransition={startTransition}
          />
        </div>
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
        <div className="flex items-center justify-center p-2">
          <LandingPageRowActions landingPage={landingPage} />
        </div>
      );
    },
  },
];
