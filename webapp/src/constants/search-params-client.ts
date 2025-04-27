import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsIndex,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringEnum,
} from "nuqs";
import { TransitionStartFunction } from "react";
import { PAGINATION_DEFAULT } from "./table";

export const clientSearchParams = (
  startTransition: TransitionStartFunction,
) => ({
  // Filters
  feature: parseAsArrayOf(parseAsString, ";").withOptions({
    shallow: false,
    startTransition,
  }),
  brand: parseAsArrayOf(parseAsString, ";").withOptions({
    shallow: false,
    startTransition,
  }),
  registrationType: parseAsArrayOf(parseAsString, ";").withOptions({
    shallow: false,
    startTransition,
  }),
  language: parseAsArrayOf(parseAsString, ";").withOptions({
    shallow: false,
    startTransition,
  }),
  topic: parseAsArrayOf(parseAsString, ";").withOptions({
    shallow: false,
    startTransition,
  }),
  license: parseAsArrayOf(parseAsString, ";").withOptions({
    shallow: false,
    startTransition,
  }),
  lpType: parseAsArrayOf(parseAsString, ";").withOptions({
    shallow: false,
    startTransition,
  }),
  isARTS: parseAsBoolean.withOptions({
    shallow: false,
    startTransition,
  }),
  isReadyForTraffic: parseAsBoolean.withOptions({
    shallow: false,
    startTransition,
  }),
  whatsapp: parseAsBoolean.withOptions({
    shallow: false,
    startTransition,
  }),
  operator: parseAsStringEnum(["AND", "OR"]).withOptions({
    shallow: false,
    startTransition,
  }),
  from: parseAsIsoDateTime.withOptions({
    shallow: false,
    startTransition,
  }),
  to: parseAsIsoDateTime.withOptions({
    shallow: false,
    startTransition,
  }),
  // Pagination
  pageIndex: parseAsIndex.withDefault(0).withOptions({
    shallow: false,
    startTransition,
  }),
  pageSize: parseAsInteger.withDefault(PAGINATION_DEFAULT).withOptions({
    shallow: false,
    startTransition,
  }),
  // Sorting
  sortBy: parseAsString.withDefault("createdAt").withOptions({
    shallow: false,
    startTransition,
  }),
  sort: parseAsStringEnum(["asc", "desc"]).withDefault("desc").withOptions({
    shallow: false,
    startTransition,
  }),
  // Searching
  search: parseAsString.withOptions({
    shallow: false,
    startTransition,
  }),
});
