import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TransitionStartFunction } from "react";
import { ByIsBoolean } from "./by-is-boolean";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const ByIsReadyForTraffic = ({
  isLoading,
  startTransition,
  ...restProps
}: Props) => {
  const [{ isReadyForTraffic }, setSearchParams] =
    useSearchParams(startTransition);

  return (
    <div
      {...restProps}
      className={cn(
        `flex h-12 items-center justify-between gap-4 p-2 ${restProps.className}`,
      )}
    >
      <ByIsBoolean
        boolean={isReadyForTraffic}
        isLoading={isLoading}
        label={"Is ready for traffic?"}
        onReset={() =>
          setSearchParams({ isReadyForTraffic: null, pageIndex: 0 })
        }
        onChange={(e) =>
          setSearchParams({ isReadyForTraffic: e, pageIndex: 0 })
        }
      />
    </div>
  );
};
