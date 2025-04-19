import { serverSearchParams } from "@/constants/server-search-params";
import { createLoader } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const searchParamsObj = serverSearchParams();

export const loadSearchParams = createLoader(searchParamsObj);
