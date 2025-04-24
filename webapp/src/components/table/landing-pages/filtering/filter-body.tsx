import { CustomButton } from "@/components/custom-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PageTitle } from "@/types/page-title";
import { RiResetLeftLine } from "react-icons/ri";

interface Props<
  T extends {
    id: string;
    slug?: string;
    name?: string;
    iso_639_1?: string;
    englishName?: string;
  },
> {
  title: PageTitle;
  resources?: T[] | null;
  paramsArr: string[] | null;
  isLoading: boolean;
  handleSetParams: (e: T) => void;
  showResetBtn: boolean;
  handleReset: () => Promise<URLSearchParams>;
}

export const FilterBody = <
  T extends {
    id: string;
    slug?: string;
    name?: string;
    iso_639_1?: string;
    englishName?: string;
  },
>({
  title,
  resources,
  paramsArr,
  isLoading,
  handleSetParams,
  showResetBtn,
  handleReset,
}: Props<T>) => {
  return (
    <Command className="w-full border border-muted shadow-md">
      {" "}
      <CustomButton
        buttonLabel={`Reset ${title.label.plural.toLowerCase()} filters`}
        variant={"outline"}
        icon={RiResetLeftLine}
        size={"sm"}
        iconPlacement="left"
        onClick={handleReset}
        className="mx-auto my-1 w-[calc(100%_-_14px)]"
        disabled={isLoading || showResetBtn}
        hideLabelOnMobile={false}
      />
      <CommandInput
        placeholder={`Search for ${title.label.plural.toLowerCase()}...`}
      />
      <CommandList>
        <CommandEmpty>
          No {title.label.singular.toLowerCase()} found.
        </CommandEmpty>
        <CommandGroup heading={capitalizeFirstLetter(title.label.plural)}>
          {resources?.map((resource) => {
            return (
              <CommandItem
                key={(resource.slug || resource.iso_639_1) + "-" + resource.id}
              >
                <Checkbox
                  id={(resource.slug || resource.iso_639_1) + "-" + resource.id}
                  checked={
                    paramsArr?.includes(
                      resource.slug || resource.iso_639_1 || "",
                    ) || false
                  }
                  onCheckedChange={() => handleSetParams(resource)}
                  disabled={isLoading}
                />
                <Label
                  htmlFor={
                    (resource.slug || resource.iso_639_1) + "-" + resource.id
                  }
                >
                  {resource.name || resource.englishName}
                </Label>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
