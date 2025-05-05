import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsIndex,
  parseAsInteger,
  parseAsIsoDateTime,
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
  from: parseAsIsoDateTime.withOptions({
    shallow: false,
  }),
  to: parseAsIsoDateTime.withOptions({
    shallow: false,
  }),
  type: parseAsArrayOf(parseAsString, ";").withOptions({
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
  // Searching
  search: parseAsString.withOptions({
    shallow: false,
  }),
  searchBy: parseAsStringEnum(["name", "url"]).withDefault("name").withOptions({
    shallow: false,
  }),
});
