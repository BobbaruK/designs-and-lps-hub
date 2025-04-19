"use client";

import { clientSearchParams } from "@/constants/client-search-params";
import { useQueryStates } from "nuqs";
import { TransitionStartFunction } from "react";

export function useSearchParams(startTransition: TransitionStartFunction) {
  return useQueryStates(clientSearchParams(startTransition));
}
