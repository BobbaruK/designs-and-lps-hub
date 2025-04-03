import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { languagesMeta } from "@/constants/page-titles/languages";
import { cn } from "@/lib/utils";
import { LanguageMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { FilterHeader } from "./filter-header";

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
      <FilterHeader
        title={languagesMeta.label.plural}
        isLoading={isLoading}
        showResetBtn={languagesQuery && languagesQuery?.length ? true : false}
        handleReset={() => setLanguagesQuery(null)}
      />

      <div className="flex flex-col gap-1">
        {languages?.map((language) => {
          return (
            <div key={language.id} className="flex items-center gap-2">
              <Checkbox
                id={language.iso_639_1}
                checked={languagesQuery?.includes(language.iso_639_1) || false}
                onCheckedChange={() => handleCheckLanguageChange(language)}
                disabled={isLoading}
              />

              <Label htmlFor={language.iso_639_1}>{language.englishName}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
