import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FaUser } from "react-icons/fa";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  image: string | null | undefined;
}

export const CustomAvatar = ({ image, ...restProps }: Props) => {
  return (
    <Avatar
      {...restProps}
      className={cn("max-w-full border border-primary", restProps.className)}
    >
      <AvatarImage src={image || undefined} className="object-cover" />
      <AvatarFallback className="rounded-none">
        <FaUser className="h-[55%] w-[55%]" />
      </AvatarFallback>
    </Avatar>
  );
};
