import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
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
  const [operatorQuery, setOperatorQuery] = useQueryState("operator", {
    shallow: false,
    startTransition,
  });

  const handleCheckOperatorChange = (switchState: boolean) => {
    if (switchState) {
      setOperatorQuery("OR");
      return;
    }

    setOperatorQuery("AND");
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
            operatorQuery === "AND"
              ? false
              : operatorQuery === "OR"
                ? true
                : false
          }
          onCheckedChange={handleCheckOperatorChange}
          disabled={isLoading}
        />
        <span>OR</span>
      </div>
    </div>
  );
};
