import { serverSearchParams } from "@/constants/search-params-server";
import { paginationUrlKeys } from "@/constants/table-pagination";
import { createLoader } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const searchParamsObj = serverSearchParams();

export const loadSearchParams = createLoader(searchParamsObj, {
  urlKeys: paginationUrlKeys,
});
