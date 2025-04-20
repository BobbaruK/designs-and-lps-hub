import { languagesMeta } from "@/constants/page-titles/languages";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { LanguageMinimal } from "@/types/minimals";
import { TransitionStartFunction } from "react";
import { FilterBody } from "./filter-body";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  languages?: LanguageMinimal[] | null;
}

export const ByLanguages = ({
  isLoading,
  startTransition,
  languages,
  ...restProps
}: Props) => {
  const [{ language }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckLanguageChange = (languageMinimal: LanguageMinimal) => {
    if (language?.includes(languageMinimal.iso_639_1)) {
      const filtered = language.filter(
        (feat) => feat !== languageMinimal.iso_639_1,
      );

      setSearchParams({
        language: filtered.length > 0 ? filtered : null,
        pageIndex: 0,
      });

      return;
    }
    setSearchParams((f) => ({
      language: [...(f.language || []), languageMinimal.iso_639_1],
      pageIndex: 0,
    }));
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={languages}
        paramsArr={language}
        isLoading={isLoading}
        title={languagesMeta}
        handleSetParams={handleCheckLanguageChange}
        showResetBtn={language && language?.length ? false : true}
        handleReset={() => setSearchParams({ language: null })}
      />
    </div>
  );
};
