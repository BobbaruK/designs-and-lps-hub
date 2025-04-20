import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

// TODO: encapsulate shit
// NameCell, CustomAvatar, UserAvatar

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link: string;
  name: string;
  length: number;
  image?: ReactNode;
}

export const NameCell = React.forwardRef<HTMLButtonElement, Props>(
  ({ link, name, length, image, ...props }: Props, ref) => {
    return (
      <Button asChild variant={"link"} ref={ref} {...props}>
        <Link
          href={link}
          className={
            "flex h-auto w-fit flex-row items-center justify-start gap-2 p-0 !text-foreground"
          }
        >
          {image}
          {name}
          {length > 0 && (
            <Badge variant="default" className="rounded-full no-underline">
              {length}
            </Badge>
          )}
        </Link>
      </Button>
    );
  },
);

NameCell.displayName = "NameCell";
