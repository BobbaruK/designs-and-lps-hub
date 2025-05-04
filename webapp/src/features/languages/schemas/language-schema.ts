import { MAX_USERNAME, MIN_USERNAME } from "@/constants/misc";
import { z } from "zod";

export const LanguageSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  englishName: z
    .string()
    .min(MIN_USERNAME, {
      message: `English name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `English name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
  iso_639_1: z
    .string()
    .min(2, {
      message: `ISO 639 1 must be ${2} or more characters long`,
    })
    .max(3, {
      message: `ISO 639 1 must be ${3} or fewer characters long`,
    }),
  iso_3166_1: z
    .string()
    .min(2, {
      message: `ISO 3166 1 must be ${2} or more characters long`,
    })
    .max(3, {
      message: `ISO 3166 1 must be ${3} or fewer characters long`,
    }),
  flag: z.optional(z.string()),
});
