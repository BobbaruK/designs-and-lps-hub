"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "@/hooks/use-search-params";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { TransitionStartFunction } from "react";

interface Props {
  landingPage: DB_LandingPage;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const SelectCell = ({
  landingPage,
  isLoading,
  startTransition,
}: Props) => {
  const [{ selected }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckChange = () => {
    if (selected?.includes(landingPage.id)) {
      const filtered = selected.filter((feat) => feat !== landingPage.id);

      setSearchParams({
        selected: filtered.length > 0 ? filtered : null,
      });

      return;
    }

    setSearchParams((f) => ({
      selected: [...(f.selected || []), landingPage.id],
    }));
  };
  return (
    <div className="grid place-items-center">
      <Checkbox
        onCheckedChange={handleCheckChange}
        checked={selected?.includes(landingPage.id)}
        disabled={isLoading}
      />
    </div>
  );
};
