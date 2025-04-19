"use client";

import { searchParams } from "@/constants/search-params";
import { useQueryStates } from "nuqs";
import { TransitionStartFunction } from "react";

export function useSearchParams(startTransition: TransitionStartFunction) {
  return useQueryStates(searchParams(startTransition));
}
