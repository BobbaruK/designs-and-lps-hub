"use client";

import { CustomButton } from "@/components/custom-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { SearchParamFOperator } from "@/types/landing-pages";
import {
  BrandMinimal,
  FeatureMinimal,
  LandingPageTypeMinimal,
  LanguageMinimal,
  LicenseMinimal,
  RegistrationTypeMinimal,
  TopicMinimal,
} from "@/types/minimals";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RiResetLeftLine } from "react-icons/ri";
import { ByBrands } from "./by-brands";
import { ByFeatures } from "./by-features";
import { ByLandingPageTypes } from "./by-landing-page-types";
import { ByLanguages } from "./by-languages";
import { ByLicenses } from "./by-licenses";
import { ByRegistrationTypes } from "./by-registration-types";
import { ByTopics } from "./by-topics";
import { Operator } from "./operator";

interface Props {
  features?: FeatureMinimal[] | null;
  topics?: TopicMinimal[] | null;
  licenses?: LicenseMinimal[] | null;
  landingPageTypes?: LandingPageTypeMinimal[] | null;
  registrationTypes?: RegistrationTypeMinimal[] | null;
  languages?: LanguageMinimal[] | null;
  brands?: BrandMinimal[] | null;
  operator?: SearchParamFOperator;
  showResetAll: boolean;
}

export const LandingPageFiltering = ({
  features,
  topics,
  licenses,
  landingPageTypes,
  registrationTypes,
  languages,
  brands,
  operator,
  showResetAll,
}: Props) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="pt-0">Advance filtering</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-10">
            <Operator
              isLoading={isLoading}
              startTransition={startTransition}
              operator={operator}
            />

            {showResetAll && (
              <CustomButton
                buttonLabel={`Reset all`}
                variant={"outline"}
                size={"sm"}
                icon={RiResetLeftLine}
                iconPlacement="left"
                disabled={isLoading}
                onClick={() =>
                  startTransition(() => router.push(landingPagesMeta.href))
                }
              />
            )}
          </div>
          <div className="flex flex-wrap justify-between gap-12">
            <ByFeatures
              isLoading={isLoading}
              startTransition={startTransition}
              features={features}
            />
            <ByBrands
              isLoading={isLoading}
              startTransition={startTransition}
              brands={brands}
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
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
