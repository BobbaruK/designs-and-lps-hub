"use client";

import { clientSearchParams } from "@/constants/search-params-client";
import { paginationUrlKeys } from "@/constants/table-pagination";
import { useQueryStates } from "nuqs";
import { TransitionStartFunction } from "react";

export function useSearchParams(startTransition: TransitionStartFunction) {
  return useQueryStates(clientSearchParams(startTransition), {
    urlKeys: paginationUrlKeys,
  });
}
