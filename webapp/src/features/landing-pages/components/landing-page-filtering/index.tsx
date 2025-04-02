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
import {
  Feature,
  LandingPageTypeMinimal,
  LicenseMinimal,
  RegistrationTypeMinimal,
  TopicMinimal,
} from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useTransition } from "react";
import { ByFeatures } from "./by-features";
import { ByTopics } from "./by-topics";
import { ByLicenses } from "./by-licenses";
import { ByLandingPageType } from "./by-landing-page-type";
import { ByRegistrationTypes } from "./by-registration-types";

interface Props {
  features?: Feature[] | null;
  topics?: TopicMinimal[] | null;
  licenses?: LicenseMinimal[] | null;
  landingPageTypes?: LandingPageTypeMinimal[] | null;
  registrationTypes?: RegistrationTypeMinimal[] | null;
  searchParams?: LP_SearchParams;
}

export const LandingPageFiltering = ({
  features,
  topics,
  licenses,
  landingPageTypes,
  registrationTypes,
  // searchParams
}: Props) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="pt-0">Advance filtering</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-12">
          <ByFeatures
            isLoading={isLoading}
            startTransition={startTransition}
            features={features}
          />
          <ByTopics
            isLoading={isLoading}
            startTransition={startTransition}
            topics={topics}
          />
          <ByLicenses
            isLoading={isLoading}
            startTransition={startTransition}
            licenses={licenses}
          />
          <ByLandingPageType
            isLoading={isLoading}
            startTransition={startTransition}
            landingPageTypes={landingPageTypes}
          />
          <ByRegistrationTypes
            isLoading={isLoading}
            startTransition={startTransition}
            registrationTypes={registrationTypes}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
