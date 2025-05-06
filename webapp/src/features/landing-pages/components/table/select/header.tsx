import { CustomButton } from "@/components/custom-button";
import { useSearchParams } from "@/hooks/use-search-params";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { TransitionStartFunction } from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { RxReset } from "react-icons/rx";

interface Props {
  landingPages?: DB_LandingPage[];
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const SelectHeader = ({
  landingPages,
  isLoading,
  startTransition,
}: Props) => {
  const [{ selected }, setSearchParams] = useSearchParams(startTransition);

  const lpsIdArr = landingPages?.map((lp) => lp.id);

  return (
    <div className="flex items-center gap-1">
      <CustomButton
        buttonLabel="Select All"
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          const addLpIdsArr: string[] = [];

          if (selected && lpsIdArr)
            for (const id of lpsIdArr)
              if (!selected.includes(id)) addLpIdsArr.push(id);

          if (!selected?.length) {
            setSearchParams((f) => ({
              selected: [...(f.selected || []), ...(lpsIdArr || [])],
            }));

            return;
          }

          const newSelectedArr = selected?.concat(addLpIdsArr);

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
