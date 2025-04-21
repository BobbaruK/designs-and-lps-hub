import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { PAGINATION_DEFAULT } from "./table";

export const serverSearchParams = () => ({
  // Filters
  feature: parseAsArrayOf(parseAsString, ";").withOptions({ shallow: false }),
  brand: parseAsArrayOf(parseAsString, ";").withOptions({ shallow: false }),
  registrationType: parseAsArrayOf(parseAsString, ";").withOptions({
    shallow: false,
  }),
  language: parseAsArrayOf(parseAsString, ";").withOptions({ shallow: false }),
  topic: parseAsArrayOf(parseAsString, ";").withOptions({ shallow: false }),
  license: parseAsArrayOf(parseAsString, ";").withOptions({ shallow: false }),
  lpType: parseAsArrayOf(parseAsString, ";").withOptions({ shallow: false }),
  isARTS: parseAsBoolean.withOptions({ shallow: false }).withOptions({
    shallow: false,
  }),
  isReadyForTraffic: parseAsBoolean
    .withOptions({ shallow: false })
    .withOptions({
      shallow: false,
    }),
  whatsapp: parseAsBoolean.withOptions({ shallow: false }).withOptions({
    shallow: false,
  }),
  operator: parseAsStringEnum(["AND", "OR"]).withOptions({
    shallow: false,
  }),
  // Pagination
  pageIndex: parseAsIndex.withDefault(0).withOptions({ shallow: false }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION_DEFAULT)
    .withOptions({ shallow: false }),
  // Sorting
  sortBy: parseAsString.withDefault("createdAt").withOptions({
    shallow: false,
  }),
  sort: parseAsStringEnum(["asc", "desc"]).withOptions({
    shallow: false,
  }),
});
