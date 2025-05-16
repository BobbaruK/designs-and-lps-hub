"use client";

import { CustomButton } from "@/components/custom-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "@/hooks/use-search-params";
import {
  BrandMinimal,
  FeatureMinimal,
  LandingPageTypeMinimal,
  LanguageMinimal,
  LicenseMinimal,
  RegistrationTypeMinimal,
  TopicMinimal,
} from "@/types/minimals";
import { dl_brand_resource_type } from "@prisma/client";
import { TransitionStartFunction } from "react";
import { RiResetLeftLine } from "react-icons/ri";
import { ByBrands } from "./by-brands";
import { ByDate } from "./by-date";
import { ByFeatures } from "./by-features";
import { ByHasWhatsapp } from "./by-has-whatsapp";
import { ByIsArts } from "./by-is-arts";
import { ByIsHome } from "./by-is-home";
import { ByIsReadyForTraffic } from "./by-is-ready-for-traffic";
import { ByIsUnderMaintenance } from "./by-is-under-maintenance";
import { ByLandingPageTypes } from "./by-landing-page-types";
import { ByLanguages } from "./by-languages";
import { ByLicenses } from "./by-licenses";
import { ByRegistrationTypes } from "./by-registration-types";
import { ByTopics } from "./by-topics";
import { ByType } from "./by-type";
import { Operator } from "./operator";

interface Props {
  features?: FeatureMinimal[] | null;
  topics?: TopicMinimal[] | null;
  licenses?: LicenseMinimal[] | null;
  landingPageTypes?: LandingPageTypeMinimal[] | null;
  registrationTypes?: RegistrationTypeMinimal[] | null;
  languages?: LanguageMinimal[] | null;
  brands?: BrandMinimal[] | null;
  showResetAll: boolean;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  isLP?: boolean;
  hasOperator?: boolean;
  types?: dl_brand_resource_type[];
}

export const LandingPageFiltering = ({
  features,
  topics,
  licenses,
  landingPageTypes,
  registrationTypes,
  languages,
  brands,
  showResetAll,
  isLoading,
  startTransition,
  isLP = false,
  hasOperator = false,
  types,
}: Props) => {
  const [{}, setSearchParams] = useSearchParams(startTransition);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="pt-0">Advance filtering</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          {(hasOperator || showResetAll) && (
            <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-10">
              {hasOperator && (
                <Operator
                  isLoading={isLoading}
                  startTransition={startTransition}
                />
              )}

              {showResetAll && (
                <CustomButton
                  buttonLabel={`Reset all filters`}
                  variant={"outline"}
                  size={"sm"}
                  icon={RiResetLeftLine}
                  iconPlacement="left"
                  disabled={isLoading}
                  onClick={() =>
                    setSearchParams({
                      feature: null,
                      brand: null,
                      registrationType: null,
                      language: null,
                      topic: null,
                      license: null,
                      lpType: null,
                      isARTS: null,
                      isReadyForTraffic: null,
                      whatsapp: null,
                      isHome: null,
                      isUnderMaintenance: null,
                      operator: null,
                      pageIndex: 0,
                      type: null,
                      from: null,
                      to: null,
                    })
                  }
                />
              )}
            </div>
          )}
          <div className="flex flex-wrap justify-between gap-6">
            {features && (
              <ByFeatures
                isLoading={isLoading}
                startTransition={startTransition}
                features={features}
                className="grow"
              />
            )}
            {brands && (
              <ByBrands
                isLoading={isLoading}
                startTransition={startTransition}
                brands={brands}
                className="grow"
              />
            )}
            {registrationTypes && (
              <ByRegistrationTypes
                isLoading={isLoading}
                startTransition={startTransition}
                registrationTypes={registrationTypes}
                className="grow"
              />
            )}
            {languages && (
              <ByLanguages
                isLoading={isLoading}
                startTransition={startTransition}
                languages={languages}
                className="grow"
              />
            )}
            {topics && (
              <ByTopics
                isLoading={isLoading}
                startTransition={startTransition}
                topics={topics}
                className="grow"
              />
            )}
            {licenses && (
              <ByLicenses
                isLoading={isLoading}
                startTransition={startTransition}
                licenses={licenses}
                className="grow"
              />
            )}
            {landingPageTypes && (
              <ByLandingPageTypes
                isLoading={isLoading}
                startTransition={startTransition}
                landingPageTypes={landingPageTypes}
                className="grow"
              />
            )}
            {types && (
              <ByType
                isLoading={isLoading}
                startTransition={startTransition}
                types={types}
                className="grow"
              />
            )}
            <Card className="flex grow flex-col rounded-md shadow-md">
              {isLP && (
                <>
                  <ByIsArts
                    isLoading={isLoading}
                    startTransition={startTransition}
                  />
                  <Separator />
                  <ByIsHome
                    isLoading={isLoading}
                    startTransition={startTransition}
                  />
                  <Separator />
                  <ByHasWhatsapp
                    isLoading={isLoading}
                    startTransition={startTransition}
                  />
                  <Separator />
                  <ByIsReadyForTraffic
                    isLoading={isLoading}
                    startTransition={startTransition}
                  />
                  <Separator />
                  <ByIsUnderMaintenance
                    isLoading={isLoading}
                    startTransition={startTransition}
                  />
                  <Separator />
                </>
              )}
              <ByDate isLoading={isLoading} startTransition={startTransition} />
            </Card>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
