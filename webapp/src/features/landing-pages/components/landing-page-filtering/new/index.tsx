"use client";

import { CustomButton } from "@/components/custom-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Resource } from "@/types/filtering/resource";
import { parseAsString, useQueryState } from "nuqs";
import { useTransition } from "react";
import { FaFilter } from "react-icons/fa6";
import { Fields } from "./fields";

/**
 * variant
 */

interface Props {
  resources: Resource[];
}

export const LandingPageFiltering = ({ resources }: Props) => {
  // const [filters, setFilters] = useState([]);
  const [isLoading, startTransition] = useTransition();
  const [filtersQuery, setFiltersQuery] = useQueryState(
    "filters",
    parseAsString.withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const filtersPRE = JSON.parse(filtersQuery || "[]");

  console.log({ filters: filtersPRE });
  console.log({ resources });

  // const filtersTest: {
  //   id: string;
  //   value: string | string[];
  //   operator: string;
  // }[] = [];

  return (
    <div>
      <div>
        <Fields
          data={resources}
          // defaultValue={featuresTypeMeta.label.singular}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <CustomButton
            buttonLabel={`Filters`}
            variant={"outline"}
            size={"sm"}
            icon={FaFilter}
            iconPlacement="left"
          />
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-md font-bold">No filters applied</h2>
              <p className="text-sm">Add filters to refine your rows.</p>
            </div>
            <div>filters here</div>
            <div className="flex items-center gap-4">
              <CustomButton
                buttonLabel={`Add filter`}
                variant={"default"}
                size={"sm"}
                disabled={isLoading}
                onClick={() => {
                  setFiltersQuery(
                    '[{"id":"title","value":"asd","variant":"text","operator":"iLike","filterId":"Lhhf3Obr"},{"id":"status","value":["todo","in-progress"],"variant":"multiSelect","operator":"inArray","filterId":"5kF8Utoz"},{"id":"priority","value":["low","medium"],"variant":"multiSelect","operator":"inArray","filterId":"2MkRoWYk"},{"id":"estimatedHours","value":"1","variant":"range","operator":"eq","filterId":"toKxaK6B"},{"id":"createdAt","value":"1744146000000","variant":"dateRange","operator":"eq","filterId":"8HSsg0Mt"}]',
                  );
                }}
              />
              {filtersQuery && (
                <CustomButton
                  buttonLabel={`Reset`}
                  variant={"secondary"}
                  size={"sm"}
                  disabled={isLoading}
                  onClick={() => {
                    setFiltersQuery(null);
                  }}
                />
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div>
        <pre>{JSON.stringify(filtersPRE || "", null, 2)}</pre>
      </div>
    </div>
  );
};
