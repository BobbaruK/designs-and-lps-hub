import { brandResourceTypes } from "@/constants/brand-resource-types";
import { MAX_USERNAME, MIN_USERNAME } from "@/constants/misc";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { capitalizeFirstLetter } from "@/lib/utils";
import { z } from "zod";

export const BrandResourceSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `${capitalizeFirstLetter(brandResourcesMeta.label.singular)} name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `${capitalizeFirstLetter(brandResourcesMeta.label.singular)} name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  type: z.enum(brandResourceTypes(), {
    message: `Select a ${brandResourcesMeta.label.singular.toLowerCase()} type`,
  }),
  url: z
    .string()
    .startsWith("https://", { message: "Must provide secure URL" }),
  brand: z.string().nonempty({
    message: `Select a ${brandsMeta.label.singular.toLowerCase()}`,
  }),
});
