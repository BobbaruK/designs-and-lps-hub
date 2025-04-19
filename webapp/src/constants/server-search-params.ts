import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const serverSearchParams = () => ({
  feature: parseAsArrayOf(parseAsString, ";"),
  brand: parseAsArrayOf(parseAsString, ";"),
  registrationType: parseAsArrayOf(parseAsString, ";"),
  language: parseAsArrayOf(parseAsString, ";"),
  topic: parseAsArrayOf(parseAsString, ";"),
  license: parseAsArrayOf(parseAsString, ";"),
  lpType: parseAsArrayOf(parseAsString, ";"),
  isArts: parseAsBoolean,
  isReadyForTraffic: parseAsBoolean,
  whatsapp: parseAsBoolean,
  operator: parseAsStringEnum(["AND", "OR"]),
});
