"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LP_SearchParams } from "@/types/landing-pages";
import {
  FeatureMinimal,
  LandingPageTypeMinimal,
  LanguageMinimal,
  LicenseMinimal,
  RegistrationTypeMinimal,
  TopicMinimal,
} from "@/types/minimals";
import { useTransition } from "react";
import { ByFeatures } from "./by-features";
import { ByLandingPageTypes } from "./by-landing-page-types";
import { ByLicenses } from "./by-licenses";
import { ByRegistrationTypes } from "./by-registration-types";
import { ByTopics } from "./by-topics";
import { ByLanguages } from "./by-languages";

interface Props {
  features?: FeatureMinimal[] | null;
  topics?: TopicMinimal[] | null;
  licenses?: LicenseMinimal[] | null;
  landingPageTypes?: LandingPageTypeMinimal[] | null;
  registrationTypes?: RegistrationTypeMinimal[] | null;
  languages: LanguageMinimal[] | null;
  searchParams?: LP_SearchParams;
}

export const LandingPageFiltering = ({
  features,
  topics,
  licenses,
  landingPageTypes,
  registrationTypes,
  languages,
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
          <ByLandingPageTypes
            isLoading={isLoading}
            startTransition={startTransition}
            landingPageTypes={landingPageTypes}
          />
          <ByRegistrationTypes
            isLoading={isLoading}
            startTransition={startTransition}
            registrationTypes={registrationTypes}
          />
          <ByLanguages
            isLoading={isLoading}
            startTransition={startTransition}
            languages={languages}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
