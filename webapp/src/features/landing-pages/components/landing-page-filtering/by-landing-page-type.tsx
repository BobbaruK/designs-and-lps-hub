import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { LandingPageTypeMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  landingPageTypes?: LandingPageTypeMinimal[] | null;
}

export const ByLandingPageType = ({
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
      <div>{capitalizeFirstLetter(landingPageTypeMeta.label.plural)}</div>
      <div className="flex flex-col gap-1">
        {landingPageTypes?.map((lpType) => {
          return (
            <div key={lpType.id} className="flex items-center gap-2">
              <Checkbox
                id={lpType.slug}
                checked={lpTypesQuery?.includes(lpType.slug) || false}
                onCheckedChange={() => handleCheckLpTypeChange(lpType)}
                disabled={isLoading}
              />

              <Label htmlFor={lpType.slug}>{lpType.name}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
