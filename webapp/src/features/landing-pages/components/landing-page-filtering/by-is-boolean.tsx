import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { parseAsBoolean, useQueryState } from "nuqs";
import { TransitionStartFunction, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

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
        `flex items-center justify-between gap-4 ${restProps.className}`,
      )}
    >
      <Label htmlFor={searchParamQuery}>{label}</Label>

      <Switch
        id={searchParamQuery}
        name={searchParamQuery}
        className=""
        checked={isBooleanQuery || false}
        onCheckedChange={setIsBooleanQuery}
        disabled={isLoading}
      />
    </div>
  );
};
