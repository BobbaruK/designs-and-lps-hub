import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TransitionStartFunction } from "react";
import { ByIsBoolean } from "./by-is-boolean";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const ByIsArts = ({
  isLoading,
  startTransition,
  ...restProps
}: Props) => {
  const [{ isARTS }, setSearchParams] = useSearchParams(startTransition);

  return (
    <div
      {...restProps}
      className={cn(
        `flex h-12 items-center justify-between gap-4 p-2 ${restProps.className}`,
      )}
    >
      <ByIsBoolean
        boolean={isARTS}
        isLoading={isLoading}
        label={"Is ARTS?"}
        onReset={() => setSearchParams({ isARTS: null, pageIndex: 0 })}
        onChange={(e) => setSearchParams({ isARTS: e, pageIndex: 0 })}
      />
    </div>
  );
};
