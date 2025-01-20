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
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  iso_639_1: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or fewer characters long`,
    }),
  iso_3166_1: z.optional(
    z.string().max(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or fewer characters long`,
    }),
  ),
  flag: z.optional(z.string()),
});
