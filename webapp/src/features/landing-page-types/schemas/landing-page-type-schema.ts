import { MAX_DESCRIPTION, MAX_USERNAME, MIN_USERNAME } from "@/constants/misc";
import { z } from "zod";

export const LandingPageTypeSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
  description: z
    .string()
    // .min(10, {
    //   message: "Description must be at least 10 characters.",
    // })
    .max(MAX_DESCRIPTION, {
      message: `Description must not be longer than ${MAX_DESCRIPTION} characters.`,
    })
    .optional(),
});
