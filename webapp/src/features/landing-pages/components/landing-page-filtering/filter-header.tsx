import { CustomButton } from "@/components/custom-button";
import { capitalizeFirstLetter } from "@/lib/utils";
import { RiResetLeftLine } from "react-icons/ri";

interface Props {
  title: string;
  isLoading: boolean;
  showResetBtn: boolean;
  handleReset: () => Promise<URLSearchParams>;
}

export const FilterHeader = ({
  title,
  isLoading,
  showResetBtn,
  handleReset,
}: Props) => {
  return (
    <div className="flex h-10 flex-wrap items-center justify-start gap-2">
      <span className="text-md font-bold">{capitalizeFirstLetter(title)}</span>

      {showResetBtn && (
        <CustomButton
          buttonLabel={`Reset ${title.toLowerCase()}`}
          variant={"outline"}
          size={"icon"}
          icon={RiResetLeftLine}
          iconPlacement="left"
          onClick={handleReset}
          className="size-8 min-w-min"
          disabled={isLoading}
        />
      )}
    </div>
  );
};
