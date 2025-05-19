"use client";

import { DataTable } from "@/components/data-table-server-rendered";
import { LandingPageFiltering } from "@/components/data-table-server-rendered/filtering";
import { LandingPageLegend } from "@/components/table/landing-pages/landing-page-legend";
import { ACTION_MESSAGES } from "@/constants/messages";
import { useSearchParams } from "@/hooks/use-search-params";
import { DB_LandingPage, Update_LPs } from "@/types/db/landing-pages";
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
import { toast } from "sonner";
import { deleteManyLandingPages } from "../../actions/delete-landing-page";
import { editManyLandingPages } from "../../actions/edit-landing-page";
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
  dataSelected?: DB_LandingPage[];
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
  dataSelected,
}: Props) => {
  const [isLoading, startTransition] = useTransition();
  const [{ selected }, setSearchParams] = useSearchParams(startTransition);

  const handleDelete = () => {
    deleteManyLandingPages(selected || [])
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          setSearchParams({
            selected: null,
          });
        }
      })
      .catch(() => toast.error(ACTION_MESSAGES().WENT_WRONG));
  };

  const handleUpdate = async (values: Update_LPs) => {
    startTransition(() => {
      editManyLandingPages(values, selected || [])
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            // setSearchParams({
            //   selected: null,
            // });
          }
        })
        .catch(() => toast.error(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  return (
    <>
      <DataTable
        columns={columns({
          isLoading,
          startTransition,
          visibleLps: data,
        })}
        data={data}
        dataCount={dataCount}
        dataSelected={{
          type: "landing-page",
          data: dataSelected || null,
        }}
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
        twSkeletonHeightCell="h-[129px]"
        isLoading={isLoading}
        startTransition={startTransition}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        showSearchSwitch
      />
    </>
  );
};
