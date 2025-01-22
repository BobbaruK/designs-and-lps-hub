import { cn } from "@/lib/utils";
import Link from "next/link";
import { CustomAvatar } from "../custom-avatar";
import { Button } from "../ui/button";

interface Props {
  linkHref?: string;
  name?: string;
  image?: string | null;
  resource?: string;
}

export const UserAvatar = ({ linkHref, image, name, resource }: Props) => {
  if (linkHref && image)
    return (
      <Button
        asChild
        variant={"link"}
        className={cn("flex w-fit items-center gap-2 p-0 text-foreground")}
      >
        <Link href={linkHref}>
          <CustomAvatar image={image} />
          {name}
        </Link>
      </Button>
    );

  return (
    <Button
      variant={"link"}
      className="flex w-fit cursor-auto items-center gap-2 p-0 text-foreground"
    >
      <CustomAvatar image={image || null} />
      {name || <>No {resource || "User"}</>}
    </Button>
  );
};
