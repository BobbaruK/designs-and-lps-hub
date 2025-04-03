import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { cn } from "@/lib/utils";
import { LandingPageTypeMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { FilterHeader } from "./filter-header";

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
      <FilterHeader
        title={landingPageTypeMeta.label.plural}
        isLoading={isLoading}
        showResetBtn={lpTypesQuery && lpTypesQuery?.length ? true : false}
        handleReset={() => setLpTypesQuery(null)}
      />

      <div className="flex flex-col gap-1">
        {landingPageTypes?.map((lpType) => {
          return (
            <div key={lpType.id} className="flex items-center gap-2">
              <Checkbox
                id={lpType.slug + "-" + lpType.id}
                checked={lpTypesQuery?.includes(lpType.slug) || false}
                onCheckedChange={() => handleCheckLpTypeChange(lpType)}
                disabled={isLoading}
              />

              <Label htmlFor={lpType.slug + "-" + lpType.id}>
                {lpType.name}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
