import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
} from "nuqs";
import { TransitionStartFunction } from "react";

export const clientSearchParams = (
  startTransition?: TransitionStartFunction,
) => ({
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
  isArts: parseAsBoolean.withOptions({
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
});
