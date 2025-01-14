import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link: string;
  name: string;
  length: number;
  image?: ReactNode;
}

export const NameCell = React.forwardRef<HTMLButtonElement, Props>(
  ({ link, name, length, image, ...props }: Props, ref) => {
    return (
      <Button
        asChild
        variant={"link"}
        className={cn(
          "flex flex-row items-center justify-start gap-2 p-0 text-foreground",
        )}
        ref={ref}
        {...props}
      >
        <Link href={link}>
          {image}
          {name}
          {length > 0 && (
            <Badge variant="default" className="no-underline">
              {length}
            </Badge>
          )}
        </Link>
      </Button>
    );
  },
);

NameCell.displayName = "NameCell";
