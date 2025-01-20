import { MAX_USERNAME, MIN_USERNAME } from "@/constants/misc";
import { z } from "zod";

export const BrandSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
  logo: z.string(),
});
