import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { RegistrationTypeMinimal } from "@/types/minimals";
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
  const [{ registrationType }, setSearchParams] =
    useSearchParams(startTransition);

  const handleCheckRegistrationTypeChange = (
    registrationTypeMinimal: RegistrationTypeMinimal,
  ) => {
    if (registrationType?.includes(registrationTypeMinimal.slug)) {
      const filtered = registrationType.filter(
        (feat) => feat !== registrationTypeMinimal.slug,
      );

      setSearchParams({
        registrationType: filtered.length > 0 ? filtered : null,
        pageIndex: 0,
      });

      return;
    }

    setSearchParams((f) => ({
      registrationType: [
        ...(f.registrationType || []),
        registrationTypeMinimal.slug,
      ],
      pageIndex: 0,
    }));
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2`, restProps.className)}
    >
      <FilterBody
        resources={registrationTypes}
        paramsArr={registrationType}
        isLoading={isLoading}
        title={registrationTypesMeta}
        handleSetParams={handleCheckRegistrationTypeChange}
        showResetBtn={
          registrationType && registrationType?.length ? false : true
        }
        handleReset={() => setSearchParams({ registrationType: null })}
      />
    </div>
  );
};
