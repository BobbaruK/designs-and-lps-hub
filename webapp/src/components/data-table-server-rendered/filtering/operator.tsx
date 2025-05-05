import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TransitionStartFunction } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const Operator = ({
  isLoading,
  startTransition,
  ...restProps
}: Props) => {
  const [{ operator }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckOperatorChange = (switchState: boolean) => {
    if (switchState) {
      setSearchParams({ operator: "OR" });
      return;
    }

    setSearchParams({ operator: "AND" });
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <div className="flex items-center gap-2">
        <span>AND</span>
        <Switch
          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
          checked={
            operator === "AND" ? false : operator === "OR" ? true : false
          }
          onCheckedChange={handleCheckOperatorChange}
          disabled={isLoading}
        />
        <span>OR</span>
      </div>
    </div>
  );
};
