import { cn } from "@/lib/utils";
import Link from "next/link";
import { CustomAvatar } from "../custom-avatar";
import { Button } from "../ui/button";

interface Props {
  linkHref?: string;
  name?: string;
  image?: string | null;
  resource?: string;
  hideAvatar?: boolean;
}

export const UserAvatar = ({
  linkHref,
  image,
  name,
  resource,
  hideAvatar,
}: Props) => {
  if (linkHref)
    return (
      <Button
        asChild
        variant={"link"}
        className={cn(
          "flex w-fit items-center gap-2 truncate p-0 text-foreground",
        )}
      >
        <Link href={linkHref}>
          {!hideAvatar && <CustomAvatar image={image} />}
          <span className="truncate">{name}</span>
        </Link>
      </Button>
    );

  return (
    <Button
      variant={"link"}
      className="flex w-fit cursor-auto items-center gap-2 truncate p-0 text-foreground"
    >
      {!hideAvatar && <CustomAvatar image={image || null} />}
      <span className="truncate">{name || <>No {resource || "User"}</>}</span>
    </Button>
  );
};
