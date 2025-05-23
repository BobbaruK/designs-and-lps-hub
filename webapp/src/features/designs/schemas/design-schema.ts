import { MAX_TITLE, MIN_USERNAME } from "@/constants/misc";
import { z } from "zod";

export const multiOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
  url: z.string().optional(),
});

export const DesignSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_TITLE, {
      message: `Name must be ${MAX_TITLE} or fewer characters long`,
    }),
  slug: z.string(),
  avatars: z.array(multiOptionSchema),
});
