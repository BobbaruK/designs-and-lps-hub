import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FaUser } from "react-icons/fa";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  image?: string | null;
  fit?: "cover" | "contain";
  icon?: React.ReactNode;
}

export const CustomAvatar = ({ image, fit, icon, ...restProps }: Props) => {
  return (
    <Avatar
      {...restProps}
      className={cn("max-w-full border border-primary", restProps.className)}
    >
      <AvatarImage
        src={image || undefined}
        className={cn(
          ``,
          fit === "cover" || !fit ? "object-cover" : "object-contain",
        )}
      />
      <AvatarFallback className="rounded-none">
        {icon || <FaUser className="h-[55%] w-[55%]" />}
      </AvatarFallback>
    </Avatar>
  );
};
