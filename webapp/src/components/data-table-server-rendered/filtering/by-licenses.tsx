import { licensesMeta } from "@/constants/page-titles/licenses";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { LicenseMinimal } from "@/types/minimals";
import { TransitionStartFunction } from "react";
import { FilterBody } from "./filter-body";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  licenses?: LicenseMinimal[] | null;
}

export const ByLicenses = ({
  isLoading,
  startTransition,
  licenses,
  ...restProps
}: Props) => {
  const [{ license }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckLicenseChange = (licenseMinimal: LicenseMinimal) => {
    if (license?.includes(licenseMinimal.slug)) {
      const filtered = license.filter((feat) => feat !== licenseMinimal.slug);

      setSearchParams({
        license: filtered.length > 0 ? filtered : null,
        pageIndex: 0,
      });

      return;
    }

    setSearchParams((f) => ({
      license: [...(f.license || []), licenseMinimal.slug],
      pageIndex: 0,
    }));
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={licenses}
        paramsArr={license}
        isLoading={isLoading}
        title={licensesMeta}
        handleSetParams={handleCheckLicenseChange}
        showResetBtn={license && license?.length ? false : true}
        handleReset={() => setSearchParams({ license: null })}
      />
    </div>
  );
};
