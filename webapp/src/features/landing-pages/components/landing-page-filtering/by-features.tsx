import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { FeatureMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";

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
      <div>{capitalizeFirstLetter(featuresTypeMeta.label.plural)}</div>
      <div className="flex flex-col gap-1">
        {features?.map((feature) => {
          return (
            <div key={feature.id} className="flex items-center gap-2">
              <Checkbox
                id={feature.slug}
                checked={featuresQuery?.includes(feature.slug) || false}
                onCheckedChange={() => handleCheckFeatureChange(feature)}
                disabled={isLoading}
              />

              <Label htmlFor={feature.slug}>{feature.name}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
