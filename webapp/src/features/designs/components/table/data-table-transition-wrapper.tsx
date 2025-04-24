"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/table/landing-pages/filtering";
import {
  columns,
  LandingPage,
} from "@/components/table/landing-pages/landing-page-columns";
import { LandingPageLegend } from "@/components/table/landing-pages/landing-page-legend";
import {
  BrandMinimal,
  FeatureMinimal,
  LandingPageTypeMinimal,
  LanguageMinimal,
  LicenseMinimal,
  RegistrationTypeMinimal,
  TopicMinimal,
} from "@/types/minimals";
import { useTransition } from "react";

interface Props {
  data: LandingPage[];
  filters: {
    features?: FeatureMinimal[] | null;
    topics?: TopicMinimal[] | null;
    licenses?: LicenseMinimal[] | null;
    landingPageTypes?: LandingPageTypeMinimal[] | null;
    registrationTypes?: RegistrationTypeMinimal[] | null;
    languages?: LanguageMinimal[] | null;
    brands?: BrandMinimal[] | null;
    showResetAll: boolean;
  };
  dataCount: number | null;
}

export const DataTableTransitionWrapper = ({
  // columns,
  data,
  filters: {
    showResetAll,
    brands,
    features,
    landingPageTypes,
    languages,
    licenses,
    registrationTypes,
    topics,
  },
  dataCount,
}: Props) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <>
      <DataTable
        columns={columns(isLoading, startTransition)}
        data={data}
        columnVisibilityObj={{
          slug: false,
          fxoroFooter: false,
          requester: false,
          createdAt: false,
          createdBy: false,
          updatedAt: false,
          updatedBy: false,
        }}
        legendItems={<LandingPageLegend />}
        advancedFiltering={
          <LandingPageFiltering
            features={features}
            topics={topics}
            licenses={licenses}
            landingPageTypes={landingPageTypes}
            registrationTypes={registrationTypes}
            languages={languages}
            brands={brands}
            showResetAll={showResetAll}
            isLoading={isLoading}
            startTransition={startTransition}
          />
        }
        dataCount={dataCount}
        twSkeletonHeightCell="h-[127px]"
        isLoading={isLoading}
        startTransition={startTransition}
      />
    </>
  );
};
