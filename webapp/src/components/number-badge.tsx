import { VariantProps } from "class-variance-authority";
import { Badge, badgeVariants } from "./ui/badge";

type Variants = VariantProps<typeof badgeVariants>;

interface Props {
  number: number;
}

export const NumberBadge = ({ number }: Props) => {
  const variantsFn = (): Variants["variant"] => {
    if (number <= 0) {
      return "danger";
    }

    if (number <= 2) {
      return "warning";
    }

    return "info";
  };

  return (
    <Badge variant={variantsFn()} className="rounded-full no-underline">
      {number}
    </Badge>
  );
};
