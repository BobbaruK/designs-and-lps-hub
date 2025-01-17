import { MAX_USERNAME, MIN_USERNAME } from "@/constants";
import { z } from "zod";

export const DesignAvatarSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Design Avatar name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Design Avatar name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  url: z
    .string()
    .startsWith("https://", { message: "Must provide secure URL" })
    .endsWith(".webp", { message: "Only webp images allowed" }),
});
