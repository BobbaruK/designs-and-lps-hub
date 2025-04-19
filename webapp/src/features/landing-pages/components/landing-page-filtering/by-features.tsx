import { featuresTypeMeta } from "@/constants/page-titles/features";
import { cn } from "@/lib/utils";
import { FeatureMinimal } from "@/types/minimals";
import { TransitionStartFunction } from "react";

import { useSearchParams } from "@/hooks/use-search-params";
import { FilterBody } from "./filter-body";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  features?: FeatureMinimal[] | null;
}

export const ByFeatures = ({
  isLoading,
  startTransition,
  features,
  ...restProps
}: Props) => {
  const [{ feature }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckFeatureChange = (featureMinimal: FeatureMinimal) => {
    if (feature?.includes(featureMinimal.slug)) {
      const filtered = feature.filter((feat) => feat !== featureMinimal.slug);

      setSearchParams({ feature: filtered.length > 0 ? filtered : null });

      return;
    }

    setSearchParams((f) => ({
      feature: [...(f.feature || []), featureMinimal.slug],
    }));
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={features}
        paramsArr={feature}
        isLoading={isLoading}
        title={featuresTypeMeta}
        handleSetParams={handleCheckFeatureChange}
        showResetBtn={feature && feature?.length ? false : true}
        handleReset={() => setSearchParams({ feature: null })}
      />
    </div>
  );
};
