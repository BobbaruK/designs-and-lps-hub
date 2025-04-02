import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { License } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  licenses?: License[] | null;
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

  const handleCheckLicenseChange = (license: License) => {
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
      <div>{capitalizeFirstLetter(licensesMeta.label.plural)}</div>
      <div className="flex flex-col gap-1">
        {licenses?.map((license) => {
          return (
            <div key={license.id} className="flex items-center gap-2">
              <Checkbox
                id={license.slug}
                checked={licensesQuery?.includes(license.slug) || false}
                onCheckedChange={() => handleCheckLicenseChange(license)}
                disabled={isLoading}
              />

              <Label htmlFor={license.slug}>{license.name}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
