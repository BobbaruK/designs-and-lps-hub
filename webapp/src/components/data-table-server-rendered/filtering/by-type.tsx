import { brandResourceTypes } from "@/constants/brand-resource-types";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TransitionStartFunction } from "react";
import { FilterBody } from "./filter-body";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  types?: string[];
}

export const ByType = ({
  isLoading,
  startTransition,
  types,
  ...restProps
}: Props) => {
  const [{ type }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckBrandChange = (selectedType: {
    id: string;
    name: string;
  }) => {
    if (type?.includes(selectedType.name)) {
      const filtered = type.filter((type) => type !== selectedType.name);

      setSearchParams({
        type: filtered.length > 0 ? filtered : null,
        pageIndex: 0,
      });

      return;
    }

    setSearchParams((f) => ({
      type: [...(f.type || []), selectedType.name],
      pageIndex: 0,
    }));
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={types?.map((tp, index) => ({
          id: `${index}`,
          name: tp,
          slug: tp,
        }))}
        paramsArr={type}
        isLoading={isLoading}
        title={{
          href: "#",
          label: {
            plural: "types",
            singular: "type",
          },
        }}
        handleSetParams={handleCheckBrandChange}
        showResetBtn={
          brandResourceTypes() && brandResourceTypes()?.length ? false : true
        }
        handleReset={() => setSearchParams({ type: null })}
      />
    </div>
  );
};
