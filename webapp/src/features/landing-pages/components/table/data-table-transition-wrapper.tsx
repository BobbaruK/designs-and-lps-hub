"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/data-table-server-rendered/filtering";
import { LandingPageLegend } from "@/components/table/landing-pages/landing-page-legend";
import { DB_LandingPage } from "@/types/db/landing-pages";
import {
  BrandMinimal,
  FeatureMinimal,
  LandingPageTypeMinimal,
  LanguageMinimal,
  LicenseMinimal,
  RegistrationTypeMinimal,
  TopicMinimal,
} from "@/types/minimals";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { columns } from "./landing-page-columns";

interface Props {
  data: DB_LandingPage[];
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
  columnVisibilityObj?: VisibilityState;
}

export const DataTableTransitionWrapper = ({
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
  columnVisibilityObj,
}: Props) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <>
      <DataTable
        columns={columns(isLoading, startTransition)}
        data={data}
        columnVisibilityObj={columnVisibilityObj}
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
            isLP
            hasOperator
          />
        }
        dataCount={dataCount}
        twSkeletonHeightCell="h-[129px]"
        isLoading={isLoading}
        startTransition={startTransition}
        showSearchSwitch
      />
    </>
  );
};
