import { cn } from "@/lib/utils";
import Link from "next/link";
import { CustomAvatar } from "../custom-avatar";
import { Button } from "../ui/button";

interface Props {
  linkHref: string | undefined;
  name: string | undefined;
  image: string | undefined | null;
  resource?: string;
}

export const UserAvatar = ({ linkHref, image, name, resource }: Props) => {
  if (linkHref)
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
      <CustomAvatar image={null} />
      No {resource || "User"}
    </Button>
  );
};
