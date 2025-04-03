import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { cn } from "@/lib/utils";
import { LandingPageTypeMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { FilterBody } from "./filter-body";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  landingPageTypes?: LandingPageTypeMinimal[] | null;
}

export const ByLandingPageTypes = ({
  isLoading,
  startTransition,
  landingPageTypes,
  ...restProps
}: Props) => {
  const [lpTypesQuery, setLpTypesQuery] = useQueryState(
    "lpType",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const handleCheckLpTypeChange = (lpType: LandingPageTypeMinimal) => {
    if (lpTypesQuery?.includes(lpType.slug)) {
      const filtered = lpTypesQuery.filter((feat) => feat !== lpType.slug);

      setLpTypesQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setLpTypesQuery((f) => [...(f || []), lpType.slug]);
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={landingPageTypes}
        paramsArr={lpTypesQuery}
        isLoading={isLoading}
        title={landingPageTypeMeta}
        handleSetParams={handleCheckLpTypeChange}
        handleReset={() => setLpTypesQuery(null)}
        showResetBtn={lpTypesQuery && lpTypesQuery.length ? false : true}
      />
    </div>
  );
};
