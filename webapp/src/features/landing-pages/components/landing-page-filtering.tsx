"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { topicsMeta } from "@/constants/page-titles/topics";
import { capitalizeFirstLetter } from "@/lib/utils";
import { LP_SearchParams } from "@/types/landing-pages";
import { Prisma } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useTransition } from "react";

type Select = {
  id: true;
  slug: true;
  name: true;
};

type Feature = Prisma.dl_featuresGetPayload<{
  select: Select;
}>;

type Topic = Prisma.dl_topicGetPayload<{
  select: Select;
}>;

type License = Prisma.dl_licenseGetPayload<{
  select: Select;
}>;

type LandingPageType = Prisma.dl_landing_page_typeGetPayload<{
  select: Select;
}>;

interface Props {
  features?: Feature[] | null;
  topics?: Topic[] | null;
  licenses?: License[] | null;
  landingPageTypes?: LandingPageType[] | null;
  searchParams?: LP_SearchParams;
}

export const LandingPageFiltering = ({
  features,
  topics,
  licenses,
  landingPageTypes,
  // searchParams
}: Props) => {
  const [isLoading, startTransition] = useTransition();

  const [featuresQuery, setFeaturesQuery] = useQueryState(
    "feature",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const [topicsQuery, setTopicsQuery] = useQueryState(
    "topic",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const [licensesQuery, setLicensesQuery] = useQueryState(
    "license",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const [lpTypesQuery, setLpTypesQuery] = useQueryState(
    "lpType",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const handleCheckFeatureChange = (feature: Feature) => {
    if (featuresQuery?.includes(feature.slug)) {
      const filtered = featuresQuery.filter((feat) => feat !== feature.slug);

      setFeaturesQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setFeaturesQuery((f) => [...(f || []), feature.slug]);
  };

  const handleCheckTopicChange = (feature: Topic) => {
    if (topicsQuery?.includes(feature.slug)) {
      const filtered = topicsQuery.filter((feat) => feat !== feature.slug);

      setTopicsQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setTopicsQuery((f) => [...(f || []), feature.slug]);
  };

  const handleCheckLicenseChange = (feature: License) => {
    if (licensesQuery?.includes(feature.slug)) {
      const filtered = licensesQuery.filter((feat) => feat !== feature.slug);

      setLicensesQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setLicensesQuery((f) => [...(f || []), feature.slug]);
  };

  const handleCheckLpTypeChange = (feature: License) => {
    if (lpTypesQuery?.includes(feature.slug)) {
      const filtered = lpTypesQuery.filter((feat) => feat !== feature.slug);

      setLpTypesQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setLpTypesQuery((f) => [...(f || []), feature.slug]);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="pt-0">Advance search</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-12">
          <div className="flex flex-col gap-2">
            <div>{capitalizeFirstLetter(featuresTypeMeta.label.plural)}</div>
            <div className="flex flex-col gap-1">
              {features?.map((feature) => {
                return (
                  <div key={feature.id} className="flex items-center gap-2">
                    <Checkbox
                      id={feature.slug}
                      checked={featuresQuery?.includes(feature.slug) || false}
                      onCheckedChange={() => handleCheckFeatureChange(feature)}
                      disabled={isLoading}
                    />

                    <Label htmlFor={feature.slug}>{feature.name}</Label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>{capitalizeFirstLetter(topicsMeta.label.plural)}</div>
            <div className="flex flex-col gap-1">
              {topics?.map((topic) => {
                return (
                  <div key={topic.id} className="flex items-center gap-2">
                    <Checkbox
                      id={topic.slug}
                      checked={topicsQuery?.includes(topic.slug) || false}
                      onCheckedChange={() => handleCheckTopicChange(topic)}
                      disabled={isLoading}
                    />

                    <Label htmlFor={topic.slug}>{topic.name}</Label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>{capitalizeFirstLetter(licensesMeta.label.plural)}</div>
            <div className="flex flex-col gap-1">
              {licenses?.map((license) => {
                return (
                  <div key={license.id} className="flex items-center gap-2">
                    <Checkbox
                      id={license.slug}
                      checked={licensesQuery?.includes(license.slug) || false}
                      onCheckedChange={() => handleCheckLicenseChange(license)}
                      disabled={isLoading}
                    />

                    <Label htmlFor={license.slug}>{license.name}</Label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>{capitalizeFirstLetter(landingPageTypeMeta.label.plural)}</div>
            <div className="flex flex-col gap-1">
              {landingPageTypes?.map((lpType) => {
                return (
                  <div key={lpType.id} className="flex items-center gap-2">
                    <Checkbox
                      id={lpType.slug}
                      checked={lpTypesQuery?.includes(lpType.slug) || false}
                      onCheckedChange={() => handleCheckLpTypeChange(lpType)}
                      disabled={isLoading}
                    />

                    <Label htmlFor={lpType.slug}>{lpType.name}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
