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
      className={cn(restProps.className, "border border-primary")}
    >
      <AvatarImage src={image || ""} className="object-cover" />
      <AvatarFallback>
        <FaUser className="h-[55%] w-[55%]" />
      </AvatarFallback>
    </Avatar>
  );
};
