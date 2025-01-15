import Link from "next/link";
import { Button } from "./ui/button";
import { CustomAvatar } from "./custom-avatar";
import { cn } from "@/lib/utils";

interface Props {
  id: string | undefined;
  name: string | undefined;
  image: string | undefined | null;
}

export const TableUserAvatar = ({ id, image, name }: Props) => {
  if (id)
    return (
      <Button asChild variant={"link"} className={cn("p-0 text-foreground")}>
        <Link href={`/profile/${id}`} className="flex items-center gap-2">
          <CustomAvatar image={image} />
          {name}
        </Link>
      </Button>
    );

  return (
    <div className="flex items-center gap-2">
      <CustomAvatar image={null} />
      No User
    </div>
  );
};
