import { CustomButton } from "@/components/custom-button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { parseAsBoolean, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { RiResetLeftLine } from "react-icons/ri";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  searchParamQuery: string;
  label: string;
}

export const ByIsBoolean = ({
  isLoading,
  startTransition,
  searchParamQuery,
  label,
  ...restProps
}: Props) => {
  const [isBooleanQuery, setIsBooleanQuery] = useQueryState(
    searchParamQuery,
    parseAsBoolean.withOptions({
      shallow: false,
      startTransition,
    }),
  );

  return (
    <div
      {...restProps}
      className={cn(
        `flex h-12 items-center justify-between gap-4 p-2 ${restProps.className}`,
      )}
    >
      <Label htmlFor={searchParamQuery}>{label}</Label>
      <div className="flex items-center gap-2">
        {isBooleanQuery !== null && (
          <CustomButton
            buttonLabel={`Reset all filters`}
            variant={"outline"}
            size={"icon"}
            icon={RiResetLeftLine}
            iconPlacement="left"
            disabled={isLoading}
            onClick={() => setIsBooleanQuery(null)}
          />
        )}

        <Switch
          id={searchParamQuery}
          name={searchParamQuery}
          className=""
          checked={isBooleanQuery || false}
          onCheckedChange={setIsBooleanQuery}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
