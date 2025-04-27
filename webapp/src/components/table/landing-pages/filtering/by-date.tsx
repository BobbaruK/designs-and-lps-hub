import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TransitionStartFunction, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const ByDate = ({ isLoading, startTransition, ...restProps }: Props) => {
  const [{ from, to }, setSearchParams] = useSearchParams(startTransition);

  return (
    <div {...restProps} className={cn(`flex flex-col ${restProps.className}`)}>
      <div className="flex h-12 w-full items-center justify-between gap-2 p-2">
        From
        <DateTimePicker
          value={from || undefined}
          onChange={(date) =>
            setSearchParams({
              from: date || null,
            })
          }
          clearable
          classNames={{
            trigger: "max-w-[80%]",
          }}
        />
      </div>
      <Separator />
      <div className="flex h-12 w-full items-center justify-between gap-2 p-2">
        To
        <DateTimePicker
          value={to || undefined}
          onChange={(date) =>
            setSearchParams({
              to: date || null,
            })
          }
          clearable
          classNames={{
            trigger: "max-w-[80%]",
          }}
        />
      </div>
    </div>
  );
};
