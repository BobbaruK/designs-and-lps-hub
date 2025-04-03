import { brandsMeta } from "@/constants/page-titles/brands";
import { cn } from "@/lib/utils";
import { BrandMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { FilterBody } from "./filter-body";

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
      <FilterBody
        resources={brands}
        paramsArr={brandsQuery}
        isLoading={isLoading}
        title={brandsMeta}
        handleSetParams={handleCheckBrandChange}
        showResetBtn={brandsQuery && brandsQuery?.length ? false : true}
        handleReset={() => setBrandsQuery(null)}
      />
    </div>
  );
};
