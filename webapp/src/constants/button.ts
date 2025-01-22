import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

// Extrage tipurile variantelor din `buttonVariants`
type ButtonVariants = VariantProps<typeof buttonVariants>;

// Izolează tipul pentru `effect`
type ButtonEffects = ButtonVariants["effect"];

export const BUTTON_EFFECT: ButtonEffects = "gooeyLeft";
