import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { LandingPageTypeMinimal } from "@/types/minimals";
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
  const [{ lpType }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckLpTypeChange = (lpTypeMinimal: LandingPageTypeMinimal) => {
    if (lpType?.includes(lpTypeMinimal.slug)) {
      const filtered = lpType.filter((feat) => feat !== lpTypeMinimal.slug);

      setSearchParams({
        lpType: filtered.length > 0 ? filtered : null,
        pageIndex: 0,
      });

      return;
    }

    setSearchParams((f) => ({
      lpType: [...(f.lpType || []), lpTypeMinimal.slug],
      pageIndex: 0,
    }));
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={landingPageTypes}
        paramsArr={lpType}
        isLoading={isLoading}
        title={landingPageTypeMeta}
        handleSetParams={handleCheckLpTypeChange}
        handleReset={() => setSearchParams({ lpType: null })}
        showResetBtn={lpType && lpType.length ? false : true}
      />
    </div>
  );
};
