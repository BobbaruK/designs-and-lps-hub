import { featuresTypeMeta } from "@/constants/page-titles/features";
import { cn } from "@/lib/utils";
import { FeatureMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";

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
  const [featuresQuery, setFeaturesQuery] = useQueryState(
    "feature",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const handleCheckFeatureChange = (feature: FeatureMinimal) => {
    if (featuresQuery?.includes(feature.slug)) {
      const filtered = featuresQuery.filter((feat) => feat !== feature.slug);

      setFeaturesQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setFeaturesQuery((f) => [...(f || []), feature.slug]);
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={features}
        paramsArr={featuresQuery}
        isLoading={isLoading}
        title={featuresTypeMeta}
        handleSetParams={handleCheckFeatureChange}
        showResetBtn={featuresQuery && featuresQuery?.length ? false : true}
        handleReset={() => setFeaturesQuery(null)}
      />
    </div>
  );
};
