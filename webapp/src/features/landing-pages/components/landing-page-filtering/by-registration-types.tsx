import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { RegistrationTypeMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  registrationTypes?: RegistrationTypeMinimal[] | null;
}

export const ByRegistrationTypes = ({
  isLoading,
  startTransition,
  registrationTypes,
  ...restProps
}: Props) => {
  const [registrationTypesQuery, setRegistrationTypesQuery] = useQueryState(
    "registrationType",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const handleCheckRegistrationTypeChange = (
    registrationType: RegistrationTypeMinimal,
  ) => {
    if (registrationTypesQuery?.includes(registrationType.slug)) {
      const filtered = registrationTypesQuery.filter(
        (feat) => feat !== registrationType.slug,
      );

      setRegistrationTypesQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setRegistrationTypesQuery((f) => [...(f || []), registrationType.slug]);
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <div>{capitalizeFirstLetter(registrationTypesMeta.label.plural)}</div>
      <div className="flex flex-col gap-1">
        {registrationTypes?.map((registrationType) => {
          return (
            <div key={registrationType.id} className="flex items-center gap-2">
              <Checkbox
                id={registrationType.slug + "-" + registrationType.id}
                checked={
                  registrationTypesQuery?.includes(registrationType.slug) ||
                  false
                }
                onCheckedChange={() =>
                  handleCheckRegistrationTypeChange(registrationType)
                }
                disabled={isLoading}
              />

              <Label
                htmlFor={registrationType.slug + "-" + registrationType.id}
              >
                {registrationType.name}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
