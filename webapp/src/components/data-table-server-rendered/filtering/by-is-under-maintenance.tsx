import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TransitionStartFunction } from "react";
import { ByIsBoolean } from "./by-is-boolean";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const ByIsUnderMaintenance = ({
  isLoading,
  startTransition,
  ...restProps
}: Props) => {
  const [{ isUnderMaintenance }, setSearchParams] =
    useSearchParams(startTransition);

  return (
    <div
      {...restProps}
      className={cn(
        `flex h-12 items-center justify-between gap-4 p-2 ${restProps.className}`,
      )}
    >
      <ByIsBoolean
        boolean={isUnderMaintenance}
        isLoading={isLoading}
        label={"Is under maintenance?"}
        onReset={() =>
          setSearchParams({ isUnderMaintenance: null, pageIndex: 0 })
        }
        onChange={(e) =>
          setSearchParams({ isUnderMaintenance: e, pageIndex: 0 })
        }
      />
    </div>
  );
};
