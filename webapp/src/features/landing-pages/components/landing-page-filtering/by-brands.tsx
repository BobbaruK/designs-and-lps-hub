import { brandsMeta } from "@/constants/page-titles/brands";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { BrandMinimal } from "@/types/minimals";
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
  const [{ brand }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckBrandChange = (brandMinimal: BrandMinimal) => {
    if (brand?.includes(brandMinimal.slug)) {
      const filtered = brand.filter((feat) => feat !== brandMinimal.slug);

      setSearchParams({
        brand: filtered.length > 0 ? filtered : null,
        pageIndex: 0,
      });

      return;
    }

    setSearchParams((f) => ({
      brand: [...(f.brand || []), brandMinimal.slug],
      pageIndex: 0,
    }));
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={brands}
        paramsArr={brand}
        isLoading={isLoading}
        title={brandsMeta}
        handleSetParams={handleCheckBrandChange}
        showResetBtn={brand && brand?.length ? false : true}
        handleReset={() => setSearchParams({ brand: null })}
      />
    </div>
  );
};
