import { CustomButton } from "@/components/custom-button";
import { useSearchParams } from "@/hooks/use-search-params";
import { TransitionStartFunction } from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { RxReset } from "react-icons/rx";

interface Props<T extends { id: string }> {
  data?: T[];
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const SelectHeader = <T extends { id: string }>({
  data,
  isLoading,
  startTransition,
}: Props<T>) => {
  const [{ selected }, setSearchParams] = useSearchParams(startTransition);

  const dataIdArr = data?.map((row) => row.id);

  return (
    <div className="flex items-center justify-center gap-1">
      <CustomButton
        buttonLabel="Select All"
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          const addDataIdsArr: string[] = [];

          if (selected && dataIdArr)
            for (const id of dataIdArr)
              if (!selected.includes(id)) addDataIdsArr.push(id);

          if (!selected?.length) {
            setSearchParams((f) => ({
              selected: [...(f.selected || []), ...(dataIdArr || [])],
            }));

            return;
          }

          const newSelectedArr = selected?.concat(addDataIdsArr);

          setSearchParams({
            selected: newSelectedArr,
          });
        }}
        disabled={isLoading}
        icon={BiSolidSelectMultiple}
        iconPlacement="left"
      />
      <CustomButton
        buttonLabel="Reset"
        variant={"ghost"}
        size={"icon"}
        onClick={() => setSearchParams({ selected: null })}
        disabled={isLoading}
        icon={RxReset}
        iconPlacement="left"
      />
    </div>
  );
};
