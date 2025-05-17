import { MAX_TITLE, MIN_USERNAME } from "@/constants/misc";
import { z } from "zod";

export const multiOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const LandingPageSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_TITLE, {
      message: `Name must be ${MAX_TITLE} or fewer characters long`,
    }),
  slug: z.string(),
  url: z
    .string()
    .startsWith("https://", { message: "Must provide secure URL" }),
  whatsapp: z.optional(z.boolean()),
  isReadyForTraffic: z.optional(z.boolean()),
  isARTS: z.optional(z.boolean()),
  isUnderMaintenance: z.optional(z.boolean()),
  requester: z.optional(z.string()),
  topic: z.optional(z.string()),
  design: z.optional(z.string()),
  avatar: z.optional(z.string()),
  features: z.array(multiOptionSchema),
  registrationType: z.optional(z.string()),
  landingPageType: z.optional(z.string()),
  license: z.optional(z.string()),
  language: z.optional(z.string()),
  brand: z.optional(z.string()),
  isHome: z.optional(z.boolean()),
});
