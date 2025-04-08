import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MultiSelect } from "@/components/ui/expansions/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Resource } from "@/types/filtering/resource";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect } from "react";
// import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";

// const frameworksList = [
//   { value: "react", label: "React", icon: Turtle },
//   { value: "angular", label: "Angular", icon: Cat },
//   { value: "vue", label: "Vue", icon: Dog },
//   { value: "svelte", label: "Svelte", icon: Rabbit },
//   { value: "ember", label: "Ember", icon: Fish },
// ];

type ArrTest =
  // array
  | "has any of"
  | "has none of"
  | "is empty"
  | "is not empty"
  // text
  | "contains"
  | "does not contain"
  | "is"
  | "is not"
  | "is empty"
  | "is not empty"
  // range
  | "is less than"
  | "is less than or equal to"
  | "is greater than"
  | "is greater than or equal to"
  | "is between"
  // date
  | "is before"
  | "is after"
  | "is on or before"
  | "is on or after"
  | "is between"
  | "is relative to today";

interface Props {
  data: Resource[];
  defaultValue?: string;
}

export const Fields = ({ defaultValue, data }: Props) => {
  const [fieldsOpen, setFieldsOpen] = React.useState(false);
  const [fieldsValue, setFieldsValue] = React.useState(
    defaultValue?.replaceAll(" ", "-").toLowerCase(),
  );

  // const [optionsOpen, setOptionsOpen] = React.useState(false);
  // const [optionsValue, setOptionsValue] = React.useState<string | undefined>(
  //   undefined,
  // );

  const [operatorValue, setOperatorValue] = React.useState("");

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  useEffect(() => {
    setSelectedOptions([]);
    return () => {};
  }, [fieldsValue]);

  const resource = data.find(
    (resource) =>
      resource.name.replaceAll(" ", "-").toLowerCase() === fieldsValue,
  );

  const operatorList = (): ArrTest[] => {
    switch (resource?.variant) {
      case "multiSelect":
        return ["has any of", "has none of", "is empty", "is not empty"];

      case "text":
        return [
          "contains",
          "does not contain",
          "is",
          "is not",
          "is empty",
          "is not empty",
        ];

      case "range":
        return [
          "is",
          "is not",
          "is less than",
          "is less than or equal to",
          "is greater than",
          "is greater than or equal to",
          "is between",
          "is empty",
          "is not empty",
        ];

      case "dateRange":
        return [
          "is",
          "is not",
          "is before",
          "is after",
          "is on or after",
          "is on or after",
          "is between",
          "is relative to today",
          "is empty",
          "is not empty",
        ];

      default:
        return ["has any of", "has none of", "is empty", "is not empty"];
    }
  };
  const operators = operatorList();

  console.log({ selectedOptions });
  return (
    <div className="flex items-center gap-2">
      <Popover open={fieldsOpen} onOpenChange={setFieldsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={fieldsOpen}
            className="w-[200px] justify-between"
          >
            {fieldsValue
              ? data.find(
                  (resource) =>
                    resource.name.replaceAll(" ", "-").toLowerCase() ===
                    fieldsValue,
                )?.name
              : "Select fields..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search fields..." />
            <CommandList>
              <CommandEmpty>No fields found.</CommandEmpty>
              <CommandGroup>
                {data.map((resource) => (
                  <CommandItem
                    key={resource.name.replaceAll(" ", "-").toLowerCase()}
                    value={resource.name.replaceAll(" ", "-").toLowerCase()}
                    onSelect={(currentValue) => {
                      setFieldsValue(
                        currentValue === fieldsValue ? "" : currentValue,
                      );
                      setFieldsOpen(false);
                      // setOptionsValue(undefined);
                      // setSelectedOptions((prev) => (prev = []));
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        fieldsValue ===
                          resource.name.replaceAll(" ", "-").toLowerCase()
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {resource.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Select
        onValueChange={(e) => {
          setOperatorValue(e);
          // setOptionsValue(undefined);
        }}
        defaultValue={operatorValue}
      >
        <SelectTrigger className="h-10 w-[180px]">
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          {operators?.map((operator) => (
            <SelectItem
              key={operator.toLowerCase().replaceAll(" ", "-")}
              value={operator}
            >
              {operator}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* <Popover open={optionsOpen} onOpenChange={setOptionsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={optionsOpen}
            className="w-[200px] justify-between"
            disabled={
              operatorValue === "is empty" || operatorValue === "is not empty"
            }
          >
            {optionsValue
              ? resource?.data?.find(
                  (resource) =>
                    resource.name.replaceAll(" ", "-").toLowerCase() ===
                    optionsValue,
                )?.name
              : "Select option..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search option..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {resource?.data?.map((resource) => (
                  <CommandItem
                    key={resource.name.replaceAll(" ", "-").toLowerCase()}
                    value={resource.name.replaceAll(" ", "-").toLowerCase()}
                    onSelect={(currentValue) => {
                      setOptionsValue(
                        currentValue === optionsValue ? "" : currentValue,
                      );
                      setOptionsOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        optionsValue ===
                          resource.name.replaceAll(" ", "-").toLowerCase()
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {resource.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover> */}

      {selectedOptions}

      <MultiSelect
        options={
          resource?.data?.map((resource) => ({
            label: resource.name,
            value: resource.slug,
          })) || []
        }
        onValueChange={setSelectedOptions}
        defaultValue={selectedOptions}
        variant="default"
        maxCount={3}
      />
    </div>
  );
};
