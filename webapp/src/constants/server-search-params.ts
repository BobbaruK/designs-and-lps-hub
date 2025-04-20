import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { PAGINATION_ARR, PAGINATION_DEFAULT } from "./table";

export const serverSearchParams = () => ({
  feature: parseAsArrayOf(parseAsString, ";"),
  brand: parseAsArrayOf(parseAsString, ";"),
  registrationType: parseAsArrayOf(parseAsString, ";"),
  language: parseAsArrayOf(parseAsString, ";"),
  topic: parseAsArrayOf(parseAsString, ";"),
  license: parseAsArrayOf(parseAsString, ";"),
  lpType: parseAsArrayOf(parseAsString, ";"),
  isARTS: parseAsBoolean,
  isReadyForTraffic: parseAsBoolean,
  whatsapp: parseAsBoolean,
  operator: parseAsStringEnum(["AND", "OR"]),
  pageIndex: parseAsIndex.withDefault(0).withOptions({ shallow: false }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION_DEFAULT)
    .withOptions({ shallow: false }),
  // pageSize: parseAsInteger.withDefault(Math.max(...PAGINATION_ARR)),
});
