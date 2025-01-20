import Link from "next/link";
import { Button } from "./ui/button";
import { CustomAvatar } from "./custom-avatar";
import { cn } from "@/lib/utils";

interface Props {
  linkHref: string | undefined;
  name: string | undefined;
  image: string | undefined | null;
  resource?: string;
}

export const TableUserAvatar = ({ linkHref, image, name, resource }: Props) => {
  if (linkHref)
    return (
      <Button
        asChild
        variant={"link"}
        className={cn("flex items-center gap-2 p-0 text-foreground")}
      >
        <Link href={linkHref}>
          <CustomAvatar image={image} />
          {name}
        </Link>
      </Button>
    );

  return (
    <Button className="flex items-center gap-2">
      <CustomAvatar image={null} />
      No {resource || "User"}
    </Button>
  );
};
