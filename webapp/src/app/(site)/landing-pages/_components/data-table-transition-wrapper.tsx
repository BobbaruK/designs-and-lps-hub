"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/features/landing-pages/components/landing-page-filtering";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import {
  BrandMinimal,
  FeatureMinimal,
  LandingPageTypeMinimal,
  LanguageMinimal,
  LicenseMinimal,
  RegistrationTypeMinimal,
  TopicMinimal,
} from "@/types/minimals";
import { ColumnDef } from "@tanstack/react-table";
import { useTransition } from "react";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
}

export const DataTableTransitionWrapper = <TData, TValue>({
  columns,
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
}: Props<TData, TValue>) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <>
      {isLoading && <p>loading</p>}
      <DataTable
        columns={columns}
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
        isLoading={isLoading}
        startTransition={startTransition}
      />
    </>
  );
};
