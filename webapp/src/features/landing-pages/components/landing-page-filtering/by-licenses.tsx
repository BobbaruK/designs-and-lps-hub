import { licensesMeta } from "@/constants/page-titles/licenses";
import { cn } from "@/lib/utils";
import { LicenseMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
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
  const [licensesQuery, setLicensesQuery] = useQueryState(
    "license",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const handleCheckLicenseChange = (license: LicenseMinimal) => {
    if (licensesQuery?.includes(license.slug)) {
      const filtered = licensesQuery.filter((feat) => feat !== license.slug);

      setLicensesQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setLicensesQuery((f) => [...(f || []), license.slug]);
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={licenses}
        paramsArr={licensesQuery}
        isLoading={isLoading}
        title={licensesMeta}
        handleSetParams={handleCheckLicenseChange}
        showResetBtn={licensesQuery && licensesQuery?.length ? false : true}
        handleReset={() => setLicensesQuery(null)}
      />
    </div>
  );
};
