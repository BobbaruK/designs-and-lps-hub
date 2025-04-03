import { languagesMeta } from "@/constants/page-titles/languages";
import { cn } from "@/lib/utils";
import { LanguageMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
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
  const [languagesQuery, setLanguagesQuery] = useQueryState(
    "language",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const handleCheckLanguageChange = (language: LanguageMinimal) => {
    if (languagesQuery?.includes(language.iso_639_1)) {
      const filtered = languagesQuery.filter(
        (feat) => feat !== language.iso_639_1,
      );

      setLanguagesQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setLanguagesQuery((f) => [...(f || []), language.iso_639_1]);
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={languages}
        paramsArr={languagesQuery}
        isLoading={isLoading}
        title={languagesMeta}
        handleSetParams={handleCheckLanguageChange}
        showResetBtn={languagesQuery && languagesQuery?.length ? false : true}
        handleReset={() => setLanguagesQuery(null)}
      />
    </div>
  );
};
