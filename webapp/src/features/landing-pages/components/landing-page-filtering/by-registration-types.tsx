import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { cn } from "@/lib/utils";
import { RegistrationTypeMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { FilterBody } from "./filter-body";

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
      <FilterBody
        resources={registrationTypes}
        paramsArr={registrationTypesQuery}
        isLoading={isLoading}
        title={registrationTypesMeta}
        handleSetParams={handleCheckRegistrationTypeChange}
        showResetBtn={
          registrationTypesQuery && registrationTypesQuery?.length
            ? false
            : true
        }
        handleReset={() => setRegistrationTypesQuery(null)}
      />
    </div>
  );
};
