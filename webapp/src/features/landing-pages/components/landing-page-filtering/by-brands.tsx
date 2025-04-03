import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { brandsMeta } from "@/constants/page-titles/brands";
import { cn } from "@/lib/utils";
import { BrandMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { FilterHeader } from "./filter-header";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  brands?: BrandMinimal[] | null;
}

export const ByBrands = ({
  isLoading,
  startTransition,
  brands,
  ...restProps
}: Props) => {
  const [brandsQuery, setBrandsQuery] = useQueryState(
    "brand",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const handleCheckBrandChange = (brand: BrandMinimal) => {
    if (brandsQuery?.includes(brand.slug)) {
      const filtered = brandsQuery.filter((feat) => feat !== brand.slug);

      setBrandsQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setBrandsQuery((f) => [...(f || []), brand.slug]);
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterHeader
        title={brandsMeta.label.plural}
        isLoading={isLoading}
        showResetBtn={brandsQuery && brandsQuery?.length ? true : false}
        handleReset={() => setBrandsQuery(null)}
      />

      <div className="flex flex-col gap-1">
        {brands?.map((brand) => {
          return (
            <div key={brand.id} className="flex items-center gap-2">
              <Checkbox
                id={brand.slug}
                checked={brandsQuery?.includes(brand.slug) || false}
                onCheckedChange={() => handleCheckBrandChange(brand)}
                disabled={isLoading}
              />

              <Label htmlFor={brand.slug}>{brand.name}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
